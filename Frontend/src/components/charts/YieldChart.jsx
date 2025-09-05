import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const YieldChart = ({ data }) => {
  // Sample fallback data if none passed
  const chartData = data && data.length > 0 ? data : [
    { month: "Jan", yield: 2.5 },
    { month: "Feb", yield: 3.1 },
    { month: "Mar", yield: 3.8 },
    { month: "Apr", yield: 4.2 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: "Yield (tons)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="yield" stroke="#2E7D32" strokeWidth={3} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YieldChart;
