
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SymptomInput from '@/components/SymptomInput';
import { Card } from '@/components/ui/card';
import { Brain, Clock, HeartPulse, Loader2, ShieldCheck, Pill, Activity, Utensils } from 'lucide-react';
import { analyzeSymptoms, MedicalRecommendation } from '@/services/geminiService';
import { toast } from '@/components/ui/use-toast';

const features = [
  {
    icon: <Brain className="w-12 h-12 text-primary" />,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze your symptoms for accurate insights"
  },
  {
    icon: <Clock className="w-12 h-12 text-primary" />,
    title: "Quick Results",
    description: "Get instant preliminary medical insights and recommendations"
  },
  {
    icon: <HeartPulse className="w-12 h-12 text-primary" />,
    title: "Professional Support",
    description: "Guidance on when to seek professional medical attention"
  }
];

const Index = () => {
  const [recommendation, setRecommendation] = useState<MedicalRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomSubmit = async (symptoms: string) => {
    setIsAnalyzing(true);
    setRecommendation(null);
    
    try {
      const result = await analyzeSymptoms(symptoms);
      setRecommendation(result);
      toast({
        title: "Analysis Complete",
        description: "Your symptoms have been analyzed",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to analyze symptoms:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze your symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-primary/10 p-2">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop&q=80"
                alt="AI Medical Assistant"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              AI Medical Assistant
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your symptoms to receive personalized medical recommendations
            </p>
          </div>

          {/* Symptom Input and Immediate Feedback Section */}
          <div className="max-w-3xl mx-auto space-y-4">
            <SymptomInput onSubmit={handleSymptomSubmit} isLoading={isAnalyzing} />
            
            {/* Loading State */}
            {isAnalyzing && (
              <div className="text-center py-4 animate-in fade-in">
                <div className="inline-flex items-center justify-center space-x-3 px-6 py-3 bg-card rounded-full">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="font-medium">Analyzing symptoms...</span>
                </div>
              </div>
            )}
            
            {/* Improved Recommendations Display */}
            {!isAnalyzing && recommendation && (
              <div className="animate-in fade-in space-y-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary/10 rounded-full">
                    <span className="font-medium">Predicted Condition:</span>
                    <span className="text-primary font-semibold">{recommendation.prediction}</span>
                  </div>
                </div>
                
                {/* Description Card */}
                <Card className="bg-card border-primary/20 p-6 rounded-2xl shadow-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    {recommendation.description || "No description available."}
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground italic">
                    This is an AI-generated analysis, not professional medical advice. Always consult a healthcare professional.
                  </div>
                </Card>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Precautions */}
                  <Card className="bg-card border-primary/10 rounded-2xl p-6 hover:bg-accent/5 transition-colors duration-200">
                    <h3 className="font-semibold flex items-center space-x-2 mb-4 text-foreground">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span>Precautions</span>
                    </h3>
                    <ul className="space-y-3">
                      {recommendation.precautions.map((item: string, index: number) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-start space-x-3">
                          <span className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Medications */}
                  <Card className="bg-card border-primary/10 rounded-2xl p-6 hover:bg-accent/5 transition-colors duration-200">
                    <h3 className="font-semibold flex items-center space-x-2 mb-4 text-foreground">
                      <Pill className="w-5 h-5 text-primary" />
                      <span>Medications</span>
                    </h3>
                    <ul className="space-y-3">
                      {recommendation.medications.map((item: string, index: number) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-start space-x-3">
                          <span className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Workouts */}
                  <Card className="bg-card border-primary/10 rounded-2xl p-6 hover:bg-accent/5 transition-colors duration-200">
                    <h3 className="font-semibold flex items-center space-x-2 mb-4 text-foreground">
                      <Activity className="w-5 h-5 text-primary" />
                      <span>Recommended Workouts</span>
                    </h3>
                    <ul className="space-y-3">
                      {recommendation.workouts.map((item: string, index: number) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-start space-x-3">
                          <span className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Diet */}
                  <Card className="bg-card border-primary/10 rounded-2xl p-6 hover:bg-accent/5 transition-colors duration-200">
                    <h3 className="font-semibold flex items-center space-x-2 mb-4 text-foreground">
                      <Utensils className="w-5 h-5 text-primary" />
                      <span>Dietary Recommendations</span>
                    </h3>
                    <ul className="space-y-3">
                      {recommendation.diet.map((item: string, index: number) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-start space-x-3">
                          <span className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card border-border p-8 rounded-2xl text-center hover:bg-accent transition-colors duration-300"
              >
                <div className="space-y-4">
                  <div className="mx-auto w-fit p-4 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
