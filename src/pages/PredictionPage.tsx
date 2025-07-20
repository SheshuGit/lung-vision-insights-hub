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
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionResult {
  disease: string;
  confidence: number;
  severity: 'healthy' | 'warning' | 'critical';
  recommendations: string[];
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

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI X-Ray Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your lung X-ray image for AI-powered analysis and disease prediction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileImage className="mr-2 h-5 w-5" />
                Upload X-Ray Image
              </CardTitle>
              <CardDescription>
                Select a clear chest X-ray image for analysis. Supported formats: JPG, PNG, JPEG.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
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
                    <img
                      src={previewUrl}
                      alt="X-ray preview"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-card"
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedFile?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
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

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={simulateAnalysis}
                  disabled={!selectedFile || isAnalyzing}
                  className="flex-1"
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
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analysis Progress</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                AI-powered prediction results and medical recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {predictionResult ? (
                <div className="space-y-6">
                  {/* Prediction Result */}
                  <div className="text-center space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">
                        {predictionResult.disease}
                      </h3>
                      <Badge 
                        className={`${getSeverityColor(predictionResult.severity)} text-sm px-3 py-1`}
                      >
                        {getSeverityIcon(predictionResult.severity)}
                        <span className="ml-1 capitalize">{predictionResult.severity}</span>
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Confidence Score</p>
                      <div className="text-3xl font-bold text-primary">
                        {predictionResult.confidence}%
                      </div>
                      <Progress value={predictionResult.confidence} className="h-2" />
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Recommendations</h4>
                    <ul className="space-y-2">
                      {predictionResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                    <Button variant="medical" size="sm" className="flex-1">
                      View Disease Info
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Ready for Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Upload an X-ray image to start AI-powered analysis and get instant results.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="mt-8 animate-fade-in">
          <CardContent className="py-6">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Important Medical Disclaimer</h4>
                <p className="text-sm text-muted-foreground">
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