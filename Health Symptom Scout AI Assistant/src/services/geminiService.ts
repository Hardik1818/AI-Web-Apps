
// Interface for our API response
export interface MedicalRecommendation {
  prediction: string;
  description: string;
  precautions: string[];
  medications: string[];
  workouts: string[];
  diet: string[];
}

// API key (note: it's better to store this in environment variables or a backend service)
const API_KEY = "AIzaSyAAtwf9TOwGp4sTLG6PoGpCzgc7easPbDE";

// Function to query the Gemini API
export async function analyzeSymptoms(symptoms: string): Promise<MedicalRecommendation> {
  try {
    console.log("Starting API call to Gemini with symptoms:", symptoms);
    
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Based on these symptoms: "${symptoms}", provide a medical analysis with the following structured output:
                  1. A likely prediction of the medical condition
                  2. A brief description of the condition
                  3. A list of precautions to take
                  4. A list of potential medications that might help
                  5. Recommendations for workouts or physical activities
                  6. Dietary recommendations
                  
                  Format your response as a JSON object with the following structure:
                  {
                    "prediction": "Name of condition",
                    "description": "Brief description",
                    "precautions": ["precaution1", "precaution2", "precaution3", "precaution4"],
                    "medications": ["medication1", "medication2", "medication3", "medication4"],
                    "workouts": ["workout1", "workout2", "workout3", "workout4"],
                    "diet": ["diet1", "diet2", "diet3", "diet4"]
                  }
                  
                  Always include exactly 4 items in each array. Add a disclaimer that this is not professional medical advice.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    console.log("API response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error details:", errorData);
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response data:", data);
    
    // Extract the text response
    const textResponse = data.candidates[0].content.parts[0].text;
    console.log("Text response from API:", textResponse);
    
    // Find and extract the JSON part from the text
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from API response");
    }
    
    const recommendation = JSON.parse(jsonMatch[0]) as MedicalRecommendation;
    console.log("Parsed recommendation:", recommendation);
    
    return recommendation;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw error;
  }
}
