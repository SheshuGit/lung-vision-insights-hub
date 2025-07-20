import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Heart, 
  AlertTriangle, 
  Shield, 
  Stethoscope,
  ClipboardList,
  Pill,
  ShieldCheck
} from "lucide-react";
import { getDiseaseById } from "@/data/diseaseData";

const DiseaseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const disease = id ? getDiseaseById(id) : null;

  if (!disease) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Disease Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The disease information you're looking for could not be found.
            </p>
            <Link to="/diseases">
              <Button variant="medical">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Diseases
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSeverityIcon = () => {
    switch (disease.severity) {
      case 'healthy':
        return <Heart className="h-5 w-5" />;
      case 'warning':
        return <Shield className="h-5 w-5" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Heart className="h-5 w-5" />;
    }
  };

  const getSeverityColor = () => {
    switch (disease.severity) {
      case 'healthy':
        return 'bg-healthy/20 text-healthy border-healthy/30';
      case 'warning':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'critical':
        return 'bg-critical/20 text-critical border-critical/30';
      default:
        return 'bg-healthy/20 text-healthy border-healthy/30';
    }
  };

  const sections = [
    {
      title: "Causes",
      icon: Stethoscope,
      data: disease.causes,
      description: "Common factors that lead to this condition"
    },
    {
      title: "Symptoms",
      icon: ClipboardList,
      data: disease.symptoms,
      description: "Signs and symptoms to watch for"
    },
    {
      title: "Treatments",
      icon: Pill,
      data: disease.treatments,
      description: "Available treatment options and approaches"
    },
    {
      title: "Prevention",
      icon: ShieldCheck,
      data: disease.prevention,
      description: "Steps to prevent or reduce risk"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6 animate-fade-in">
          <Link to="/diseases">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Diseases
            </Button>
          </Link>
        </div>

        {/* Header */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader className="pb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {disease.name}
                  </h1>
                  <Badge 
                    variant="secondary" 
                    className={`w-fit ${getSeverityColor()}`}
                  >
                    {getSeverityIcon()}
                    <span className="ml-2 capitalize">{disease.severity}</span>
                  </Badge>
                </div>
                <CardDescription className="text-base leading-relaxed max-w-2xl">
                  {disease.description}
                </CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Link to="/predict">
                  <Button variant="medical" size="sm">
                    Analyze X-Ray
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  Share Info
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card 
                key={section.title} 
                className="animate-fade-in hover:shadow-elevated transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                  <CardDescription>
                    {section.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {section.data.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Notice for Critical Conditions */}
        {disease.severity === 'critical' && (
          <Card className="mt-8 border-critical/30 bg-critical/5 animate-fade-in">
            <CardContent className="py-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-critical mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-critical text-lg">Emergency Medical Attention Required</h4>
                  <p className="text-sm text-foreground/80">
                    This is a serious medical condition that requires immediate professional medical attention. 
                    If you suspect you or someone else has {disease.name.toLowerCase()}, seek emergency medical care immediately.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button variant="critical" size="sm">
                      Find Emergency Care
                    </Button>
                    <Button variant="outline" size="sm">
                      Call Emergency Services
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Medical Disclaimer */}
        <Card className="mt-8 animate-fade-in">
          <CardContent className="py-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Medical Information Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The information provided here is for educational purposes only and should not be used as a substitute for professional medical advice, 
                diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions. 
                Never disregard professional medical advice or delay in seeking it because of information obtained from this application.
              </p>
              <Separator className="my-4" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="medical" size="sm">
                  Find Healthcare Providers
                </Button>
                <Button variant="outline" size="sm">
                  Medical Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetailPage;