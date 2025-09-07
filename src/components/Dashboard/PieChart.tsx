import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'JavaScript', value: 400 },
  { name: 'Python', value: 300 },
  { name: 'Java', value: 300 },
  { name: 'C++', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const PieChartComponent = () => {
  return (
    <div className="bg-black p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4">Missions by Language</h3>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff'
                    }}
                />
                <Legend wrapperStyle={{ color: '#ffffff' }} />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};
