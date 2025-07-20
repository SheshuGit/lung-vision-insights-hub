import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Heart, AlertTriangle, Shield, Sparkles, TrendingUp } from "lucide-react";
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
    { value: "all", label: "All Types", icon: Filter, count: diseases.length, color: "bg-primary/20 text-primary border-primary/30" },
    { value: "healthy", label: "Healthy", icon: Heart, count: diseases.filter(d => d.severity === 'healthy').length, color: "bg-healthy/20 text-healthy border-healthy/30" },
    { value: "warning", label: "Moderate", icon: Shield, count: diseases.filter(d => d.severity === 'warning').length, color: "bg-warning/20 text-warning border-warning/30" },
    { value: "critical", label: "Critical", icon: AlertTriangle, count: diseases.filter(d => d.severity === 'critical').length, color: "bg-critical/20 text-critical border-critical/30" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Lung Disease Information
            </h1>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive information about lung diseases, their causes, symptoms, treatments, and prevention strategies.
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="mb-8 animate-slide-up glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5 text-primary" />
              Search & Filter Diseases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enhanced Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search diseases, symptoms, or treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:shadow-medical-subtle"
              />
            </div>

            {/* Enhanced Severity Filters */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-accent" />
                Filter by Severity
              </h3>
              <div className="flex flex-wrap gap-3">
                {severityFilters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <Button
                      key={filter.value}
                      variant={selectedSeverity === filter.value ? "medical" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSeverity(filter.value)}
                      className={`flex items-center space-x-2 transition-all duration-200 ${
                        selectedSeverity === filter.value 
                          ? "shadow-medical-subtle" 
                          : "hover:shadow-card"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{filter.label}</span>
                      <Badge 
                        variant="secondary" 
                        className={`ml-1 ${filter.color}`}
                      >
                        {filter.count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Results Summary */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground font-medium">
              Showing {filteredDiseases.length} of {diseases.length} diseases
              {searchTerm && (
                <span className="text-primary"> matching "{searchTerm}"</span>
              )}
              {selectedSeverity !== "all" && (
                <span className="text-primary"> in {selectedSeverity} category</span>
              )}
            </p>
            {(searchTerm || selectedSeverity !== "all") && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSeverity("all");
                }}
                className="text-xs"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Disease Cards Grid */}
        {filteredDiseases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease, index) => (
              <div key={disease.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <DiseaseCard disease={disease} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16 animate-fade-in glass">
            <CardContent>
              <div className="space-y-6">
                <div className="mx-auto w-20 h-20 bg-gradient-medical-subtle rounded-2xl flex items-center justify-center">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">No diseases found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSeverity("all");
                  }}
                  className="shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Additional Information */}
        <Card className="mt-12 animate-fade-in glass">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-bold text-foreground">
                  Need Professional Medical Advice?
                </h3>
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                While our AI analysis provides valuable insights, it's important to consult with healthcare professionals for proper diagnosis and treatment. This information is for educational purposes only.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="medical" className="shadow-elevated hover:shadow-float transition-all duration-300">
                  Find Healthcare Providers
                </Button>
                <Button variant="outline" className="shadow-card hover:shadow-elevated transition-all duration-300">
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