import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { Play, Check } from 'lucide-react';

// Mock mission data
const mockMission = {
  id: '1',
  title: 'Binary Tree Traversal',
  description: 'Implement pre-order, in-order, and post-order traversal algorithms for binary trees.',
  language: 'javascript',
  xpReward: 150,
  template: `function solve(tree) {
  // Your code here
  return {
    preOrder: [],
    inOrder: [],
    postOrder: []
  };
}`
};

const BlinkingCursor = () => <span className="animate-ping inline-block w-2 h-4 bg-hacker-green ml-1"></span>;

export const MissionSolver = () => {
  const { id } = useParams<{ id: string }>();
  const [code, setCode] = useState(mockMission.template);
  const [output, setOutput] = useState('');

  const challengeText = `Challenge: ${mockMission.description}`;
  const typedChallenge = useTypingEffect(challengeText, 50);

  const handleRunCode = () => {
    try {
      const result = eval(`
        (function() {
          ${code}
          const tree = { value: 1, left: { value: 2, left: null, right: null }, right: { value: 3, left: null, right: null } };
          return solve(tree);
        })()
      `);
      setOutput(JSON.stringify(result, null, 2));
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleSubmit = () => {
    alert('Submitting solution...');
  };

  return (
    <div className="flex-1 bg-black min-h-screen p-8 text-white font-mono">
      <div className="bg-black border border-hacker-green rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-900 flex justify-between items-center border-b border-hacker-green">
          <div className="text-hacker-green">
            <p>&gt; {mockMission.title}</p>
          </div>
          <div className="flex space-x-4">
            <button onClick={handleRunCode} className="text-white hover:text-hacker-green" title="Run Code">
              <Play className="h-5 w-5" />
            </button>
            <button onClick={handleSubmit} className="text-white hover:text-hacker-green" title="Submit Solution">
              <Check className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
            <p className="text-hacker-green whitespace-pre-wrap">
                {typedChallenge}
                {typedChallenge.length === challengeText.length ? '' : <BlinkingCursor />}
            </p>
        </div>

        <div className="relative">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js, 'javascript')}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: '#011627',
              minHeight: 'calc(100vh - 450px)',
            }}
          />
        </div>

        <div className="p-4 border-t border-hacker-green bg-gray-900">
          <h3 className="text-hacker-green font-semibold mb-2">&gt; Output</h3>
          <pre className="bg-black p-4 rounded-md overflow-x-auto text-sm h-32">
            {output ? `> ${output}` : '> Waiting for output...'}
          </pre>
        </div>
      </div>
    </div>
  );
};
