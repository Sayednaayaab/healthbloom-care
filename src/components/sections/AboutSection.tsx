import { useState } from "react";
import { ChevronDown, ChevronUp, Heart, Users, Award, Shield, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const aboutItems = [
  {
    id: "mission",
    icon: Target,
    title: "Our Mission",
    summary: "To provide accessible, compassionate healthcare for everyone.",
    details: "At HealthBloom, our mission is to revolutionize healthcare accessibility by combining cutting-edge technology with compassionate care. We believe that quality healthcare should be available to everyone, regardless of location, time, or socioeconomic status. Through our innovative platform, we connect patients with certified healthcare professionals, provide AI-powered symptom checking, and offer comprehensive wellness programs to empower individuals to take control of their health journey."
  },
  {
    id: "vision",
    icon: Eye,
    title: "Our Vision",
    summary: "A world where healthcare is proactive, personalized, and preventive.",
    details: "We envision a future where healthcare is no longer reactive but proactive and preventive. By leveraging artificial intelligence, telemedicine, and data-driven insights, we aim to create a healthcare ecosystem that anticipates health needs, personalizes treatment plans, and prevents illnesses before they occur. Our vision is to empower individuals with the knowledge and tools they need to maintain optimal health throughout their lives."
  },
  {
    id: "values",
    icon: Heart,
    title: "Our Values",
    summary: "Compassion, innovation, integrity, and patient-centered care.",
    details: "Our core values guide everything we do: Compassion drives us to understand and address the unique needs of each patient. Innovation pushes us to continuously improve our technology and services. Integrity ensures we maintain the highest standards of ethics and transparency. Patient-centered care means we always prioritize the well-being and preferences of those we serve. These values form the foundation of our commitment to excellence in healthcare delivery."
  },
  {
    id: "team",
    icon: Users,
    title: "Our Team",
    summary: "Experienced healthcare professionals and tech innovators.",
    details: "Our diverse team combines decades of healthcare experience with cutting-edge technological expertise. Our medical professionals include board-certified physicians, nurses, and specialists across multiple disciplines. Our technology team consists of AI engineers, software developers, and UX designers who are passionate about creating intuitive healthcare solutions. Together, we work collaboratively to bridge the gap between traditional healthcare and modern technology."
  },
  {
    id: "quality",
    icon: Award,
    title: "Quality Assurance",
    summary: "Rigorous standards and continuous improvement.",
    details: "Quality is at the heart of everything we do. We maintain rigorous standards for our healthcare providers, technology platforms, and service delivery. Our quality assurance processes include regular audits, patient feedback integration, clinical outcome monitoring, and continuous improvement initiatives. We are committed to maintaining the highest standards of care and ensuring that every interaction with our platform meets or exceeds industry benchmarks."
  },
  {
    id: "security",
    icon: Shield,
    title: "Privacy & Security",
    summary: "Your health data is protected with enterprise-grade security.",
    details: "We understand that health information is among the most sensitive data individuals entrust to others. That's why we implement enterprise-grade security measures including end-to-end encryption, HIPAA compliance, regular security audits, and advanced threat detection. Your personal health information is stored securely and only accessed by authorized healthcare professionals involved in your care. We are committed to maintaining the confidentiality and integrity of your health data."
  }
];

export const AboutSection = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            About HealthBloom
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Committed to Your Health Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn more about our mission, values, and the dedicated team working to make healthcare more accessible and effective for everyone.
          </p>
        </div>

        {/* About Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutItems.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.has(item.id);

            return (
              <Card
                key={item.id}
                className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleItem(item.id)}
                      className="p-1 h-8 w-8"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {item.summary}
                  </p>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleItem(item.id)}
                    className="w-full mt-4"
                  >
                    {isExpanded ? "Show Less" : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Experience Better Healthcare?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of patients who have transformed their healthcare experience with HealthBloom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More About Our Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
