import { useState } from "react";
import { Star, Calendar, Video, Clock, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DetailDialog } from "@/components/DetailDialog";
import { BookingModal } from "@/components/modals/BookingModal";
import { TelehealthModal } from "@/components/modals/TelehealthModal";

const doctors = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 284,
    experience: "15+ years",
    availability: "Available Today",
    image: "SC",
  },
  {
    name: "Dr. Michael Roberts",
    specialty: "Family Medicine",
    rating: 4.8,
    reviews: 412,
    experience: "12+ years",
    availability: "Available Tomorrow",
    image: "MR",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    rating: 5.0,
    reviews: 198,
    experience: "10+ years",
    availability: "Available Today",
    image: "PS",
  },
  {
    name: "Dr. James Wilson",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 356,
    experience: "18+ years",
    availability: "Available Today",
    image: "JW",
  },
];

export const DoctorsSection = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [telehealthModalOpen, setTelehealthModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<typeof doctors[0] | null>(null);
  const [selectedDoctorForTelehealth, setSelectedDoctorForTelehealth] = useState<typeof doctors[0] | null>(null);

  const handleBookClick = (doctor: typeof doctors[0]) => {
    setSelectedDoctorForBooking(doctor);
    setBookingModalOpen(true);
  };

  const handleVideoClick = (doctor: typeof doctors[0]) => {
    setSelectedDoctorForTelehealth(doctor);
    setTelehealthModalOpen(true);
  };

  return (
    <section id="doctors" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
              Expert Care
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Meet Our Top Doctors
            </h2>
            <p className="text-lg text-muted-foreground">
              Board-certified specialists ready to provide personalized care with compassion and expertise.
            </p>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Doctors
          </Button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className={cn(
                "group bg-card rounded-2xl border border-border/50 overflow-hidden",
                "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
                "hover:-translate-y-1",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                  {doctor.image}
                </div>
                {/* Availability badge */}
                <div className={cn(
                  "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium",
                  doctor.availability.includes("Today") 
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {doctor.availability}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {doctor.specialty}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {doctor.experience} experience
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleBookClick(doctor)}
                  >
                    <Calendar className="h-4 w-4" />
                    Book
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleVideoClick(doctor)}
                  >
                    <Video className="h-4 w-4" />
                    Video
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border">
          {[
            { value: "500+", label: "Expert Doctors" },
            { value: "50+", label: "Specialties" },
            { value: "1M+", label: "Patients Served" },
            { value: "4.9", label: "Average Rating" },
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        doctor={selectedDoctorForBooking}
      />

      {/* Telehealth Modal */}
      <TelehealthModal
        isOpen={telehealthModalOpen}
        onClose={() => setTelehealthModalOpen(false)}
        doctor={selectedDoctorForTelehealth}
      />
    </section>
  );
};
