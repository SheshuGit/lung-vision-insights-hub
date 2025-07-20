import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Leaf, 
  Droplets, 
  Flower, 
  TreePine, 
  Sparkles,
  Heart,
  Shield,
  AlertTriangle,
  BookOpen,
  Clock,
  Star,
  Filter,
  TrendingUp
} from "lucide-react";

interface Remedy {
  id: string;
  name: string;
  category: 'herbs' | 'essential-oils' | 'lifestyle' | 'diet' | 'breathing';
  effectiveness: 'high' | 'medium' | 'low';
  preparation: string;
  benefits: string[];
  precautions: string[];
  duration: string;
  ingredients?: string[];
  instructions: string[];
}

const RemediesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedEffectiveness, setSelectedEffectiveness] = useState<string>("all");

  const remedies: Remedy[] = [
    {
      id: "1",
      name: "Ginger Tea",
      category: "herbs",
      effectiveness: "high",
      preparation: "5-10 minutes",
      duration: "2-3 times daily",
      benefits: [
        "Reduces inflammation in airways",
        "Boosts immune system",
        "Relieves cough and congestion",
        "Improves respiratory function"
      ],
      precautions: [
        "Avoid if you have bleeding disorders",
        "May interact with blood thinners",
        "Not recommended during pregnancy"
      ],
      ingredients: ["Fresh ginger root", "Honey", "Lemon", "Hot water"],
      instructions: [
        "Slice 1-2 inches of fresh ginger",
        "Boil in 2 cups of water for 10 minutes",
        "Add honey and lemon to taste",
        "Drink 2-3 times daily"
      ]
    },
    {
      id: "2",
      name: "Eucalyptus Essential Oil",
      category: "essential-oils",
      effectiveness: "high",
      preparation: "2-3 minutes",
      duration: "2-3 times daily",
      benefits: [
        "Clears nasal congestion",
        "Reduces inflammation",
        "Improves breathing",
        "Natural decongestant"
      ],
      precautions: [
        "Never ingest essential oils",
        "Dilute before topical use",
        "Keep away from children",
        "Avoid if you have asthma"
      ],
      instructions: [
        "Add 3-5 drops to diffuser",
        "Inhale steam with 2 drops in hot water",
        "Apply diluted to chest (1 drop per teaspoon carrier oil)",
        "Use 2-3 times daily"
      ]
    },
    {
      id: "3",
      name: "Deep Breathing Exercises",
      category: "breathing",
      effectiveness: "high",
      preparation: "5-15 minutes",
      duration: "5-10 minutes daily",
      benefits: [
        "Strengthens lung capacity",
        "Reduces stress and anxiety",
        "Improves oxygen circulation",
        "Enhances respiratory function"
      ],
      precautions: [
        "Stop if you feel dizzy",
        "Don't overexert yourself",
        "Consult doctor if you have heart conditions"
      ],
      instructions: [
        "Sit comfortably with straight back",
        "Place hands on abdomen",
        "Inhale deeply through nose for 4 counts",
        "Hold breath for 4 counts",
        "Exhale slowly through mouth for 6 counts",
        "Repeat for 5-10 minutes"
      ]
    },
    {
      id: "4",
      name: "Turmeric Golden Milk",
      category: "herbs",
      effectiveness: "medium",
      preparation: "10-15 minutes",
      duration: "Once daily",
      benefits: [
        "Anti-inflammatory properties",
        "Boosts immunity",
        "Improves respiratory health",
        "Rich in antioxidants"
      ],
      precautions: [
        "May cause stomach upset in some",
        "Avoid if you have gallbladder issues",
        "May interact with diabetes medications"
      ],
      ingredients: ["Turmeric powder", "Milk", "Honey", "Black pepper", "Cinnamon"],
      instructions: [
        "Heat 1 cup of milk",
        "Add 1/2 tsp turmeric powder",
        "Add pinch of black pepper",
        "Add honey and cinnamon to taste",
        "Drink before bedtime"
      ]
    },
    {
      id: "5",
      name: "Steam Inhalation",
      category: "lifestyle",
      effectiveness: "medium",
      preparation: "5-10 minutes",
      duration: "2-3 times daily",
      benefits: [
        "Loosens mucus",
        "Relieves congestion",
        "Soothes irritated airways",
        "Improves breathing"
      ],
      precautions: [
        "Be careful with hot water",
        "Don't burn yourself",
        "Keep face at safe distance",
        "Stop if uncomfortable"
      ],
      instructions: [
        "Boil water in a pot",
        "Add 2-3 drops of essential oil (optional)",
        "Place towel over head",
        "Inhale steam for 5-10 minutes",
        "Repeat 2-3 times daily"
      ]
    },
    {
      id: "6",
      name: "Honey and Lemon",
      category: "diet",
      effectiveness: "medium",
      preparation: "2 minutes",
      duration: "2-3 times daily",
      benefits: [
        "Soothes sore throat",
        "Natural cough suppressant",
        "Boosts immunity",
        "Provides antioxidants"
      ],
      precautions: [
        "Don't give honey to children under 1",
        "May raise blood sugar",
        "Use raw, unprocessed honey"
      ],
      ingredients: ["Raw honey", "Fresh lemon juice", "Warm water"],
      instructions: [
        "Mix 1 tbsp honey with 1 tbsp lemon juice",
        "Add to warm water",
        "Drink 2-3 times daily",
        "Can be taken directly by spoon"
      ]
    },
    {
      id: "7",
      name: "Peppermint Tea",
      category: "herbs",
      effectiveness: "medium",
      preparation: "5 minutes",
      duration: "2-3 times daily",
      benefits: [
        "Relieves congestion",
        "Soothes respiratory tract",
        "Reduces inflammation",
        "Natural decongestant"
      ],
      precautions: [
        "May cause heartburn in some",
        "Avoid if you have GERD",
        "Not recommended for infants"
      ],
      ingredients: ["Fresh peppermint leaves", "Hot water", "Honey (optional)"],
      instructions: [
        "Steep 1 tbsp fresh leaves in hot water",
        "Let steep for 5 minutes",
        "Strain and add honey if desired",
        "Drink 2-3 times daily"
      ]
    },
    {
      id: "8",
      name: "Salt Water Gargle",
      category: "lifestyle",
      effectiveness: "medium",
      preparation: "1 minute",
      duration: "3-4 times daily",
      benefits: [
        "Reduces throat inflammation",
        "Kills bacteria",
        "Relieves sore throat",
        "Loosens mucus"
      ],
      precautions: [
        "Don't swallow salt water",
        "Use warm, not hot water",
        "Stop if it causes irritation"
      ],
      instructions: [
        "Mix 1/2 tsp salt in 1 cup warm water",
        "Gargle for 30 seconds",
        "Spit out (don't swallow)",
        "Repeat 3-4 times daily"
      ]
    },
    {
      id: "9",
      name: "Garlic and Honey",
      category: "diet",
      effectiveness: "high",
      preparation: "24 hours",
      duration: "2-3 times daily",
      benefits: [
        "Natural antibiotic properties",
        "Boosts immune system",
        "Reduces inflammation",
        "Fights respiratory infections"
      ],
      precautions: [
        "May cause bad breath",
        "May interact with blood thinners",
        "Avoid if you have stomach ulcers"
      ],
      ingredients: ["Fresh garlic cloves", "Raw honey"],
      instructions: [
        "Crush 3-4 garlic cloves",
        "Mix with 1 tbsp honey",
        "Let sit for 24 hours",
        "Take 1 tsp 2-3 times daily"
      ]
    },
    {
      id: "10",
      name: "Yoga for Lung Health",
      category: "lifestyle",
      effectiveness: "high",
      preparation: "20-30 minutes",
      duration: "Daily practice",
      benefits: [
        "Improves lung capacity",
        "Reduces stress",
        "Enhances breathing",
        "Strengthens respiratory muscles"
      ],
      precautions: [
        "Start slowly if beginner",
        "Don't overexert yourself",
        "Stop if you feel pain"
      ],
      instructions: [
        "Practice pranayama (breathing exercises)",
        "Do gentle chest-opening poses",
        "Include relaxation poses",
        "Practice daily for best results"
      ]
    }
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: Filter, count: remedies.length },
    { value: "herbs", label: "Herbs", icon: Leaf, count: remedies.filter(r => r.category === 'herbs').length },
    { value: "essential-oils", label: "Essential Oils", icon: Droplets, count: remedies.filter(r => r.category === 'essential-oils').length },
    { value: "lifestyle", label: "Lifestyle", icon: Heart, count: remedies.filter(r => r.category === 'lifestyle').length },
    { value: "diet", label: "Diet", icon: Flower, count: remedies.filter(r => r.category === 'diet').length },
    { value: "breathing", label: "Breathing", icon: TreePine, count: remedies.filter(r => r.category === 'breathing').length }
  ];

  const effectivenessLevels = [
    { value: "all", label: "All Levels", icon: TrendingUp, count: remedies.length },
    { value: "high", label: "High Effectiveness", icon: Star, count: remedies.filter(r => r.effectiveness === 'high').length },
    { value: "medium", label: "Medium Effectiveness", icon: Shield, count: remedies.filter(r => r.effectiveness === 'medium').length },
    { value: "low", label: "Low Effectiveness", icon: AlertTriangle, count: remedies.filter(r => r.effectiveness === 'low').length }
  ];

  const filteredRemedies = remedies.filter(remedy => {
    const matchesSearch = remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         remedy.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || remedy.category === selectedCategory;
    const matchesEffectiveness = selectedEffectiveness === "all" || remedy.effectiveness === selectedEffectiveness;
    return matchesSearch && matchesCategory && matchesEffectiveness;
  });

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'high': return 'bg-healthy/20 text-healthy border-healthy/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-critical/20 text-critical border-critical/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'herbs': return <Leaf className="h-4 w-4" />;
      case 'essential-oils': return <Droplets className="h-4 w-4" />;
      case 'lifestyle': return <Heart className="h-4 w-4" />;
      case 'diet': return <Flower className="h-4 w-4" />;
      case 'breathing': return <TreePine className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Natural Lung Remedies
            </h1>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover complete natural remedies for lung health, respiratory wellness, and breathing improvement.
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="mb-8 animate-slide-up glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5 text-primary" />
              Search & Filter Remedies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enhanced Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search remedies, benefits, or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:shadow-medical-subtle"
              />
            </div>

            {/* Category Filters */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <Filter className="mr-2 h-4 w-4 text-accent" />
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "medical" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex items-center space-x-2 transition-all duration-200 ${
                        selectedCategory === category.value 
                          ? "shadow-medical-subtle" 
                          : "hover:shadow-card"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{category.label}</span>
                      <Badge variant="secondary" className="ml-1">
                        {category.count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Effectiveness Filters */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-accent" />
                Filter by Effectiveness
              </h3>
              <div className="flex flex-wrap gap-3">
                {effectivenessLevels.map((level) => {
                  const Icon = level.icon;
                  return (
                    <Button
                      key={level.value}
                      variant={selectedEffectiveness === level.value ? "medical" : "outline"}
                      size="sm"
                      onClick={() => setSelectedEffectiveness(level.value)}
                      className={`flex items-center space-x-2 transition-all duration-200 ${
                        selectedEffectiveness === level.value 
                          ? "shadow-medical-subtle" 
                          : "hover:shadow-card"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{level.label}</span>
                      <Badge variant="secondary" className="ml-1">
                        {level.count}
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
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground font-medium">
              Showing {filteredRemedies.length} of {remedies.length} remedies
              {searchTerm && (
                <span className="text-primary"> matching "{searchTerm}"</span>
              )}
            </p>
            {(searchTerm || selectedCategory !== "all" || selectedEffectiveness !== "all") && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedEffectiveness("all");
                }}
                className="text-xs"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Remedies Grid */}
        {filteredRemedies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRemedies.map((remedy, index) => (
              <Card key={remedy.id} className="group hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] animate-slide-up overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(remedy.category)}
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {remedy.name}
                      </CardTitle>
                    </div>
                    <Badge className={getEffectivenessColor(remedy.effectiveness)}>
                      {remedy.effectiveness} effectiveness
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Prep: {remedy.preparation}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 relative">
                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <Heart className="mr-2 h-4 w-4 text-healthy" />
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {remedy.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <span className="w-1 h-1 bg-healthy rounded-full mt-2 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions Preview */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <BookOpen className="mr-2 h-4 w-4 text-primary" />
                      Quick Instructions
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {remedy.instructions[0]}...
                    </div>
                  </div>

                  {/* Precautions */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
                      Precautions
                    </h4>
                    <ul className="space-y-1">
                      {remedy.precautions.slice(0, 2).map((precaution, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <span className="w-1 h-1 bg-warning rounded-full mt-2 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Details Button */}
                  <Button 
                    variant="outline" 
                    className="w-full group/btn shadow-card hover:shadow-elevated transition-all duration-300"
                    size="sm"
                  >
                    <span className="font-medium">View Complete Details</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16 animate-fade-in glass">
            <CardContent>
              <div className="space-y-6">
                <div className="mx-auto w-20 h-20 bg-gradient-medical-subtle rounded-2xl flex items-center justify-center">
                  <Leaf className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">No remedies found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your search terms or filters to find natural remedies.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedEffectiveness("all");
                  }}
                  className="shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Important Notice */}
        <Card className="mt-12 animate-fade-in glass">
          <CardContent className="py-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-warning/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Important Disclaimer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These natural remedies are for educational purposes only. They should not replace professional medical advice, 
                  diagnosis, or treatment. Always consult with qualified healthcare providers before trying any new remedies, 
                  especially if you have existing medical conditions or are taking medications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RemediesPage; 