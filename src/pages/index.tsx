
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FlashcardGrid from '@/components/FlashcardGrid';
import CategoryFilter from '@/components/CategoryFilter';
import CreateFlashcardForm from '@/components/CreateFlashcardForm';
import SearchBar from '@/components/SearchBar';
import { FlashcardProps } from '@/components/Flashcard';
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from 'lucide-react';

const INITIAL_FLASHCARDS: FlashcardProps[] = [
  {
    id: '1',
    question: "What is Ohm's Law?",
    answer: "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points. Mathematically: V = IR, where V is voltage, I is current, and R is resistance.",
    category: "Electrical Engineering"
  },
  {
    id: '2',
    question: "What is the First Law of Thermodynamics?",
    answer: "The First Law of Thermodynamics states that energy cannot be created or destroyed, only transferred or converted from one form to another. It's also known as the Law of Conservation of Energy.",
    category: "Mechanical Engineering"
  },
  {
    id: '3',
    question: "What is a SQL JOIN?",
    answer: "A SQL JOIN clause is used to combine rows from two or more tables based on a related column. Common types include INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.",
    category: "Computer Engineering"
  },
  {
    id: '4',
    question: "What is the difference between stress and strain?",
    answer: "Stress is the internal resistance force per unit area (force/area), while strain is the measure of deformation represented as the ratio of the change in dimension to the original dimension (dimensionless).",
    category: "Civil Engineering"
  },
  {
    id: '5',
    question: "What is the purpose of a semiconductor in electronics?",
    answer: "Semiconductors have electrical conductivity between conductors and insulators. They form the foundation for modern electronics by allowing controlled electrical current flow, making devices like transistors, diodes, and integrated circuits possible.",
    category: "Electrical Engineering"
  },
  {
    id: '6',
    question: "Define 'Big O Notation' in computer science.",
    answer: "Big O Notation is used to describe the performance or complexity of an algorithm, particularly its worst-case scenario. It expresses how runtime or space requirements grow as input size increases.",
    category: "Computer Engineering"
  },
  {
    id: '7',
    question: "What is the Chain Rule in calculus?",
    answer: "The Chain Rule is a formula for computing the derivative of a composite function. If f(x) = g(h(x)), then f'(x) = g'(h(x)) · h'(x).",
    category: "Calculus"
  },
  {
    id: '8',
    question: "What is an eigenvalue in linear algebra?",
    answer: "An eigenvalue is a scalar that represents how a linear transformation scales a corresponding eigenvector. If Av = λv, then λ is the eigenvalue and v is the eigenvector.",
    category: "Linear Algebra"
  },
  {
    id: '9',
    question: "What is a homogeneous differential equation?",
    answer: "A homogeneous differential equation is one in which all terms contain the dependent variable or its derivatives, and each term has the same degree with respect to the dependent variable and its derivatives.",
    category: "Differential Equations"
  },
  {
    id: '10',
    question: "What is a confidence interval in statistics?",
    answer: "A confidence interval is a range of values that is likely to contain an unknown population parameter with a certain level of confidence, typically 95% or 99%.",
    category: "Statistics"
  },
  {
    id: '11',
    question: "What is a list comprehension in Python?",
    answer: "A list comprehension is a concise way to create lists in Python. It has the form [expression for item in iterable if condition]. Example: [x**2 for x in range(10) if x % 2 == 0].",
    category: "Python"
  },
  {
    id: '12',
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to its own scope, the outer function's variables, and global variables, even after the outer function has returned.",
    category: "JavaScript"
  },
  {
    id: '13',
    question: "What is the difference between an interface and an abstract class in Java?",
    answer: "An interface contains only abstract methods and constants, while an abstract class can have abstract methods, concrete methods, instance variables, and constructors. A class can implement multiple interfaces but extend only one abstract class.",
    category: "Java"
  },
  {
    id: '14',
    question: "What is a pointer in C?",
    answer: "A pointer is a variable that stores the memory address of another variable. Pointers are declared using the * operator. Example: int *p; // p is a pointer to an integer",
    category: "C"
  },
  {
    id: '15',
    question: "What is function overloading in C++?",
    answer: "Function overloading allows multiple functions with the same name but different parameters (number, type, or order). The compiler determines which function to call based on the arguments provided.",
    category: "C++"
  }
];

const INITIAL_CATEGORIES = [
  "Electrical Engineering",
  "Mechanical Engineering",
  "Computer Engineering",
  "Civil Engineering",
  "Engineering Mathematics",
  "Calculus",
  "Linear Algebra",
  "Differential Equations",
  "Statistics",
  "Python",
  "JavaScript",
  "Java",
  "C",
  "C++"
];

const Index = () => {
  const [flashcards, setFlashcards] = useState<FlashcardProps[]>(() => {
    const saved = localStorage.getItem('flashcards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });
  
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);
  
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  
  const handleAddFlashcard = (newFlashcard: Omit<FlashcardProps, 'id'>) => {
    const flashcard = {
      ...newFlashcard,
      id: Date.now().toString()
    };
    setFlashcards(prev => [...prev, flashcard]);
  };
  
  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };
  
  const filteredFlashcards = flashcards.filter(card => {
    const matchesCategory = selectedCategory ? card.category === selectedCategory : true;
    
    if (!searchTerm.trim()) {
      return matchesCategory;
    }
    
    const search = searchTerm.trim().toLowerCase();
    const questionMatch = card.question.toLowerCase().includes(search);
    const answerMatch = card.answer.toLowerCase().includes(search);
    const categoryMatch = card.category.toLowerCase().includes(search);
    
    return matchesCategory && (questionMatch || answerMatch || categoryMatch);
  });

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Engineering Flashcards</h1>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center"
          >
            {showForm ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Close Form
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Flashcard
              </>
            )}
          </Button>
        </div>
        
        {showForm && (
          <div className="mb-8">
            <CreateFlashcardForm 
              categories={categories}
              onAddFlashcard={handleAddFlashcard}
              onAddCategory={handleAddCategory}
            />
          </div>
        )}
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
            {searchTerm && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSearch}
                className="self-start md:self-auto"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Search
              </Button>
            )}
          </div>
          
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {filteredFlashcards.length > 0 ? (
            <FlashcardGrid flashcards={filteredFlashcards} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No flashcards found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? "Try a different search term or category" 
                  : "Create your first flashcard to get started!"}
              </p>
            </div>
          )}
          
          {searchTerm && (
            <div className="text-sm text-muted-foreground text-center mt-4">
              Found {filteredFlashcards.length} {filteredFlashcards.length === 1 ? 'flashcard' : 'flashcards'} matching "{searchTerm}"
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;

