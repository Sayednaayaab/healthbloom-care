import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Send,
  Heart,
  Calendar,
  Stethoscope,
  MessageCircle,
  Sparkles,
  Minimize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingModal } from "@/components/modals/BookingModal";
import { SymptomsModal } from "@/components/modals/SymptomsModal";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

const quickReplies = [
  { icon: Calendar, label: "Book Appointment", action: "book" },
  { icon: Stethoscope, label: "Check Symptoms", action: "symptoms" },
  { icon: Heart, label: "Wellness Tips", action: "wellness" },
];

const botResponses: Record<string, string> = {
  greeting: "Hi there! I'm BloomBot, your friendly health companion 💚 I'm here to help with appointments, symptoms, or wellness tips. What's on your mind?",
  book: "I'd love to help you book an appointment! 📅 What type of doctor are you looking for? (e.g., General, Cardiologist, Dermatologist)",
  symptoms: "I'll help you understand your symptoms better 🩺 Please remember, I provide guidance only—always consult a doctor for medical advice. What symptom is bothering you most?",
  wellness: "Great choice focusing on wellness! 🌿 Here's today's tip: Try a 5-minute morning stretch routine to boost energy and reduce stress. Want more tips or a personalized wellness plan?",
  default: "I understand! Let me help you with that. Could you tell me a bit more so I can provide the best assistance? 💚",
};

export const BloomBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: botResponses.greeting,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [symptomsModalOpen, setSymptomsModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const responseKey = messageText.toLowerCase().includes("book") 
        ? "book" 
        : messageText.toLowerCase().includes("symptom") 
        ? "symptoms"
        : messageText.toLowerCase().includes("wellness") || messageText.toLowerCase().includes("tip")
        ? "wellness"
        : "default";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponses[responseKey],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleQuickReply = (action: string) => {
    switch (action) {
      case "book":
        setBookingModalOpen(true);
        break;
      case "symptoms":
        setSymptomsModalOpen(true);
        break;
      case "wellness":
        handleSend("Give me wellness tips");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          "fixed bottom-6 right-6 z-50 group",
          "w-16 h-16 rounded-full bg-primary shadow-lg",
          "flex items-center justify-center",
          "hover:scale-110 transition-all duration-300",
          "pulse-glow",
          isOpen && "hidden"
        )}
        aria-label="Open BloomBot chat"
      >
        <MessageCircle className="h-7 w-7 text-primary-foreground" />
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-love rounded-full border-2 border-card animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "w-[380px] max-w-[calc(100vw-2rem)]",
            "bg-card rounded-3xl shadow-2xl border border-border overflow-hidden",
            "animate-bounce-in",
            isMinimized ? "h-16" : "h-[600px] max-h-[calc(100vh-3rem)]"
          )}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary-foreground fill-primary-foreground heart-beat" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary-foreground flex items-center gap-2">
                BloomBot
                <Sparkles className="h-4 w-4" />
              </h3>
              <p className="text-xs text-primary-foreground/80">
                Your caring health companion
              </p>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-[calc(100%-180px)] overflow-y-auto p-4 space-y-4 bg-muted/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.type === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-4 py-3 rounded-2xl",
                        message.type === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-card border border-border text-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className={cn(
                        "text-[10px] mt-1 block",
                        message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 py-2 border-t border-border bg-card flex gap-2 overflow-x-auto">
                {quickReplies.map((reply) => {
                  const Icon = reply.icon;
                  return (
                    <button
                      key={reply.action}
                      onClick={() => handleQuickReply(reply.action)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {reply.label}
                    </button>
                  );
                })}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-card">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl bg-muted border border-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <Button
                    type="submit"
                    variant="default"
                    size="icon"
                    className="h-12 w-12 rounded-xl"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <SymptomsModal
        isOpen={symptomsModalOpen}
        onClose={() => setSymptomsModalOpen(false)}
      />
    </>
  );
};
