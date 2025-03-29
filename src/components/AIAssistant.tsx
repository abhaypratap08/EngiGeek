
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendHorizonal, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { FlashcardProps } from './Flashcard';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  onGenerateFlashcard: (flashcard: Omit<FlashcardProps, 'id'>) => void;
  categories: string[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onGenerateFlashcard, categories }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi! I can help you generate engineering flashcards or answer your engineering questions. What would you like to know?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const simulateAIResponse = (question: string): Promise<string> => {
    // This is a mock function - in a real app, this would call an AI API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate different types of responses based on the question
        if (question.toLowerCase().includes('generate') && question.toLowerCase().includes('flashcard')) {
          resolve("I've created a flashcard about circuit analysis basics. You'll find it in your flashcard collection.");
        } else if (question.toLowerCase().includes('ohm')) {
          resolve("Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points. Mathematically: V = IR, where V is voltage, I is current, and R is resistance.");
        } else if (question.toLowerCase().includes('fourier')) {
          resolve("The Fourier Transform is a mathematical transform that decomposes a function (often a signal) into its constituent frequencies. It's widely used in signal processing to convert time-domain signals to the frequency domain.");
        } else {
          resolve("That's an interesting engineering question. In a full implementation, I'd connect to a large language model to provide you with a comprehensive answer. For now, I'm simulating responses.");
        }
      }, 1000);
    });
  };

  const simulateFlashcardGeneration = (question: string): Promise<Omit<FlashcardProps, 'id'>> => {
    // This is a mock function - in a real app, this would use AI to generate flashcards
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a relevant sample flashcard
        if (question.toLowerCase().includes('circuit')) {
          resolve({
            question: "What is Kirchhoff's Current Law (KCL)?",
            answer: "Kirchhoff's Current Law states that the sum of all currents entering a node equals the sum of all currents leaving the node. Mathematically: ∑Iin = ∑Iout.",
            category: "Electrical Engineering"
          });
        } else if (question.toLowerCase().includes('mechanics')) {
          resolve({
            question: "What is Newton's Second Law of Motion?",
            answer: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Mathematically: F = ma.",
            category: "Mechanical Engineering"
          });
        } else {
          resolve({
            question: "What is the difference between RAM and ROM?",
            answer: "RAM (Random Access Memory) is volatile memory used for temporary data storage during program execution. ROM (Read-Only Memory) is non-volatile memory containing permanent data that cannot be modified during normal operation.",
            category: "Computer Engineering"
          });
        }
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setIsLoading(true);
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      // Get AI response
      const response = await simulateAIResponse(userMessage);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // If the user asked to generate a flashcard, do that
      if (userMessage.toLowerCase().includes('generate') && userMessage.toLowerCase().includes('flashcard')) {
        const flashcard = await simulateFlashcardGeneration(userMessage);
        onGenerateFlashcard(flashcard);
        
        toast({
          title: "New flashcard created!",
          description: "Check your flashcard collection to see it",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or request a flashcard..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()} 
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizonal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
