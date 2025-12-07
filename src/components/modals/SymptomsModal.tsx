import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle, Pill, Stethoscope, Thermometer, HeartPulse, Brain, Bone, Eye, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SymptomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSymptoms?: string[];
}

const allSymptoms = [
  { icon: Thermometer, label: "Fever", color: "text-destructive" },
  { icon: HeartPulse, label: "Chest Pain", color: "text-love" },
  { icon: Brain, label: "Headache", color: "text-primary" },
  { icon: Bone, label: "Joint Pain", color: "text-accent" },
  { icon: Eye, label: "Vision Issues", color: "text-warning" },
  { icon: Wind, label: "Breathing Problems", color: "text-primary" },
  { icon: AlertTriangle, label: "Nausea", color: "text-muted-foreground" },
  { icon: Pill, label: "Fatigue", color: "text-secondary" },
  { icon: Stethoscope, label: "Dizziness", color: "text-primary" },
  { icon: CheckCircle, label: "Cough", color: "text-accent" },
  { icon: HeartPulse, label: "Sore Throat", color: "text-destructive" },
  { icon: AlertTriangle, label: "Skin Rash", color: "text-warning" },
  { icon: Bone, label: "Abdominal Pain", color: "text-love" },
  { icon: Pill, label: "Back Pain", color: "text-primary" },
  { icon: Stethoscope, label: "Muscle Pain", color: "text-accent" },
  { icon: CheckCircle, label: "Swelling", color: "text-secondary" },
  { icon: AlertTriangle, label: "Weight Loss", color: "text-muted-foreground" },
  { icon: Pill, label: "Insomnia", color: "text-warning" },
  { icon: Brain, label: "Anxiety", color: "text-love" },
  { icon: HeartPulse, label: "Depression", color: "text-destructive" },
];

export const SymptomsModal = ({ isOpen, onClose, preselectedSymptoms = [] }: SymptomsModalProps) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(preselectedSymptoms);
  const [results, setResults] = useState<any>(null);

  const checkSymptomsMutation = useMutation({
    mutationFn: async (symptoms: string[]) => {
      const response = await fetch('/api/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedSymptoms: symptoms }),
      });
      if (!response.ok) throw new Error('Failed to check symptoms');
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data);
      toast.success("Analysis complete!");
    },
    onError: (error) => {
      toast.error("Failed to analyze symptoms. Please try again.");
      console.error('Symptom check error:', error);
    },
  });

  const toggleSymptom = (label: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(label)
        ? prev.filter(s => s !== label)
        : [...prev, label]
    );
  };

  const handleCheckSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom");
      return;
    }
    checkSymptomsMutation.mutate(selectedSymptoms);
  };

  const resetModal = () => {
    setSelectedSymptoms([]);
    setResults(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return AlertTriangle;
      case 'medium': return AlertTriangle;
      case 'low': return CheckCircle;
      default: return CheckCircle;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Symptom Checker
          </DialogTitle>
        </DialogHeader>

        {!results ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">What symptoms are you experiencing?</h3>
              <p className="text-muted-foreground">Select all that apply for a personalized assessment</p>
            </div>

            {/* Symptom Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {allSymptoms.map((symptom) => {
                const Icon = symptom.icon;
                const isSelected = selectedSymptoms.includes(symptom.label);

                return (
                  <button
                    key={symptom.label}
                    onClick={() => toggleSymptom(symptom.label)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                      isSelected
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn(
                      "h-8 w-8 transition-colors",
                      isSelected ? "text-primary" : symptom.color
                    )} />
                    <span className={cn(
                      "text-sm font-medium text-center",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {symptom.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Count */}
            {selectedSymptoms.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} selected
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> This tool provides preliminary guidance only
                  and is not a substitute for professional medical advice. Always consult a healthcare professional
                  for proper diagnosis and treatment.
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleCheckSymptoms}
                disabled={selectedSymptoms.length === 0 || checkSymptomsMutation.isPending}
                size="lg"
                className="px-8"
              >
                {checkSymptomsMutation.isPending ? "Analyzing..." : "Check My Symptoms"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const Icon = getSeverityIcon(results.severity);
                  return <Icon className="h-8 w-8 text-accent" />;
                })()}
              </div>
              <h3 className="text-xl font-semibold">Assessment Results</h3>
              <Badge variant={getSeverityColor(results.severity) as any} className="mt-2">
                {results.severity.toUpperCase()} SEVERITY
              </Badge>
            </div>

            {/* Recommendation */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Recommendation
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {results.recommendation}
                </p>
              </CardContent>
            </Card>

            {/* Suggested Remedies */}
            {results.remedies && results.remedies.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Pill className="h-5 w-5" />
                    Suggested Remedies
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {results.remedies.map((remedy: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-sm">{remedy}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Selected Symptoms Summary */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Symptoms Analyzed</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <Badge key={symptom} variant="outline">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setResults(null)}
                className="flex-1"
              >
                Check Different Symptoms
              </Button>
              {results.consultDoctor && (
                <Button className="flex-1">
                  Book Doctor Consultation
                </Button>
              )}
            </div>

            {/* Footer Disclaimer */}
            <div className="text-center text-xs text-muted-foreground">
              This is not a medical diagnosis. Please consult a healthcare professional for proper medical advice.
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
