import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { missions } from '../data/missions';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

export const ChallengeSolver = () => {
  const { id } = useParams<{ id: string }>();
  const mission = missions.find((m) => m.id === parseInt(id || ''));

  const [code, setCode] = useState('');
  const [testResult, setTestResult] = useState('');

  useEffect(() => {
    if (mission) {
      const instructions = `/*\n${mission.title}\n\n${mission.description}\n*/`;
      setCode(instructions);
    }
  }, [mission]);

  if (!mission) {
    return <div>Challenge not found!</div>;
  }

  const handleTestSubmit = () => {
    setTestResult('Running tests...');
    // Simulate test execution
    setTimeout(() => {
      const isCorrect = Math.random() > 0.5; // Randomly pass or fail
      if (isCorrect) {
        setTestResult(`Tests passed! You earned ${mission.exp} EXP.`);
      } else {
        setTestResult('Tests failed. Please try again.');
      }
    }, 2000);
  };

  return (
    <div className="challenge-solver matrix-bg">
      <div className="solver-layout">
        <div className="solution-area">
          <h2>Solution</h2>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js, 'js')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              border: '1px solid #00FF00',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
            }}
          />
          <button onClick={handleTestSubmit}>Submit for Testing</button>
        </div>
        <div className="testing-area">
          <h2>Test Results</h2>
          <pre>{testResult}</pre>
        </div>
      </div>
    </div>
  );
};
