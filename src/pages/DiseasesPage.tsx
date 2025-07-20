import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Heart, AlertTriangle, Shield } from "lucide-react";
import DiseaseCard from "@/components/DiseaseCard";
import { diseases } from "@/data/diseaseData";

const DiseasesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === "all" || disease.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const severityFilters = [
    { value: "all", label: "All Types", icon: Filter, count: diseases.length },
    { value: "healthy", label: "Healthy", icon: Heart, count: diseases.filter(d => d.severity === 'healthy').length },
    { value: "warning", label: "Moderate", icon: Shield, count: diseases.filter(d => d.severity === 'warning').length },
    { value: "critical", label: "Critical", icon: AlertTriangle, count: diseases.filter(d => d.severity === 'critical').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lung Disease Information
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive information about lung diseases, their causes, symptoms, treatments, and prevention strategies.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Search & Filter Diseases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search diseases, symptoms, or treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Severity Filters */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Filter by Severity</h3>
              <div className="flex flex-wrap gap-2">
                {severityFilters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <Button
                      key={filter.value}
                      variant={selectedSeverity === filter.value ? "medical" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSeverity(filter.value)}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{filter.label}</span>
                      <Badge variant="secondary" className="ml-1">
                        {filter.count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6 animate-fade-in">
          <p className="text-muted-foreground">
            Showing {filteredDiseases.length} of {diseases.length} diseases
            {searchTerm && (
              <span> matching "{searchTerm}"</span>
            )}
            {selectedSeverity !== "all" && (
              <span> in {selectedSeverity} category</span>
            )}
          </p>
        </div>

        {/* Disease Cards Grid */}
        {filteredDiseases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease, index) => (
              <div key={disease.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <DiseaseCard disease={disease} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12 animate-fade-in">
            <CardContent>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground">No diseases found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSeverity("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        <Card className="mt-12 animate-fade-in">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Need Professional Medical Advice?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                While our AI analysis provides valuable insights, it's important to consult with healthcare professionals for proper diagnosis and treatment. This information is for educational purposes only.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="medical">
                  Find Healthcare Providers
                </Button>
                <Button variant="outline">
                  Emergency Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseasesPage;