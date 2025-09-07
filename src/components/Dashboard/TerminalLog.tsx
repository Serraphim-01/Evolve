import React, { useState, useEffect } from 'react';

const initialLogLines = [
  { timestamp: '2024-07-20 10:30:01', level: 'INFO', message: 'System boot sequence initiated...' },
  { timestamp: '2024-07-20 10:30:02', level: 'INFO', message: 'Loading kernel modules...' },
  { timestamp: '2024-07-20 10:30:03', level: 'INFO', message: 'Mounting file systems...' },
  { timestamp: '2024-07-20 10:30:04', level: 'WARN', message: 'Deprecated package found: legacy-auth@1.2.3' },
  { timestamp: '2024-07-20 10:30:05', level: 'INFO', message: 'Initializing network interfaces...' },
  { timestamp: '2024-07-20 10:30:06', level: 'INFO', message: 'Firewall status: ACTIVE' },
  { timestamp: '2024-07-20 10:30:07', level: 'ERROR', message: 'Failed to connect to external server: api.example.com' },
  { timestamp: '2024-07-20 10:30:08', level: 'INFO', message: 'Retrying connection in 5s...' },
];

const newLogLines = [
    { level: 'INFO', message: 'User session validated.' },
    { level: 'INFO', message: 'Accessing secure data...' },
    { level: 'WARN', message: 'High memory usage detected.' },
    { level: 'INFO', message: 'Scanning for vulnerabilities...' },
    { level: 'ERROR', message: 'Intrusion attempt detected from IP: 192.168.1.101' },
    { level: 'INFO', message: 'Blocking suspicious IP...' },
    { level: 'INFO', message: 'System returning to normal operation.' },
];

export const TerminalLog = () => {
  const [logLines, setLogLines] = useState(initialLogLines);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogLines(prevLines => {
        const nextLine = newLogLines[Math.floor(Math.random() * newLogLines.length)];
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
        return [...prevLines, { ...nextLine, timestamp }];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-log">
      {logLines.map((line, index) => (
        <div key={index} className="terminal-log-line">
          <span className="timestamp">{line.timestamp}</span>
          <span className={`level-${line.level.toLowerCase()}`}> [{line.level}] </span>
          <span>{line.message}</span>
        </div>
      ))}
    </div>
  );
};
