import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Trophy, Code, Send, ChevronDown, Play, RotateCcw } from 'lucide-react';

const CodeEditor = ({ code, setCode, onSubmit, isSubmitting }) => {
  const textareaRef = useRef(null);

  // Handle tab key in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleRun = () => {
    // Handle run functionality
    console.log('Running code...');
  };

  const handleReset = () => {
    setCode('// Write your solution here\nfunction solution() {\n    \n}');
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col">
      <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Code Editor</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">JavaScript</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm font-mono">solution.js</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleReset}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button 
              onClick={handleRun}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
            >
              <Play className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Line Numbers and Code Area */}
        <div className="flex-1 flex">
          <div className="bg-black/30 px-3 py-4 border-r border-white/10 select-none">
            <div className="text-gray-500 text-sm font-mono leading-6 text-right">
              {code?.split('\n').map((_, index) => (
                <div key={index} className="h-6">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-full bg-transparent text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none leading-6"
              placeholder="// Write your solution here..."
              spellCheck={false}
              style={{
                lineHeight: '1.5rem',
                tabSize: 4
              }}
            />
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="border-t border-white/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Ready</span>
              </div>
              <div className="text-gray-400 text-sm">
                Lines: {code?.split('\n').length} | Characters: {code?.length}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleRun}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Run</span>
              </button>
              
              <button
                onClick={onSubmit}
                disabled={isSubmitting || !code?.trim()}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CodeEditor;