import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TransactionChart({ transactions }) {
  // Calculate income and expense by category
  const chartData = transactions.reduce((acc, tx) => {
    const existing = acc.find((item) => item.category === tx.category);

    if (existing) {
      if (tx.type === "income") {
        existing.income += tx.amount;
      } else {
        existing.expense += tx.amount;
      }
    } else {
      acc.push({
        category: tx.category.charAt(0).toUpperCase() + tx.category.slice(1),
        income: tx.type === "income" ? tx.amount : 0,
        expense: tx.type === "expense" ? tx.amount : 0,
      });
    }
    return acc;
  }, []);

  if (chartData.length === 0) {
    return (
      <div className="card mb-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data available. Add transactions to see the chart.</p>
      </div>
    );
  }

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Income vs Expense</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="income" fill="#10b981" name="Income" />
          <Bar dataKey="expense" fill="#ef4444" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
