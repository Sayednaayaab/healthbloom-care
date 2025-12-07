import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Video, Phone, MessageCircle, Clock, Wifi, WifiOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  availability: string;
  image: string;
  online: boolean;
}

interface TelehealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: Doctor;
}

export const TelehealthModal = ({ isOpen, onClose, preselectedDoctor }: TelehealthModalProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(preselectedDoctor || null);
  const [inCall, setInCall] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'doctor', time: string}>>([]);
  const [chatInput, setChatInput] = useState("");

  // Fetch online doctors
  const { data: onlineDoctors = [], isLoading } = useQuery({
    queryKey: ['online-doctors'],
    queryFn: async () => {
      const response = await fetch('/api/online-doctors');
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds to check online status
  });

  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctor(preselectedDoctor);
    }
  }, [preselectedDoctor]);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleStartCall = () => {
    if (!selectedDoctor) return;

    setInCall(true);
    toast.success(`Connecting to ${selectedDoctor.name}...`);

    // Simulate connection delay
    setTimeout(() => {
      toast.success("Connected! Video call started.");
      // Add initial chat message
      setChatMessages([{
        text: `Hello! I'm Dr. ${selectedDoctor.name.split(' ')[1]}. How can I help you today?`,
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  const handleEndCall = () => {
    setInCall(false);
    setChatMessages([]);
    setChatInput("");
    toast.info("Call ended");
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      text: chatInput,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatInput("");

    // Simulate doctor response
    setTimeout(() => {
      const responses = [
        "I understand. Can you tell me more about when this started?",
        "That sounds concerning. Have you experienced this before?",
        "Okay, let me check your medical history... Based on what you've described, I recommend...",
        "That's helpful information. Are you taking any medications currently?",
        "I see. Let's schedule a follow-up appointment to discuss this further."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const doctorResponse = {
        text: randomResponse,
        sender: 'doctor' as const,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, doctorResponse]);
    }, 1000 + Math.random() * 2000);
  };

  const resetModal = () => {
    setSelectedDoctor(null);
    setInCall(false);
    setChatMessages([]);
    setChatInput("");
  };

  const handleClose = () => {
    if (inCall) {
      handleEndCall();
    }
    resetModal();
    onClose();
  };

  if (inCall && selectedDoctor) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Call with {selectedDoctor.name}
              </span>
              <Badge variant="default" className="bg-accent">
                <div className="w-2 h-2 bg-accent-foreground rounded-full mr-2 animate-pulse" />
                Connected
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
            {/* Video Area */}
            <div className="lg:col-span-2 space-y-4">
              {/* Doctor Video (Placeholder) */}
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-lg font-semibold">{selectedDoctor.name}</p>
                  <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                  <Badge variant="secondary" className="mt-2">
                    <Video className="h-3 w-3 mr-1" />
                    Video Call Active
                  </Badge>
                </div>
                {/* Call controls overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={handleEndCall}>
                    End Call
                  </Button>
                </div>
              </div>

              {/* Patient Self View (Placeholder) */}
              <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <User className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Your camera is off</p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex flex-col h-full">
              <div className="flex-1 bg-muted/30 rounded-lg p-4 overflow-y-auto">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </h4>
                <div className="space-y-3">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                          message.sender === 'user'
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border"
                        )}
                      >
                        <p>{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="mt-4 flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="sm">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Telehealth Consultation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Doctors Available Now</h3>
            <p className="text-muted-foreground">
              Connect instantly with healthcare professionals via secure video calls
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading available doctors...</div>
          ) : onlineDoctors.length === 0 ? (
            <div className="text-center py-8">
              <WifiOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No doctors available online at the moment.</p>
              <p className="text-sm text-muted-foreground mt-2">Please try again later or book an appointment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {onlineDoctors.map((doctor: Doctor) => (
                <Card
                  key={doctor.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedDoctor?.id === doctor.id && "ring-2 ring-primary"
                  )}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold">
                          {doctor.image}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-card flex items-center justify-center">
                          <div className="w-2 h-2 bg-accent-foreground rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-sm text-primary">{doctor.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm">⭐ {doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="default" className="text-xs">
                            <Wifi className="h-3 w-3 mr-1" />
                            Online Now
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {doctor.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedDoctor && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Ready to connect with {selectedDoctor.name}?</h4>
                    <p className="text-sm text-muted-foreground">
                      Secure video consultation • Typically 15-30 minutes
                    </p>
                  </div>
                  <Button onClick={handleStartCall} size="lg">
                    <Video className="h-4 w-4 mr-2" />
                    Start Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Video className="h-8 w-8 text-primary mx-auto mb-2" />
              <h5 className="font-semibold">HD Video</h5>
              <p className="text-sm text-muted-foreground">Crystal clear video calls</p>
            </div>
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <h5 className="font-semibold">Live Chat</h5>
              <p className="text-sm text-muted-foreground">Text during your call</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <h5 className="font-semibold">24/7 Access</h5>
              <p className="text-sm text-muted-foreground">Available anytime</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
