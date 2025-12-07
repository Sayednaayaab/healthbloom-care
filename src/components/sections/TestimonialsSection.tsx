import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Emily Johnson",
    role: "New Mother",
    content: "HealthBloom made managing my pregnancy so much easier. The telehealth appointments saved me countless hours, and BloomBot was always there to answer my midnight worries!",
    rating: 5,
    avatar: "EJ",
  },
  {
    name: "Robert Chen",
    role: "Senior Patient",
    content: "At 72, I was skeptical about online healthcare. But the doctors here are patient, thorough, and genuinely caring. The symptom checker helped me catch an issue early!",
    rating: 5,
    avatar: "RC",
  },
  {
    name: "Sarah Martinez",
    role: "Busy Professional",
    content: "Between meetings and deadlines, I had zero time for health. HealthBloom changed that with quick video consults and personalized wellness plans. Life-changing!",
    rating: 5,
    avatar: "SM",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-love/10 text-love text-sm font-medium rounded-full mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from real patients who found better health with HealthBloom.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={cn(
                "relative bg-background rounded-2xl p-6 md:p-8 border border-border/50",
                "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning fill-warning" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { label: "HIPAA", sublabel: "Compliant" },
            { label: "SOC 2", sublabel: "Certified" },
            { label: "256-bit", sublabel: "Encryption" },
            { label: "24/7", sublabel: "Support" },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <div className="text-2xl font-bold text-primary">{badge.label}</div>
              <div className="text-sm text-muted-foreground">{badge.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
