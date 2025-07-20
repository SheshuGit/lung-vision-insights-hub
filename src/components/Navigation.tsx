import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Brain, 
  FileImage, 
  Home, 
  Menu, 
  X,
  Heart,
  Activity,
  Sparkles,
  Leaf
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/diseases", label: "Diseases", icon: Heart },
    { path: "/remedies", label: "Remedies", icon: Leaf },
    { path: "/predict", label: "X-Ray Analysis", icon: FileImage },
    { path: "/about", label: "About", icon: Activity },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="glass border-b border-border/50 sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="p-2.5 bg-gradient-medical rounded-xl shadow-medical group-hover:shadow-elevated transition-all duration-300 group-hover:scale-105">
                <Stethoscope className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold gradient-text">LungVision</h1>
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">AI Medical Insights</p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActivePath(item.path) ? "medical" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      isActivePath(item.path) 
                        ? "shadow-medical-subtle" 
                        : "hover:bg-gradient-medical-subtle hover:text-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-all duration-200 group-hover:scale-110" />
              ) : (
                <Menu className="h-5 w-5 transition-all duration-200 group-hover:scale-110" />
              )}
            </div>
          </Button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant={isActivePath(item.path) ? "medical" : "ghost"}
                      size="sm"
                      className={`w-full justify-start space-x-3 transition-all duration-200 ${
                        isActivePath(item.path) 
                          ? "shadow-medical-subtle" 
                          : "hover:bg-gradient-medical-subtle hover:text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;