import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Video, Sparkles } from "lucide-react";
import { BookingModal } from "@/components/modals/BookingModal";
import { SymptomsModal } from "@/components/modals/SymptomsModal";
import { TelehealthModal } from "@/components/modals/TelehealthModal";

export const HeroSection = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [symptomsModalOpen, setSymptomsModalOpen] = useState(false);
  const [telehealthModalOpen, setTelehealthModalOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Decorative hearts */}
        <div className="absolute top-32 right-[20%] text-love/30 floating" style={{ animationDelay: '0.5s' }}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 left-[15%] text-primary/20 floating" style={{ animationDelay: '1.5s' }}>
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles className="h-4 w-4" />
            <span>Trusted by 50,000+ patients worldwide</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up delay-100">
            Your Health,{" "}
            <span className="text-gradient">Blooming Brightly</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Care at Your Fingertips
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Book instantly, check symptoms 24/7, and thrive with personalized wellness plans. 
            Experience healthcare that truly cares about <span className="text-love font-medium">you</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
            <Button variant="hero" size="xl" className="w-full sm:w-auto group" onClick={() => setBookingModalOpen(true)}>
              <Calendar className="h-5 w-5 transition-transform group-hover:-rotate-12" />
              Book Appointment
            </Button>
            <Button variant="accent" size="xl" className="w-full sm:w-auto group" onClick={() => setSymptomsModalOpen(true)}>
              <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
              Symptom Checker
            </Button>
            <Button variant="glass" size="xl" className="w-full sm:w-auto group" onClick={() => setTelehealthModalOpen(true)}>
              <Video className="h-5 w-5 transition-transform group-hover:scale-110" />
              Telehealth Now
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground animate-fade-in-up delay-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-card flex items-center justify-center text-primary-foreground text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm">
                <strong className="text-foreground">4.9/5</strong> from 10k+ reviews
              </span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-sm">
              <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>HIPAA Compliant</span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-sm">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-card"
          />
        </svg>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
      <SymptomsModal
        isOpen={symptomsModalOpen}
        onClose={() => setSymptomsModalOpen(false)}
      />
      <TelehealthModal
        isOpen={telehealthModalOpen}
        onClose={() => setTelehealthModalOpen(false)}
      />
    </section>
  );
};
