import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileImage, Heart, Brain, Activity, ArrowRight, Shield, Stethoscope } from "lucide-react";
import medicalHero from "@/assets/medical-hero.jpg";

const HomePage = () => {
  const features = [
    {
      icon: Heart,
      title: "Disease Information",
      description: "Comprehensive details about lung diseases, causes, symptoms, and treatments",
      link: "/diseases",
      color: "text-critical"
    },
    {
      icon: FileImage,
      title: "X-Ray Analysis",
      description: "AI-powered lung X-ray analysis for disease prediction and diagnosis",
      link: "/predict",
      color: "text-primary"
    },
    {
      icon: Brain,
      title: "Smart Insights",
      description: "Advanced machine learning algorithms for accurate medical predictions",
      link: "/about",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Prevention Tips",
      description: "Learn how to maintain healthy lungs and prevent respiratory diseases",
      link: "/diseases",
      color: "text-healthy"
    }
  ];

  const stats = [
    { label: "Disease Types Detected", value: "5", color: "text-primary" },
    { label: "Accuracy Rate", value: "95%", color: "text-healthy" },
    { label: "X-Rays Analyzed", value: "10K+", color: "text-accent" },
    { label: "Medical Insights", value: "24/7", color: "text-warning" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-medical opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${medicalHero})` }}
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Advanced Lung Disease
                <span className="block text-accent">Detection & Analysis</span>
              </h1>
              
              <p className="text-xl md:text-2xl leading-relaxed opacity-90 max-w-2xl mx-auto">
                Harness the power of AI to analyze lung X-rays, predict diseases, and access comprehensive medical insights for better respiratory health.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/predict">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  <FileImage className="mr-2 h-5 w-5" />
                  Analyze X-Ray
                </Button>
              </Link>
              
              <Link to="/diseases">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Heart className="mr-2 h-5 w-5" />
                  Explore Diseases
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Lung Health Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI platform provides complete lung health analysis with detailed disease information and prevention strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] animate-slide-up">
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto p-3 bg-background rounded-full w-fit shadow-card group-hover:shadow-medical transition-all duration-300`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center space-y-4">
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    
                    <Link to={feature.link}>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-medical">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground space-y-8 animate-fade-in">
            <div className="flex justify-center">
              <div className="p-4 bg-primary-foreground/20 rounded-full">
                <Stethoscope className="h-12 w-12" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Analyze Your Lung Health?
            </h2>
            
            <p className="text-xl opacity-90">
              Upload your X-ray image and get instant AI-powered analysis with detailed medical insights.
            </p>
            
            <Link to="/predict">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                <FileImage className="mr-2 h-5 w-5" />
                Start Analysis Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;