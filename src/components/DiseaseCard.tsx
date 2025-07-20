import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertTriangle, Heart, Shield } from "lucide-react";
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

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {disease.name}
            </CardTitle>
            <Badge 
              variant="secondary" 
              className={`
                ${disease.severity === 'healthy' ? 'bg-healthy/20 text-healthy border-healthy/30' : ''}
                ${disease.severity === 'warning' ? 'bg-warning/20 text-warning border-warning/30' : ''}
                ${disease.severity === 'critical' ? 'bg-critical/20 text-critical border-critical/30' : ''}
              `}
            >
              {getSeverityIcon()}
              <span className="ml-1 capitalize">{disease.severity}</span>
            </Badge>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {disease.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-foreground mb-2">Key Symptoms</h4>
            <ul className="space-y-1 text-muted-foreground">
              {disease.symptoms.slice(0, 3).map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Prevention</h4>
            <ul className="space-y-1 text-muted-foreground">
              {disease.prevention.slice(0, 3).map((prevention, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-accent rounded-full mt-2 mr-2 flex-shrink-0" />
                  {prevention}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <Link to={`/disease/${disease.id}`}>
            <Button 
              variant={getSeverityVariant()} 
              className="w-full group/btn"
              size="sm"
            >
              <span>Learn More</span>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseCard;