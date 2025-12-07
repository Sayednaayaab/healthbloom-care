import { Heart, Brain, Salad, Moon, Dumbbell, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const wellnessTips = [
  {
    icon: Salad,
    category: "Nutrition",
    title: "Eat the Rainbow",
    description: "Include colorful fruits and vegetables in every meal for optimal nutrient intake.",
    color: "accent",
  },
  {
    icon: Moon,
    category: "Sleep",
    title: "Rest & Recover",
    description: "Aim for 7-9 hours of quality sleep to support your immune system and mental health.",
    color: "primary",
  },
  {
    icon: Dumbbell,
    category: "Exercise",
    title: "Move Daily",
    description: "Just 30 minutes of moderate activity can boost your mood and energy levels.",
    color: "love",
  },
  {
    icon: Brain,
    category: "Mental Health",
    title: "Mindful Moments",
    description: "Practice 5 minutes of meditation or deep breathing to reduce stress.",
    color: "primary",
  },
];

const moodEmojis = ["😊", "😌", "😐", "😔", "😰"];

export const WellnessSection = () => {
  return (
    <section id="wellness" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/10 floating">
          <Heart className="w-16 h-16" />
        </div>
        <div className="absolute bottom-20 right-10 text-accent/10 floating" style={{ animationDelay: '1s' }}>
          <Smile className="w-20 h-20" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            Wellness Hub
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Thrive Every Day
          </h2>
          <p className="text-lg text-muted-foreground">
            Your daily dose of wellness tips, mood tracking, and healthy habits to help you 
            feel your best.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tips Cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {wellnessTips.map((tip, index) => {
              const Icon = tip.icon;
              const colorClasses = {
                primary: "bg-primary/10 text-primary",
                accent: "bg-accent/10 text-accent",
                love: "bg-love/10 text-love",
              };
              
              return (
                <div
                  key={tip.title}
                  className={cn(
                    "group bg-card rounded-2xl p-6 border border-border/50",
                    "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
                    "hover:-translate-y-1 cursor-pointer",
                    "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      colorClasses[tip.color as keyof typeof colorClasses]
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {tip.category}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mood Tracker Widget */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-6 border border-border/50 sticky top-24">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                How are you feeling today?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Track your mood to discover patterns and improve your wellbeing.
              </p>

              {/* Mood Selection */}
              <div className="flex justify-between mb-8">
                {moodEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-12 h-12 text-2xl rounded-full",
                      "bg-card hover:bg-primary/10 transition-all duration-200",
                      "hover:scale-110 hover:shadow-md",
                      "flex items-center justify-center"
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Quick Journal */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Quick note (optional)
                </label>
                <textarea
                  placeholder="What's on your mind?"
                  className="w-full p-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  rows={3}
                />
              </div>

              <Button variant="default" className="w-full">
                <Heart className="h-4 w-4" />
                Save Entry
              </Button>

              {/* Streak */}
              <div className="mt-6 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="text-2xl">🔥</span> 7-day tracking streak!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Wellness Journey?
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Join thousands of members who have transformed their health with our personalized 
            wellness programs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" size="lg">
              Explore Programs
            </Button>
            <Button variant="glass" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Free Assessment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
