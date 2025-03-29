
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import { FlashcardProps } from '@/components/Flashcard';
import { useToast } from "@/hooks/use-toast";

const AIAssistantPage = () => {
  const { toast } = useToast();
  
  const handleGenerateFlashcard = (flashcard: Omit<FlashcardProps, 'id'>) => {
    // In a real implementation, this would add the flashcard to our state
    // For this demo, we'll just show a toast notification
    const savedFlashcards = localStorage.getItem('flashcards');
    const flashcards = savedFlashcards ? JSON.parse(savedFlashcards) : [];
    
    const newFlashcard = {
      ...flashcard,
      id: Date.now().toString()
    };
    
    const updatedFlashcards = [...flashcards, newFlashcard];
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
    
    // Also ensure the category exists
    const savedCategories = localStorage.getItem('categories');
    const categories = savedCategories ? JSON.parse(savedCategories) : [];
    
    if (!categories.includes(flashcard.category)) {
      const updatedCategories = [...categories, flashcard.category];
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
    
    toast({
      title: "Success!",
      description: "A new flashcard has been added to your collection",
    });
  };
  
  const getSavedCategories = () => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [
      "Electrical Engineering",
      "Mechanical Engineering",
      "Computer Engineering",
      "Civil Engineering"
    ];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Engineering Assistant</h1>
          <p className="text-muted-foreground mt-2">
            Ask questions about engineering concepts or request to generate flashcards on specific topics.
          </p>
        </div>
        
        <div className="h-[600px]">
          <AIAssistant 
            onGenerateFlashcard={handleGenerateFlashcard} 
            categories={getSavedCategories()}
          />
        </div>
      </main>
    </div>
  );
};

export default AIAssistantPage;
