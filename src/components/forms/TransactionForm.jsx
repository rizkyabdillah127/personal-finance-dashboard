import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
    category: "salary",
    photo: null,
    photoPreview: null,
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
      photoPreview: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount) {
      onAdd({
        description: formData.description,
        amount: formData.amount,
        type: formData.type,
        category: formData.category,
        photo: formData.photoPreview,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
      });
      setFormData({
        description: "",
        amount: "",
        type: "income",
        category: "salary",
        photo: null,
        photoPreview: null,
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

        {/* Photo Upload */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">📸 Attach Photo (Optional)</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-input"
            />
            <label
              htmlFor="photo-input"
              className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition group"
            >
              <div className="text-center">
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition">
                  {formData.photoPreview ? "Change photo" : "Click or drag to upload photo"}
                </p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF up to 5MB</p>
              </div>
            </label>
          </div>

          {/* Photo Preview */}
          {formData.photoPreview && (
            <div className="mt-4 relative rounded-lg overflow-hidden border-2 border-blue-300 bg-blue-50">
              <img
                src={formData.photoPreview}
                alt="Photo preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="text-xs text-gray-600 p-2 text-center bg-blue-100">Photo ready to upload</p>
            </div>
          )}
        </div>
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
