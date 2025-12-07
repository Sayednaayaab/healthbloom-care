import { 
  Video, 
  MessageCircle, 
  Heart, 
  Calendar, 
  FileText, 
  Apple,
  Stethoscope,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Video,
    title: "Telehealth Consults",
    description: "Connect with certified doctors from the comfort of your home via secure video calls.",
    color: "primary",
  },
  {
    icon: MessageCircle,
    title: "AI Symptom Checker",
    description: "Get instant health assessments powered by advanced AI with personalized recommendations.",
    color: "accent",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Schedule appointments with just a few clicks. Real-time availability, instant confirmation.",
    color: "love",
  },
  {
    icon: Heart,
    title: "Wellness Programs",
    description: "Personalized wellness plans including nutrition, exercise, and mental health support.",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Health Records",
    description: "Access your complete medical history, lab results, and prescriptions anytime.",
    color: "accent",
  },
  {
    icon: Apple,
    title: "Nutrition Planning",
    description: "Custom diet plans created by certified nutritionists to meet your health goals.",
    color: "love",
  },
  {
    icon: Stethoscope,
    title: "Specialist Care",
    description: "Connect with specialists across 50+ medical fields for expert consultations.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Health Insurance",
    description: "Easy insurance verification and claims processing for hassle-free care.",
    color: "accent",
  },
];

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    hover: "group-hover:bg-primary group-hover:text-primary-foreground",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    hover: "group-hover:bg-accent group-hover:text-accent-foreground",
  },
  love: {
    bg: "bg-love/10",
    text: "text-love",
    hover: "group-hover:bg-love group-hover:text-love-foreground",
  },
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Complete Care, One Platform
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for your health journey, designed with love and backed by technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = colorClasses[service.color as keyof typeof colorClasses];
            
            return (
              <div
                key={service.title}
                className={cn(
                  "group relative bg-background rounded-2xl p-6 border border-border/50",
                  "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
                  "hover:-translate-y-1 cursor-pointer",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                    "transition-all duration-300",
                    colors.bg,
                    colors.hover
                  )}
                >
                  <Icon className={cn("h-7 w-7 transition-colors", colors.text, "group-hover:text-inherit")} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <a href="#contact" className="text-primary font-medium hover:underline inline-flex items-center gap-2">
            Talk to BloomBot, our friendly AI assistant
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
