
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlashcardProps } from './Flashcard';

interface CreateFlashcardFormProps {
  categories: string[];
  onAddFlashcard: (flashcard: Omit<FlashcardProps, 'id'>) => void;
  onAddCategory: (category: string) => void;
}

const CreateFlashcardForm: React.FC<CreateFlashcardFormProps> = ({ 
  categories, 
  onAddFlashcard,
  onAddCategory
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !answer.trim() || !category.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    onAddFlashcard({ question, answer, category });
    
    // Reset form
    setQuestion('');
    setAnswer('');
    
    toast({
      title: "Success!",
      description: "Your flashcard has been created",
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onAddCategory(newCategory.trim());
      setCategory(newCategory.trim());
      setNewCategory('');
      setShowNewCategoryInput(false);
    } else {
      toast({
        title: "Invalid category",
        description: "Category name must be unique and not empty",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Flashcard</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium mb-1">
              Question
            </label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here"
              className="min-h-24"
            />
          </div>
          
          <div>
            <label htmlFor="answer" className="block text-sm font-medium mb-1">
              Answer
            </label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer here"
              className="min-h-24"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Subject
            </label>
            
            {showNewCategoryInput ? (
              <div className="flex gap-2">
                <Input
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New subject name"
                />
                <Button type="button" onClick={handleAddCategory}>
                  Add
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewCategoryInput(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewCategoryInput(true)}
                >
                  New Subject
                </Button>
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full">
            Create Flashcard
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateFlashcardForm;

