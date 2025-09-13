import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

export const LineChartComponent = () => {
  return (
    <div className="bg-black p-6 rounded-xl border border-hacker-green h-full">
        <h3 className="text-lg font-semibold text-hacker-green mb-4">XP Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#00ff00" />
                <YAxis stroke="#00ff00" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(0, 20, 0, 0.9)',
                        borderColor: '#00ff00',
                        color: '#0f0'
                    }}
                    />
                <Legend wrapperStyle={{ color: '#00ff00' }} />
                <Line type="monotone" dataKey="pv" stroke="#ff00c1" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#00fff9" />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};
