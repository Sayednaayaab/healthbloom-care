import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Thermometer,
  HeartPulse,
  Brain,
  Bone,
  Eye,
  Wind,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Info,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DetailDialog } from "@/components/DetailDialog";
import { SymptomsModal } from "@/components/modals/SymptomsModal";

const symptoms = [
  { icon: Thermometer, label: "Fever", color: "text-destructive" },
  { icon: HeartPulse, label: "Chest Pain", color: "text-love" },
  { icon: Brain, label: "Headache", color: "text-primary" },
  { icon: Bone, label: "Joint Pain", color: "text-accent" },
  { icon: Eye, label: "Vision Issues", color: "text-warning" },
  { icon: Wind, label: "Breathing", color: "text-primary" },
];

export const SymptomCheckerSection = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomsModalOpen, setSymptomsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'how-it-works' | 'all-symptoms' | null>(null);

  const toggleSymptom = (label: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(label)
        ? prev.filter(s => s !== label)
        : [...prev, label]
    );
  };

  const handleStartAssessment = () => {
    setSymptomsModalOpen(true);
  };

  const handleHowItWorks = () => {
    setDialogType('how-it-works');
  };

  const handleViewAllSymptoms = () => {
    setDialogType('all-symptoms');
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  return (
    <section id="symptom-checker" className="py-20 md:py-32 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1 bg-love/10 text-love text-sm font-medium rounded-full mb-4">
              AI-Powered Health
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Check Your Symptoms{" "}
              <span className="text-gradient">Instantly</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our intelligent symptom checker uses advanced AI to analyze your symptoms 
              and provide personalized health insights. Get preliminary assessments in minutes, 
              not hours.
            </p>

            {/* Features list */}
            <ul className="space-y-4 mb-8">
              {[
                "AI analysis by medical experts",
                "Instant risk assessment & recommendations",
                "Connect directly to telehealth if needed",
                "Available 24/7, free to use",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 p-4 bg-warning/10 rounded-xl text-sm">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Disclaimer:</strong> This tool provides preliminary guidance only 
                and is not a substitute for professional medical advice.
              </p>
            </div>
          </div>

          {/* Interactive Checker */}
          <div className="order-1 lg:order-2">
            <div className="bg-background rounded-3xl p-8 shadow-lg border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                What symptoms are you experiencing?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Select all that apply
              </p>

              {/* Symptom Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {symptoms.map((symptom) => {
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
                        "text-sm font-medium",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {symptom.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected count */}
              {selectedSymptoms.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} selected
                </p>
              )}

              {/* CTA */}
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                disabled={selectedSymptoms.length === 0}
                onClick={handleStartAssessment}
              >
                Start Assessment
                <ArrowRight className="h-5 w-5" />
              </Button>

              {/* Quick links */}
              <div className="flex items-center justify-center gap-4 mt-6 text-sm">
                <button
                  onClick={handleHowItWorks}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How it works
                </button>
                <span className="text-border">•</span>
                <button
                  onClick={handleViewAllSymptoms}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  View all symptoms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Symptom Checker Dialog */}
      {dialogType && (
        <DetailDialog
          isOpen={!!dialogType}
          onClose={closeDialog}
          title={
            dialogType === 'how-it-works' ? 'How Our Symptom Checker Works' :
            'All Available Symptoms'
          }
          description={
            dialogType === 'how-it-works' ? 'Learn about our AI-powered process' :
            'Browse all symptoms we can help with'
          }
          actions={
            <div className="flex gap-3">
              <Button variant="outline" onClick={closeDialog}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            {dialogType === 'how-it-works' && (
              <>
                {/* How It Works */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <h5 className="font-semibold">Select Symptoms</h5>
                      <p className="text-sm text-muted-foreground">
                        Choose all symptoms you're experiencing
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h5 className="font-semibold">AI Analysis</h5>
                      <p className="text-sm text-muted-foreground">
                        Our AI analyzes patterns and provides insights
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h5 className="font-semibold">Get Results</h5>
                      <p className="text-sm text-muted-foreground">
                        Receive personalized recommendations
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {dialogType === 'all-symptoms' && (
              <>
                {/* All Symptoms */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Common Symptoms We Check</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Fever", "Headache", "Chest Pain", "Joint Pain", "Vision Issues", "Breathing Problems",
                      "Nausea", "Fatigue", "Dizziness", "Cough", "Sore Throat", "Skin Rash",
                      "Abdominal Pain", "Back Pain", "Muscle Pain", "Swelling", "Weight Loss", "Insomnia"
                    ].map((symptom) => (
                      <div key={symptom} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                        <span className="text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is just a sample. Our system covers hundreds of symptoms across all medical categories.
                  </p>
                </div>
              </>
            )}
          </div>
        </DetailDialog>
      )}

      {/* Symptoms Modal */}
      <SymptomsModal
        isOpen={symptomsModalOpen}
        onClose={() => setSymptomsModalOpen(false)}
        preselectedSymptoms={selectedSymptoms}
      />
    </section>
  );
};
