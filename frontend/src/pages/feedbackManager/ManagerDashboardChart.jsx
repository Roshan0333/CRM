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

const ManagerDashboardChart = ({ chartData = {} }) => {

  const dynamicData = [
    { label: 'Total', value: chartData?.totalComplaints || 0 },
    { label: 'Unsolved', value: chartData?.unsolvedComplaints || 0 },
    { label: 'Feedback', value: chartData?.totalFeedbacks || 0 },
    { label: 'Pending', value: chartData?.remainingFeedbacks || 0 },
    { label: 'Team', value: chartData?.totalTeam || 0 },
  ];

const colors = [
  '#d8e3ea', 
  '#5fc3f3',
  '#39a4e6',
  '#2b7fc6',
  '#253f66',
  '#1b2748', 
];


  return (
    <div style={{ width: '100%', height: 400, padding: 8}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dynamicData}
            margin={{ top: 20, right: 64, left: 16, bottom: 20 }}
          barCategoryGap="8%" 
          barGap={4}
        >
      
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={false}
          
            padding={{ left: 12, right: 12}}
             label={{
              value: 'label',   
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
            dataKey="value"
            radius={[20, 20, 20, 20]} 
            barSize={85}
            minPointSize={4}
          >
            {dynamicData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ManagerDashboardChart;