import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileImage, Heart, Brain, Activity, ArrowRight, Shield, Stethoscope, Sparkles, TrendingUp, Users, Zap, Leaf } from "lucide-react";
import medicalHero from "@/assets/medical-hero.jpg";

const HomePage = () => {
  const features = [
    {
      icon: Heart,
      title: "Disease Information",
      description: "Comprehensive details about lung diseases, causes, symptoms, and treatments",
      link: "/diseases",
      color: "text-critical",
      gradient: "from-critical/20 to-critical/10"
    },
    {
      icon: FileImage,
      title: "X-Ray Analysis",
      description: "AI-powered lung X-ray analysis for disease prediction and diagnosis",
      link: "/predict",
      color: "text-primary",
      gradient: "from-primary/20 to-primary/10"
    },
    {
      icon: Leaf,
      title: "Natural Remedies",
      description: "Complete natural remedies and treatments for lung health and respiratory wellness",
      link: "/remedies",
      color: "text-healthy",
      gradient: "from-healthy/20 to-healthy/10"
    },
    {
      icon: Brain,
      title: "Smart Insights",
      description: "Advanced machine learning algorithms for accurate medical predictions",
      link: "/about",
      color: "text-accent",
      gradient: "from-accent/20 to-accent/10"
    }
  ];

  const stats = [
    { label: "Disease Types Detected", value: "5", color: "text-primary", icon: TrendingUp },
    { label: "Accuracy Rate", value: "95%", color: "text-healthy", icon: Zap },
    { label: "X-Rays Analyzed", value: "10K+", color: "text-accent", icon: FileImage },
    { label: "Medical Insights", value: "24/7", color: "text-warning", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${medicalHero})` }}
        />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full float" />
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-healthy/10 rounded-full float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground space-y-8">
            <div className="animate-fade-in">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                <span className="text-lg font-medium text-accent">AI-Powered Medical Analysis</span>
                <Sparkles className="h-6 w-6 text-accent animate-pulse" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Advanced Lung Disease
                <span className="block text-accent bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Detection & Analysis
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl leading-relaxed opacity-90 max-w-2xl mx-auto">
                Harness the power of AI to analyze lung X-rays, predict diseases, and access comprehensive medical insights for better respiratory health.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/predict">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 shadow-elevated hover:shadow-float transition-all duration-300">
                  <FileImage className="mr-2 h-5 w-5" />
                  Analyze X-Ray
                </Button>
              </Link>
              
              <Link to="/diseases">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-card hover:shadow-elevated transition-all duration-300">
                  <Heart className="mr-2 h-5 w-5" />
                  Explore Diseases
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-fade-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative">
                    <div className="mx-auto w-16 h-16 bg-gradient-medical-subtle rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
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
                <Card key={index} className="group hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] animate-slide-up overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardHeader className="text-center pb-4 relative">
                    <div className="mx-auto p-3 bg-background/80 backdrop-blur-sm rounded-2xl w-fit shadow-card group-hover:shadow-elevated transition-all duration-300 group-hover:scale-110">
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors relative">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center space-y-4 relative">
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    
                    <Link to={feature.link}>
                      <Button variant="ghost" size="sm" className="group/btn relative">
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

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-medical relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto text-primary-foreground space-y-8 animate-fade-in">
            <div className="flex justify-center">
              <div className="p-4 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl shadow-elevated">
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
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3 shadow-elevated hover:shadow-float transition-all duration-300">
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