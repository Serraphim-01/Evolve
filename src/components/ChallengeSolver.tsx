import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { missions } from '../data/missions';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';
import { Play } from 'lucide-react';

export const ChallengeSolver = () => {
  const { id } = useParams<{ id: string }>();
  const mission = missions.find((m) => m.id === parseInt(id || ''));

  const [code, setCode] = useState('');
  const [testResult, setTestResult] = useState('');

  useEffect(() => {
    if (mission) {
      const instructions = `/*\n${mission.title}\n\n${mission.description}\n*/\n\n// Your code here`;
      setCode(instructions);
    }
  }, [mission]);

  if (!mission) {
    return <div>Challenge not found!</div>;
  }

  const handleTestSubmit = () => {
    setTestResult('Running tests...');
    setTimeout(() => {
      const isCorrect = Math.random() > 0.5;
      if (isCorrect) {
        setTestResult(`Tests passed! You earned ${mission.exp} EXP.`);
      } else {
        setTestResult('Tests failed. Please try again.');
      }
    }, 2000);
  };

  return (
    <div className="challenge-solver matrix-bg">
      <div className="solver-header">
        <h1>{mission.title}</h1>
        <button onClick={handleTestSubmit} className="run-button">
          <Play />
          Run
        </button>
      </div>
      <div className="solver-layout">
        <div className="solution-area">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js, 'js')}
            padding={10}
            className="code-editor"
          />
        </div>
        <div className="testing-area">
          <h2>Test Scenarios</h2>
          <ul>
            {mission.testCases.map((tc, index) => (
              <li key={index}>
                <strong>Input:</strong> {tc.input} | <strong>Expected Output:</strong> {tc.expectedOutput}
              </li>
            ))}
          </ul>
          <h2>Test Results</h2>
          <pre>{testResult}</pre>
        </div>
      </div>
    </div>
  );
};
