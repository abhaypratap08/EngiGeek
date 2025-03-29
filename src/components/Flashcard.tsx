
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

export interface FlashcardProps {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer, category }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="h-64 w-full cursor-pointer"
      onClick={handleFlip}
      style={{ perspective: "1000px" }}
    >
      <div 
        className={`relative h-full w-full transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card 
          className="absolute w-full h-full flex flex-col p-6 bg-card shadow-lg" 
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-sm text-primary font-semibold mb-2">{category}</div>
          <div className="flex-1 flex items-center justify-center overflow-auto p-2">
            <p className="text-xl font-medium text-center">{question}</p>
          </div>
          <div className="text-sm text-muted-foreground text-center mt-4">Click to flip</div>
        </Card>
        
        <Card 
          className="absolute w-full h-full flex flex-col p-6 bg-card shadow-lg" 
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="text-sm text-primary font-semibold mb-2">{category}</div>
          <div className="flex-1 flex items-center justify-center overflow-auto p-2">
            <p className="text-lg">{answer}</p>
          </div>
          <div className="text-sm text-muted-foreground text-center mt-4">Click to flip back</div>
        </Card>
      </div>
    </div>
  );
};

export default Flashcard;
