
import React from 'react';
import Flashcard, { FlashcardProps } from './Flashcard';

interface FlashcardGridProps {
  flashcards: FlashcardProps[];
}

const FlashcardGrid: React.FC<FlashcardGridProps> = ({ flashcards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcards.map((card) => (
        <Flashcard
          key={card.id}
          id={card.id}
          question={card.question}
          answer={card.answer}
          category={card.category}
        />
      ))}
    </div>
  );
};

export default FlashcardGrid;

