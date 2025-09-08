import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

const chartTypes = ['Bar', 'Area', 'Radar'];

const ChartComponent = ({ type }: { type: string }) => {
    switch (type) {
        case 'Bar':
            return (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="subject" stroke="#00ff00" />
                    <YAxis stroke="#00ff00" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 20, 0, 0.9)', borderColor: '#00ff00', color: '#0f0' }} />
                    <Legend wrapperStyle={{ color: '#00ff00' }} />
                    <Bar dataKey="A" fill="#ff00c1" />
                    <Bar dataKey="B" fill="#00fff9" />
                </BarChart>
            );
        case 'Area':
            return (
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="subject" stroke="#00ff00" />
                    <YAxis stroke="#00ff00" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 20, 0, 0.9)', borderColor: '#00ff00', color: '#0f0' }} />
                    <Legend wrapperStyle={{ color: '#00ff00' }} />
                    <Area type="monotone" dataKey="A" stackId="1" stroke="#ff00c1" fill="#ff00c1" />
                    <Area type="monotone" dataKey="B" stackId="1" stroke="#00fff9" fill="#00fff9" />
                </AreaChart>
            );
        case 'Radar':
            return (
                <RadarChart outerRadius={90} width={730} height={250} data={data}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" stroke="#00ff00" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#00ff00" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 20, 0, 0.9)', borderColor: '#00ff00', color: '#0f0' }} />
                    <Legend wrapperStyle={{ color: '#00ff00' }} />
                    <Radar name="Mike" dataKey="A" stroke="#ff00c1" fill="#ff00c1" fillOpacity={0.6} />
                    <Radar name="Lily" dataKey="B" stroke="#00fff9" fill="#00fff9" fillOpacity={0.6} />
                </RadarChart>
            );
        default:
            return null;
    }
};

export const MultiChart = () => {
  const [chartType, setChartType] = useState('Bar');

  return (
    <div className="bg-black p-6 rounded-xl border border-hacker-green h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-hacker-green">Data Visualization</h3>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-black border border-hacker-green text-hacker-green rounded px-2 py-1"
        >
          {chartTypes.map(type => (
            <option key={type} value={type}>{type} Chart</option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent type={chartType} />
      </ResponsiveContainer>
    </div>
  );
};
