
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">EngiGeek</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Flashcards
              </Button>
            </Link>
            <Link to="/ai-assistant">
              <Button variant="ghost" className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                AI Assistant
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

