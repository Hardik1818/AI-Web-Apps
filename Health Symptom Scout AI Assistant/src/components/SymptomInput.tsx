
import { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface SymptomInputProps {
  onSubmit: (symptoms: string) => void;
  isLoading?: boolean;
}

const SymptomInput = ({ onSubmit, isLoading = false }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsRecording(true);
        toast({
          title: "Voice Recognition Started",
          description: "Speak clearly into your microphone",
          variant: "default",
        });
      };

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setSymptoms(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        });
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim() && !isLoading) {
      onSubmit(symptoms);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition) {
      toast({
        title: "Voice Recognition Unavailable",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        toast({
          title: "Failed to Start",
          description: "Please try again",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground px-1 mb-1">
          Describe your symptoms in detail (e.g., "I have a headache, fever, and sore throat for the past 2 days")
        </p>
        <div className="relative flex items-center">
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter your symptoms..."
            className="w-full px-6 py-4 rounded-full bg-[#131B2C] border border-[#1F2937] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pr-24"
            disabled={isLoading || isRecording}
          />
          <div className="absolute right-2 flex space-x-2">
            <button
              type="button"
              className={`p-2 transition-colors ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-primary'}`}
              aria-label="Voice input"
              onClick={toggleVoiceInput}
              disabled={isLoading}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="p-2 text-gray-400 hover:text-primary transition-colors"
              aria-label="Search"
              disabled={isLoading || isRecording || !symptoms.trim()}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-primary rounded-full" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {isRecording && (
          <div className="mt-2 text-xs text-center text-primary animate-pulse">
            Listening... Speak clearly into your microphone
          </div>
        )}
      </div>
    </form>
  );
};

export default SymptomInput;
