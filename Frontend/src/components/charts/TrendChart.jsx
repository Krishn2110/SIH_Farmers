import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const TrendChart = ({ data }) => {
  const chartData = data && data.length > 0 ? data : [
    { crop: "Wheat", yield: 3.5 },
    { crop: "Rice", yield: 4.2 },
    { crop: "Maize", yield: 2.8 },
    { crop: "Barley", yield: 3.0 },
  ];

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="yield" fill="#4CAF50" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
