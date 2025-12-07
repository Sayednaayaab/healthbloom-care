import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  slots: string[];
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: Doctor;
}

export const BookingModal = ({ isOpen, onClose, preselectedDoctor }: BookingModalProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(preselectedDoctor || null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    symptoms: ""
  });
  const [step, setStep] = useState<'doctor' | 'datetime' | 'form' | 'confirmation'>('doctor');

  const queryClient = useQueryClient();

  // Fetch doctors
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const response = await fetch('/api/doctors');
      return response.json();
    },
  });

  // Book appointment mutation
  const bookAppointmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to book appointment');
      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Appointment booked successfully!");
      setStep('confirmation');
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
    onError: (error) => {
      toast.error("Failed to book appointment. Please try again.");
      console.error('Booking error:', error);
    },
  });

  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctor(preselectedDoctor);
      setStep('datetime');
    }
  }, [preselectedDoctor]);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep('datetime');
  };

  const handleDateTimeSubmit = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }
    setStep('form');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    bookAppointmentMutation.mutate({
      doctorId: selectedDoctor.id,
      patientName: formData.name,
      email: formData.email,
      phone: formData.phone,
      symptoms: formData.symptoms,
      date: selectedDate,
      time: selectedTime,
    });
  };

  const resetModal = () => {
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
    setFormData({ name: "", email: "", phone: "", symptoms: "" });
    setStep('doctor');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const availableDates = [
    { value: "2024-01-15", label: "Today, Jan 15" },
    { value: "2024-01-16", label: "Tomorrow, Jan 16" },
    { value: "2024-01-17", label: "Wed, Jan 17" },
    { value: "2024-01-18", label: "Thu, Jan 18" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book Appointment
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {[
            { key: 'doctor', label: 'Select Doctor' },
            { key: 'datetime', label: 'Date & Time' },
            { key: 'form', label: 'Your Details' },
            { key: 'confirmation', label: 'Confirmation' }
          ].map((s, index) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === s.key ? "bg-primary text-primary-foreground" :
                ['doctor', 'datetime', 'form', 'confirmation'].indexOf(step) > index ? "bg-accent text-accent-foreground" :
                "bg-muted text-muted-foreground"
              )}>
                {index + 1}
              </div>
              <span className={cn(
                "text-sm hidden sm:block",
                step === s.key ? "text-primary font-medium" : "text-muted-foreground"
              )}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 'doctor' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose a Doctor</h3>
            {isLoading ? (
              <div className="text-center py-8">Loading doctors...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doctor: Doctor) => (
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold">
                          {doctor.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-primary">{doctor.specialty}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm">⭐ {doctor.rating}</span>
                            <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                          </div>
                          <Badge variant={doctor.availability.includes("Today") ? "default" : "secondary"} className="mt-2">
                            {doctor.availability}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 'datetime' && selectedDoctor && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Schedule with {selectedDoctor.name}</h3>
              <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Select Date</Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Available Times</Label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedDoctor.slots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="text-xs"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('doctor')}>
                Back
              </Button>
              <Button onClick={handleDateTimeSubmit}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'form' && selectedDoctor && (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Your Information</h3>
              <p className="text-muted-foreground">Appointment: {selectedDate} at {selectedTime}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms or Reason for Visit</Label>
              <Textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                placeholder="Describe your symptoms or reason for the appointment..."
                rows={3}
              />
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep('datetime')}>
                Back
              </Button>
              <Button type="submit" disabled={bookAppointmentMutation.isPending}>
                {bookAppointmentMutation.isPending ? "Booking..." : "Book Appointment"}
              </Button>
            </div>
          </form>
        )}

        {step === 'confirmation' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent">Appointment Confirmed!</h3>
              <p className="text-muted-foreground mt-2">
                Your appointment has been successfully booked. You'll receive a confirmation email shortly.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-left">
              <h4 className="font-semibold mb-2">Appointment Details</h4>
              <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Patient:</strong> {formData.name}</p>
            </div>
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
