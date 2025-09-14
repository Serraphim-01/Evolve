import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LineChartComponent } from './LineChart';
import { TerminalLog } from './TerminalLog';
import './Hacker.css';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex-1 bg-black min-h-screen p-8 font-mono">
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="glitch" data-text={`Welcome back, ${user?.username}!`}>
                Welcome back, {user?.username}!
              </h1>
              <p className="text-hacker-green text-base">&gt; Ready to tackle some new challenges?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div id="terminal-log-container" className="bg-black rounded-xl p-6 border border-hacker-green">
                    <h2 className="text-lg font-semibold text-hacker-green mb-4">
                        System Log
                    </h2>
                    <TerminalLog />
                </div>
                <LineChartComponent />
            </div>

            <div className="space-y-8">
              {/* Challenge sections have been moved to the Challenges page */}
            </div>
        </div>
    </div>
  );
};
