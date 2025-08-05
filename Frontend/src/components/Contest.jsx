import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Trophy, Code, Send, ChevronDown, Play, RotateCcw } from 'lucide-react';
import Navbar from './Navbar';
import ProblemStatement from './Problem';
import CodeEditor from './Code';

const ContestPage = () => {
  const [code, setCode] = useState('// Write your solution here\nfunction solution() {\n    \n}');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user and contest data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  };

  const contest = {
    name: "DSA Challenge 2025",
    question: {
      title: "Two Sum Problem",
      difficulty: "Medium",
      statement: "Given an array of integers and a target value, find two numbers in the array that add up to the target. Return their indices.",
      inputFormat: "First line: array of integers\nSecond line: target integer",
      outputFormat: "Two indices of the numbers that sum to target",
      sampleInput: "[2, 7, 11, 15]\n9",
      sampleOutput: "[0, 1]"
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Code submitted successfully!');
  };

  const handleLogout = () => {
    // Handle logout logic
    alert('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
          <ProblemStatement contest={contest} />
          <CodeEditor 
            code={code} 
            setCode={setCode} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>
    </div>
  );
};

export default ContestPage;