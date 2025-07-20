import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertTriangle, Heart, Shield, Sparkles } from "lucide-react";
import { Disease } from "@/data/diseaseData";
import { Link } from "react-router-dom";

interface DiseaseCardProps {
  disease: Disease;
}

const DiseaseCard = ({ disease }: DiseaseCardProps) => {
  const getSeverityIcon = () => {
    switch (disease.severity) {
      case 'healthy':
        return <Heart className="h-4 w-4" />;
      case 'warning':
        return <Shield className="h-4 w-4" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  const getSeverityVariant = () => {
    switch (disease.severity) {
      case 'healthy':
        return 'healthy';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'critical';
      default:
        return 'healthy';
    }
  };

  const getSeverityGradient = () => {
    switch (disease.severity) {
      case 'healthy':
        return 'from-healthy/20 to-healthy/10';
      case 'warning':
        return 'from-warning/20 to-warning/10';
      case 'critical':
        return 'from-critical/20 to-critical/10';
      default:
        return 'from-healthy/20 to-healthy/10';
    }
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] animate-fade-in overflow-hidden relative">
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getSeverityGradient()} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg group-hover:text-primary transition-colors relative">
                {disease.name}
              </CardTitle>
              <Sparkles className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <Badge 
              variant="secondary" 
              className={`
                relative transition-all duration-300 group-hover:scale-105
                ${disease.severity === 'healthy' ? 'bg-healthy/20 text-healthy border-healthy/30 shadow-healthy/20' : ''}
                ${disease.severity === 'warning' ? 'bg-warning/20 text-warning border-warning/30 shadow-warning/20' : ''}
                ${disease.severity === 'critical' ? 'bg-critical/20 text-critical border-critical/30 shadow-critical/20' : ''}
              `}
            >
              {getSeverityIcon()}
              <span className="ml-1 capitalize font-medium">{disease.severity}</span>
            </Badge>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed relative">
          {disease.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-2" />
              Key Symptoms
            </h4>
            <ul className="space-y-1.5 text-muted-foreground">
              {disease.symptoms.slice(0, 3).map((symptom, index) => (
                <li key={index} className="flex items-start group/item">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200" />
                  <span className="text-xs leading-relaxed">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-2" />
              Prevention
            </h4>
            <ul className="space-y-1.5 text-muted-foreground">
              {disease.prevention.slice(0, 3).map((prevention, index) => (
                <li key={index} className="flex items-start group/item">
                  <span className="w-1 h-1 bg-accent rounded-full mt-2 mr-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200" />
                  <span className="text-xs leading-relaxed">{prevention}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-3 border-t border-border/50">
          <Link to={`/disease/${disease.id}`}>
            <Button 
              variant={getSeverityVariant()} 
              className="w-full group/btn shadow-card hover:shadow-elevated transition-all duration-300"
              size="sm"
            >
              <span className="font-medium">Learn More</span>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseCard;