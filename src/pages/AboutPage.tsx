import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Heart, 
  Shield, 
  Stethoscope, 
  Users, 
  Award,
  FileImage,
  Activity,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Technology",
      description: "State-of-the-art deep learning models trained on thousands of medical images for accurate disease detection."
    },
    {
      icon: FileImage,
      title: "X-Ray Analysis",
      description: "Comprehensive analysis of chest X-rays with detailed predictions and confidence scores."
    },
    {
      icon: Heart,
      title: "Disease Information",
      description: "Extensive database of lung diseases with causes, symptoms, treatments, and prevention strategies."
    },
    {
      icon: Shield,
      title: "Medical Safety",
      description: "Developed following medical guidelines with appropriate disclaimers and professional consultation advice."
    }
  ];

  const capabilities = [
    "Viral Pneumonia Detection",
    "Bacterial Pneumonia Detection", 
    "Tuberculosis Identification",
    "COVID-19 Pneumonia Analysis",
    "Healthy Lung Assessment"
  ];

  const team = [
    {
      role: "Medical AI Researcher",
      description: "Specialized in computer vision and medical imaging analysis"
    },
    {
      role: "Healthcare Professional",
      description: "Clinical expertise in respiratory medicine and disease diagnosis"
    },
    {
      role: "Data Scientist",
      description: "Machine learning engineering and model optimization"
    },
    {
      role: "Medical Informatician",
      description: "Healthcare data standards and clinical decision support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About LungVision AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced artificial intelligence platform designed to assist healthcare professionals and individuals 
            in understanding lung health through X-ray image analysis and comprehensive disease information.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 animate-slide-up">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center shadow-medical">
                <Stethoscope className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                To democratize access to advanced medical insights by leveraging cutting-edge AI technology, 
                making lung health screening more accessible while supporting healthcare professionals in their diagnostic processes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12 animate-fade-in">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Brain className="mr-3 h-6 w-6 text-primary" />
                AI Detection Capabilities
              </CardTitle>
              <CardDescription>
                Our machine learning model can identify and classify the following lung conditions:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-healthy flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{capability}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-xs text-muted-foreground">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">10K+</div>
                    <div className="text-xs text-muted-foreground">Training Images</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="mr-3 h-6 w-6 text-primary" />
                Expert Team
              </CardTitle>
              <CardDescription>
                Developed by a multidisciplinary team of medical and technology experts:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.map((member, index) => (
                  <div key={index} className="space-y-1">
                    <div className="font-medium text-foreground">{member.role}</div>
                    <div className="text-sm text-muted-foreground">{member.description}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <Badge variant="secondary" className="w-full justify-center py-2">
                  <Award className="mr-2 h-4 w-4" />
                  Medical AI Research Certified
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Details */}
        <Card className="mb-12 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Technology & Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Deep Learning</h4>
                <p className="text-sm text-muted-foreground">
                  Convolutional Neural Networks trained on diverse medical imaging datasets
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <FileImage className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground">Image Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced preprocessing and feature extraction for optimal model performance
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-healthy/10 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-healthy" />
                </div>
                <h4 className="font-semibold text-foreground">Validation</h4>
                <p className="text-sm text-muted-foreground">
                  Rigorous testing and validation following medical AI standards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="animate-fade-in">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Ready to Explore Lung Health AI?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start analyzing X-ray images or browse our comprehensive disease information database.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/predict">
                  <Button size="lg" variant="medical" className="text-lg px-8">
                    <FileImage className="mr-2 h-5 w-5" />
                    Analyze X-Ray
                  </Button>
                </Link>
                <Link to="/diseases">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Heart className="mr-2 h-5 w-5" />
                    Browse Diseases
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-12 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <strong>Medical Disclaimer:</strong> This platform is designed for educational and screening purposes only. 
            All results and information should be reviewed with qualified healthcare professionals. 
            This technology is not intended to replace professional medical diagnosis or treatment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;