import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileImage, 
  Loader2, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Download,
  RotateCcw,
  Brain,
  Sparkles,
  Zap,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import logoImage from '@/assets/mediscan-logo.png';

interface PredictionResult {
  disease: string;
  confidence: number;
  severity: 'healthy' | 'warning' | 'critical';
  recommendations: string[];
  precautions: string[];
  remedies: string[];
  treatment: string[];
}

const PredictionPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setPredictionResult(null);
        toast({
          title: "Image uploaded",
          description: "X-ray image ready for analysis",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (.jpg, .png, .jpeg)",
          variant: "destructive",
        });
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPredictionResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const simulateAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis progress
    const progressSteps = [
      { progress: 20, message: "Preprocessing image..." },
      { progress: 40, message: "Extracting features..." },
      { progress: 60, message: "Running AI model..." },
      { progress: 80, message: "Analyzing patterns..." },
      { progress: 100, message: "Generating results..." }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(step.progress);
    }

    // Simulate prediction result (you'll replace this with actual ML model integration)
    const mockResults: PredictionResult[] = [
      {
        disease: "Healthy",
        confidence: 92.5,
        severity: "healthy",
        recommendations: [
          "Continue maintaining healthy lifestyle habits",
          "Regular exercise to strengthen respiratory system",
          "Annual health check-ups recommended"
        ],
        precautions: [
          "Maintain proper hygiene practices",
          "Avoid smoking and secondhand smoke",
          "Stay up to date with vaccinations",
          "Practice good respiratory hygiene"
        ],
        remedies: [
          "Regular physical activity (30 minutes daily)",
          "Balanced diet rich in antioxidants",
          "Adequate sleep (7-9 hours nightly)",
          "Stress management techniques"
        ],
        treatment: [
          "No specific treatment required",
          "Continue preventive health measures",
          "Regular health monitoring",
          "Maintain healthy lifestyle"
        ]
      },
      {
        disease: "Viral Pneumonia",
        confidence: 87.3,
        severity: "warning",
        recommendations: [
          "Consult healthcare provider for proper diagnosis",
          "Rest and increase fluid intake",
          "Monitor symptoms closely"
        ],
        precautions: [
          "Isolate from others to prevent spread",
          "Wear mask when around others",
          "Wash hands frequently",
          "Avoid close contact with vulnerable individuals"
        ],
        remedies: [
          "Complete bed rest for 7-10 days",
          "Increase fluid intake (3-4 liters daily)",
          "Use humidifier to ease breathing",
          "Honey and warm water for cough relief"
        ],
        treatment: [
          "Antiviral medications if prescribed",
          "Supportive care and symptom management",
          "Oxygen therapy if required",
          "Regular monitoring of vital signs"
        ]
      },
      {
        disease: "Bacterial Pneumonia",
        confidence: 94.1,
        severity: "critical",
        recommendations: [
          "Seek immediate medical attention",
          "Antibiotic treatment likely required",
          "Hospital evaluation recommended"
        ],
        precautions: [
          "Immediate isolation from others",
          "Strict hygiene protocols",
          "Monitor for complications",
          "Avoid strenuous activities"
        ],
        remedies: [
          "Complete bed rest under medical supervision",
          "Prescribed medication adherence",
          "Chest physiotherapy if recommended",
          "Nutritional support for recovery"
        ],
        treatment: [
          "Antibiotic therapy (7-14 days course)",
          "Hospitalization if severe",
          "IV fluids and electrolyte management",
          "Respiratory support if needed"
        ]
      }
    ];

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setPredictionResult(randomResult);
    setIsAnalyzing(false);

    toast({
      title: "Analysis complete",
      description: `Prediction: ${randomResult.disease} (${randomResult.confidence}% confidence)`,
    });
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setPredictionResult(null);
    setAnalysisProgress(0);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'healthy': return 'bg-healthy text-healthy-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-critical text-critical-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const generateAnalysisReport = async () => {
    if (!predictionResult) return;

    const pdf = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    // Set up colors and fonts
    const primaryColor: [number, number, number] = [41, 128, 185]; // Professional blue
    const secondaryColor: [number, number, number] = [52, 73, 94]; // Dark gray
    const accentColor: [number, number, number] = [39, 174, 96]; // Success green
    const warningColor: [number, number, number] = [243, 156, 18]; // Warning orange
    const criticalColor: [number, number, number] = [231, 76, 60]; // Critical red
    
    // Helper function to get severity color
    const getSeverityColorRGB = (severity: string) => {
      switch (severity) {
        case 'healthy': return accentColor;
        case 'warning': return warningColor;
        case 'critical': return criticalColor;
        default: return secondaryColor;
      }
    };

    try {
      // Load and add logo
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
        logoImg.src = logoImage;
      });
      
      // Add logo
      pdf.addImage(logoImg, 'PNG', 15, 15, 40, 16);
    } catch (error) {
      console.log('Logo not loaded, continuing without it');
    }

    // Header section
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('MEDICAL X-RAY ANALYSIS REPORT', 70, 25);
    
    // Subtitle
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...secondaryColor);
    pdf.text(`Generated on: ${currentDate} at ${currentTime}`, 70, 32);
    
    // Draw header line
    pdf.setDrawColor(...primaryColor);
    pdf.setLineWidth(0.5);
    pdf.line(15, 40, 195, 40);

    let yPosition = 55;

    // Patient Info Section (placeholder)
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('PATIENT INFORMATION', 15, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...secondaryColor);
    pdf.text('Report ID: ' + Math.random().toString(36).substr(2, 9).toUpperCase(), 15, yPosition);
    pdf.text('Analysis Type: Chest X-Ray AI Screening', 15, yPosition + 5);
    
    yPosition += 20;

    // Analysis Summary Section
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('ANALYSIS SUMMARY', 15, yPosition);
    
    // Summary box
    const summaryColor = getSeverityColorRGB(predictionResult.severity);
    pdf.setFillColor(...summaryColor);
    pdf.setDrawColor(...summaryColor);
    pdf.roundedRect(15, yPosition + 5, 180, 25, 3, 3, 'F');
    
    // Summary text
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text(`Detected: ${predictionResult.disease}`, 20, yPosition + 15);
    pdf.setFontSize(12);
    pdf.text(`Confidence: ${predictionResult.confidence}% | Severity: ${predictionResult.severity.toUpperCase()}`, 20, yPosition + 23);
    
    yPosition += 40;

    // Helper function to add section
    const addSection = (title: string, items: string[], startY: number) => {
      let currentY = startY;
      
      // Check if we need a new page
      if (currentY > 250) {
        pdf.addPage();
        currentY = 20;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...primaryColor);
      pdf.text(title, 15, currentY);
      
      currentY += 8;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...secondaryColor);
      
      items.forEach((item, index) => {
        // Check if we need a new page
        if (currentY > 270) {
          pdf.addPage();
          currentY = 20;
        }
        
        const lines = pdf.splitTextToSize(`${index + 1}. ${item}`, 170);
        lines.forEach((line: string, lineIndex: number) => {
          if (lineIndex === 0) {
            // Add bullet point
            pdf.setFillColor(...primaryColor);
            pdf.circle(18, currentY - 2, 1, 'F');
          }
          pdf.text(line, lineIndex === 0 ? 25 : 25, currentY);
          currentY += 4;
        });
        currentY += 2;
      });
      
      return currentY + 5;
    };

    // Add all sections
    yPosition = addSection('RECOMMENDATIONS', predictionResult.recommendations, yPosition);
    yPosition = addSection('PRECAUTIONS', predictionResult.precautions, yPosition);
    yPosition = addSection('REMEDIES', predictionResult.remedies, yPosition);
    yPosition = addSection('TREATMENT PLAN', predictionResult.treatment, yPosition);

    // Add disclaimer box
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.setFillColor(255, 243, 205); // Light yellow background
    pdf.setDrawColor(243, 156, 18); // Orange border
    pdf.roundedRect(15, yPosition, 180, 35, 3, 3, 'FD');
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(184, 134, 11); // Dark yellow
    pdf.text('IMPORTANT DISCLAIMER', 20, yPosition + 8);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(120, 53, 15); // Darker text
    const disclaimerText = 'This AI analysis is for educational and screening purposes only. Results should not replace professional medical diagnosis. Always consult with qualified healthcare providers for proper medical evaluation and treatment decisions.';
    const disclaimerLines = pdf.splitTextToSize(disclaimerText, 170);
    disclaimerLines.forEach((line: string, index: number) => {
      pdf.text(line, 20, yPosition + 15 + (index * 4));
    });

    // Footer
    yPosition += 45;
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(128, 128, 128);
    pdf.text('Report generated by MediScan AI X-Ray Analysis System', 15, yPosition);
    pdf.text(`Generated on ${currentDate} at ${currentTime}`, 15, yPosition + 4);

    // Save the PDF
    const fileName = `MediScan_Analysis_Report_${predictionResult.disease.replace(/\s+/g, '_')}_${currentDate.replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);

    toast({
      title: "PDF Report Downloaded",
      description: "Professional analysis report has been saved to your device",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              AI X-Ray Analysis
            </h1>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your lung X-ray image for AI-powered analysis and disease prediction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Upload Section */}
          <Card className="animate-slide-up glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileImage className="mr-2 h-5 w-5 text-primary" />
                Upload X-Ray Image
              </CardTitle>
              <CardDescription>
                Select a clear chest X-ray image for analysis. Supported formats: JPG, PNG, JPEG.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enhanced File Upload Area */}
              <div
                className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-all duration-300 cursor-pointer group hover:shadow-medical-subtle"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="X-ray preview"
                        className="max-w-full max-h-64 mx-auto rounded-xl shadow-elevated"
                      />
                      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-lg p-1">
                        <CheckCircle className="h-4 w-4 text-healthy" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {selectedFile?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-20 h-20 bg-gradient-medical-subtle rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        Drop X-ray image here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Maximum file size: 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={simulateAnalysis}
                  disabled={!selectedFile || isAnalyzing}
                  className="flex-1 shadow-elevated hover:shadow-float transition-all duration-300"
                  variant="medical"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze X-Ray
                    </>
                  )}
                </Button>
                
                {(selectedFile || predictionResult) && (
                  <Button
                    onClick={resetAnalysis}
                    variant="outline"
                    disabled={isAnalyzing}
                    className="shadow-card hover:shadow-elevated transition-all duration-300"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>

              {/* Enhanced Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-3 p-4 bg-gradient-medical-subtle rounded-xl">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Analysis Progress</span>
                    <span className="text-primary">{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-3" />
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 animate-pulse" />
                    <span>AI processing your X-ray...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Results Section */}
          <Card className="animate-slide-up glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-accent" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                AI-powered prediction results and medical recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {predictionResult ? (
                <div className="space-y-6">
                  {/* Enhanced Prediction Result */}
                  <div className="text-center space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground">
                        {predictionResult.disease}
                      </h3>
                      <Badge 
                        className={`${getSeverityColor(predictionResult.severity)} text-sm px-4 py-1 shadow-card`}
                      >
                        {getSeverityIcon(predictionResult.severity)}
                        <span className="ml-1 capitalize font-medium">{predictionResult.severity}</span>
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 p-4 bg-gradient-medical-subtle rounded-xl">
                      <p className="text-sm text-muted-foreground font-medium">Confidence Score</p>
                      <div className="text-3xl font-bold text-primary">
                        {predictionResult.confidence}%
                      </div>
                      <Progress value={predictionResult.confidence} className="h-3" />
                    </div>
                  </div>

                  {/* Enhanced Recommendations */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-accent" />
                      Recommendations
                    </h4>
                    <ul className="space-y-3">
                      {predictionResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-3 text-sm p-3 bg-muted/50 rounded-lg">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      onClick={generateAnalysisReport}
                      variant="outline" 
                      size="sm" 
                      className="flex-1 shadow-card hover:shadow-elevated transition-all duration-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                    <Button variant="medical" size="sm" className="flex-1 shadow-elevated hover:shadow-float transition-all duration-300">
                      View Disease Info
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-medical-subtle rounded-2xl flex items-center justify-center">
                    <Brain className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      Ready for Analysis
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Upload an X-ray image to start AI-powered analysis and get instant results.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Important Notice */}
        <Card className="mt-8 animate-fade-in glass">
          <CardContent className="py-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Info className="h-6 w-6 text-warning" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Important Medical Disclaimer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This AI analysis is for educational and screening purposes only. Results should not replace professional medical diagnosis. 
                  Always consult with qualified healthcare providers for proper medical evaluation and treatment decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionPage;