import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Trophy, Code, Send, ChevronDown, Play, RotateCcw } from 'lucide-react';

 const ProblemStatement = ({ contest}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{contest?.name}</h1>
        </div>
      </div>

      <div className="p-6 overflow-y-auto h-full">
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-xl font-semibold text-white">{contest?.question.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                contest?.question.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                contest?.question.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {contest?.question.difficulty}
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {contest?.question.statement}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-4 border border-white/10">
              <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Input Format
              </h3>
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">{contest?.question.inputFormat}</pre>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/10">
              <h3 className="text-blue-400 font-semibold mb-2 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Output Format
              </h3>
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">{contest?.question.outputFormat}</pre>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-500/20">
            <h3 className="text-indigo-400 font-semibold mb-3">Sample Test Case</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Input:</div>
                <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-gray-200">
                  {contest?.question.sampleInput}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Output:</div>
                <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-gray-200">
                  {contest?.question.sampleOutput}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProblemStatement;