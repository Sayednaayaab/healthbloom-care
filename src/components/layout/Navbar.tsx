import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingModal } from "@/components/modals/BookingModal";
import { PatientPortalModal } from "@/components/modals/PatientPortalModal";

const navLinks = [
  { name: "Home", href: "#home" },
  { 
    name: "Services", 
    href: "#services",
    children: [
      { name: "Telehealth", href: "#telehealth" },
      { name: "Symptom Checker", href: "#symptom-checker" },
      { name: "Wellness Hub", href: "#wellness" },
    ]
  },
  { name: "Doctors", href: "#doctors" },
  { name: "Wellness", href: "#wellness" },
  { name: "About", href: "#about" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [patientPortalModalOpen, setPatientPortalModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative">
            <Heart 
              className="h-8 w-8 text-primary fill-primary transition-transform group-hover:scale-110" 
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Health<span className="text-primary">Bloom</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg flex items-center gap-1",
                  "hover:bg-muted/50"
                )}
              >
                {link.name}
                {link.children && <ChevronDown className="h-4 w-4" />}
              </a>
              
              {/* Dropdown */}
              {link.children && activeDropdown === link.name && (
                <div className="absolute top-full left-0 pt-2 animate-fade-in">
                  <div className="bg-card rounded-xl shadow-lg border border-border p-2 min-w-[180px]">
                    {link.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:1-800-HEALTH"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>1-800-HEALTH</span>
          </a>
          <Button variant="outline" size="sm" onClick={() => setPatientPortalModalOpen(true)}>
            Patient Portal
          </Button>
          <Button variant="default" size="sm" onClick={() => setBookingModalOpen(true)}>
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <a
                  href={link.href}
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
                {link.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => { setPatientPortalModalOpen(true); setIsMobileMenuOpen(false); }}>
                Patient Portal
              </Button>
              <Button variant="default" className="w-full" onClick={() => { setBookingModalOpen(true); setIsMobileMenuOpen(false); }}>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
      <PatientPortalModal
        isOpen={patientPortalModalOpen}
        onClose={() => setPatientPortalModalOpen(false)}
      />
    </header>
  );
};
