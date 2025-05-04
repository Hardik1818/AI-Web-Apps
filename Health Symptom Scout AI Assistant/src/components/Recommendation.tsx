
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pill, Activity, Utensils, ShieldCheck } from 'lucide-react';

interface RecommendationProps {
  prediction?: string;
  description?: string;
  precautions?: string[];
  medications?: string[];
  workouts?: string[];
  diet?: string[];
}

const Recommendation = ({
  prediction,
  description,
  precautions = [],
  medications = [],
  workouts = [],
  diet = [],
}: RecommendationProps) => {
  if (!prediction) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in">
      <div className="text-center space-y-2">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Predicted Condition
        </Badge>
        <h2 className="text-3xl font-bold text-gray-900">{prediction}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Precautions</h3>
          </div>
          <ul className="space-y-2">
            {precautions.map((precaution, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-gray-600">{precaution}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Pill className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Medications</h3>
          </div>
          <ul className="space-y-2">
            {medications.map((medication, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-gray-600">{medication}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Recommended Workouts</h3>
          </div>
          <ul className="space-y-2">
            {workouts.map((workout, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-gray-600">{workout}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Utensils className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Dietary Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {diet.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Recommendation;
