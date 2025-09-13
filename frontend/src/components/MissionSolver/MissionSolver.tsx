import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // Using prism-tomorrow theme

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

export const MissionSolver = () => {
  const { id } = useParams<{ id: string }>();
  const [code, setCode] = useState(mockMission.template);
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    // This is where you would typically send the code to a secure execution environment.
    // For this example, we'll just mock a successful run.
    try {
      // NOTE: Using eval is insecure. This is for demonstration purposes only.
      // In a real application, this should be a call to a secure backend service.
      const result = eval(`
        (function() {
          ${code}
          // Mock tree data
          const tree = {
            value: 1,
            left: { value: 2, left: null, right: null },
            right: { value: 3, left: null, right: null }
          };
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
    // Here you would compare the output with the expected solution
  };

  return (
    <div className="flex-1 bg-black min-h-screen p-8 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Mission details */}
        <div>
          <h1 className="text-3xl font-bold text-hacker-green mb-2">{mockMission.title}</h1>
          <p className="text-lg mb-4">{mockMission.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm">Language: {mockMission.language}</span>
            <span className="text-sm">XP: {mockMission.xpReward}</span>
          </div>

          <div className="bg-black border border-white rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Output</h3>
            <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">{output || 'Run your code to see the output here.'}</pre>
          </div>
        </div>

        {/* Right side: Code editor */}
        <div className="bg-black border border-white rounded-lg">
          <div className="p-4 border-b border-white">
            <h2 className="text-xl font-semibold">Solution</h2>
          </div>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js, 'javascript')}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: '#011627', // A dark background color
              minHeight: '400px',
            }}
            className="rounded-b-lg"
          />
          <div className="p-4 border-t border-white flex justify-end space-x-4">
            <button
              onClick={handleRunCode}
              className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Run Code
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-hacker-green text-black rounded-lg font-medium hover:bg-opacity-80 transition-colors"
            >
              Submit Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
