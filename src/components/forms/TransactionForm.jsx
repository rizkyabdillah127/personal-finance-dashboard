import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
    category: "salary",
  });

  const categories = {
    income: ["salary", "bonus", "investment", "freelance", "other"],
    expense: ["food", "transport", "utilities", "entertainment", "shopping", "health", "other"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };

  const handleTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value,
      category: categories[e.target.value][0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount) {
      onAdd({
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
      });
      setFormData({
        description: "",
        amount: "",
        type: "income",
        category: "salary",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">Add Transaction</h2>
        <p className="text-blue-100 text-sm mt-1">Record your income or expense</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Transaction Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleTypeChange({ target: { value: "income" } })}
              className={`py-3 px-4 rounded-lg font-semibold transition border-2 ${
                formData.type === "income"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:border-green-300"
              }`}
            >
              💰 Income
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange({ target: { value: "expense" } })}
              className={`py-3 px-4 rounded-lg font-semibold transition border-2 ${
                formData.type === "expense"
                  ? "bg-red-50 border-red-500 text-red-700"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:border-red-300"
              }`}
            >
              💸 Expense
            </button>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition capitalize"
          >
            {categories[formData.type].map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Monthly salary, Lunch..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Amount */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Amount (Rp)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg text-white font-bold transition transform hover:scale-105 ${
            formData.type === "income"
              ? "bg-green-600 hover:bg-green-700 shadow-lg"
              : "bg-red-600 hover:bg-red-700 shadow-lg"
          }`}
        >
          + Add {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
        </button>
      </form>
    </div>
  );
}
