import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#2E7D32", "#66BB6A", "#A5D6A7", "#81C784"];

const CustomPieChart = ({ data }) => {
  const chartData = data && data.length > 0 ? data : [
    { name: "Rice", value: 40 },
    { name: "Wheat", value: 25 },
    { name: "Maize", value: 20 },
    { name: "Others", value: 15 },
  ];

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
