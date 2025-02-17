import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const ExpenseChart = ({ transactions }) => {
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    const type = t.amount > 0 ? "income" : "expense";
    
    acc[month] = acc[month] || { income: 0, expense: 0 };
    acc[month][type] += Math.abs(t.amount);  
    return acc;
  }, {});

  const data = Object.keys(monthlyData).map((month) => ({
    name: month,
    income: monthlyData[month].income,
    expense: monthlyData[month].expense,
  }));

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h1 className="chart-title">Monthly Income and Expense Overview</h1>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} className="expense-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" barSize={40} />
          <Bar dataKey="expense" fill="#ff7f0e" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
