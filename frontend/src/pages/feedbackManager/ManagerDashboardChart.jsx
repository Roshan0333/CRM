// File: frontend/src/pages/feedbackManager/TinyBarChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

// Sample month-wise complaint data (increasing to match the image)
const data = [
  { month: 'Jan', complaints: 10 },
  { month: 'Feb', complaints: 20 },
  { month: 'Mar', complaints: 40 },
  { month: 'Apr', complaints: 60 },
  { month: 'May', complaints: 80 },
  { month: 'Jun', complaints: 100 },
];

const colors = [
  '#d8e3ea', // light
  '#5fc3f3',
  '#39a4e6',
  '#2b7fc6',
  '#253f66',
  '#1b2748', // darkest
];

const ManagerDashboardChart = () => {

  return (
    <div style={{ width: '100%', height: 400, padding: 8}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
            margin={{ top: 20, right: 64, left: 16, bottom: 10 }}
          barCategoryGap="8%"  // reduce gap so thick bars don't become too spaced
          barGap={4}
        >
      
          <XAxis
            dataKey="month"
          
            tick={false}
            tickLine={false}
          
            padding={{ left: 12, right: 12}}
             label={{
              value: 'Month',   
              position: 'insideBottom',
              offset: -10,
              style: { textAnchor: 'middle', fill: '#222', fontSize: 22 , fontWeight: 500},
            }}
          />
          <YAxis
          
            tick={false}
            tickLine={false}
            
            orientation="right"
            label={{
              value: 'Complaint',
              angle: +90,
              position: 'insideLeft',
              offset: 22,
              style: { textAnchor: 'middle', fill: '#222', fontSize: 22, fontWeight : 500 },
            }}
            domain={[0, 'dataMax + 10']}
          />
        
          <Bar
            dataKey="complaints"
            radius={[30, 30, 30, 30]} // pill-shaped bars
            barSize={85}
            minPointSize={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ManagerDashboardChart;