import { useState } from "react";
import TransactionForm from "../components/forms/TransactionForm";
import TransactionChart from "../components/charts/TransactionChart";
import PhotoModal from "../components/PhotoModal";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Calculate totals
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col">
      {/* Premium Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">keuangan ikoy</h1>
              <p className="text-xs text-slate-500 mt-0.5">Financial Intelligence Platform</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{new Date().toLocaleDateString('id-ID', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
            <p className="text-xs text-slate-500 mt-0.5">{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-8">
        {/* KPI Cards - Premium Design */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Income Card */}
          <div className="group relative bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50 group-hover:to-transparent rounded-xl transition-all duration-300"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium">Total Income</p>
                  <h2 className="text-4xl font-bold text-slate-900 mt-2">Rp {(totalIncome/1000000).toFixed(1)}M</h2>
                  <p className="text-xs text-slate-500 mt-2">From all sources</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center group-hover:from-green-100 group-hover:to-emerald-100 transition-all duration-300">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">This month</p>
                  <p className="text-lg font-semibold text-green-600 mt-1">0%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Card */}
          <div className="group relative bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/0 group-hover:from-orange-50 group-hover:to-transparent rounded-xl transition-all duration-300"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium">Total Expenses</p>
                  <h2 className="text-4xl font-bold text-slate-900 mt-2">Rp {(totalExpense/1000000).toFixed(1)}M</h2>
                  <p className="text-xs text-slate-500 mt-2">Spending this period</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center group-hover:from-orange-100 group-hover:to-red-100 transition-all duration-300">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </div>
              </div>
              <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">This month</p>
                  <p className="text-lg font-semibold text-orange-600 mt-1">0%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div className={`group relative bg-gradient-to-br ${balance >= 0 ? 'from-blue-600 to-blue-700' : 'from-red-600 to-red-700'} rounded-xl border border-slate-300 p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-white/80 text-sm font-medium">Net Balance</p>
                  <h2 className="text-4xl font-bold text-white mt-2">Rp {(balance/1000000).toFixed(1)}M</h2>
                  <p className="text-white/70 text-xs mt-2">{balance >= 0 ? 'Healthy position' : 'Review spending'}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-end justify-between pt-4 border-t border-white/20">
                <div>
                  <p className="text-white/70 text-xs">Status</p>
                  <p className="text-lg font-semibold text-white mt-1">{balance >= 0 ? '✓ Positive' : '⚠ Negative'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form & Chart Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Form */}
          <div>
            <TransactionForm onAdd={handleAddTransaction} />
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Income vs Expenses</h3>
              <p className="text-sm text-slate-500 mt-1">Category breakdown analysis</p>
            </div>
            <div className="h-80">
              <TransactionChart transactions={transactions} />
            </div>
          </div>
        </div>

        {/* Premium Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
                <p className="text-sm text-slate-500 mt-1">{transactions.length} total transactions • Updated now</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200">
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Description</th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                  <th className="px-8 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Photo</th>
                  <th className="px-8 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                  <th className="px-8 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <p className="text-slate-500 font-medium text-sm">No transactions yet</p>
                        <p className="text-slate-400 text-xs mt-1">Add your first transaction to get started</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, index) => (
                    <tr key={tx.id} className={`hover:bg-blue-50/50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      <td className="px-8 py-4 text-sm text-slate-700 font-medium">{tx.date}</td>
                      <td className="px-8 py-4 text-sm text-slate-700">{tx.description}</td>
                      <td className="px-8 py-4 text-sm text-slate-700">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 capitalize">
                          {tx.category}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        {tx.photo ? (
                          <div className="flex justify-center">
                            <button
                              onClick={() => setSelectedPhoto({ photo: tx.photo, description: tx.description })}
                              className="h-10 w-10 rounded object-cover cursor-pointer hover:scale-150 transition transform overflow-hidden border-2 border-blue-300"
                            >
                              <img
                                src={tx.photo}
                                alt={tx.description}
                                className="h-full w-full object-cover"
                                title="Click to view"
                              />
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">−</span>
                        )}
                      </td>
                      <td className={`px-8 py-4 text-sm font-semibold text-right ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {tx.type === "income" ? "+" : "−"} Rp {(tx.amount/1000000).toFixed(1)}M
                      </td>
                      <td className="px-8 py-4 text-center">
                        {tx.type === "income" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Income
                          </span>               
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            Expense
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto.photo}
          description={selectedPhoto.description}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
