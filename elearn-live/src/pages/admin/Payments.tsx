import { motion } from "framer-motion";
import { 
  DollarSign, TrendingUp, TrendingDown, CreditCard, 
  Download, Search, Filter, Eye, MoreVertical,
  CheckCircle, Clock, XCircle, Calendar, ArrowUpRight,
  Users, ShoppingBag, Receipt, Wallet
} from "lucide-react";
import { useState } from "react";

export const Payments = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Payment Data
  const stats = [
    {
      label: "Total Revenue",
      value: "$124,580",
      change: "+23.5%",
      trend: "up",
      icon: <DollarSign size={24} />,
      color: "blue"
    },
    {
      label: "This Month",
      value: "$45,280",
      change: "+12.3%",
      trend: "up",
      icon: <Wallet size={24} />,
      color: "green"
    },
    {
      label: "Transactions",
      value: "1,247",
      change: "+8.7%",
      trend: "up",
      icon: <Receipt size={24} />,
      color: "purple"
    },
    {
      label: "Avg. Order Value",
      value: "$99.90",
      change: "-2.1%",
      trend: "down",
      icon: <ShoppingBag size={24} />,
      color: "amber"
    }
  ];

  const transactions = [
    {
      id: "TXN-001234",
      student: "Alex Kumar",
      email: "alex.kumar@example.com",
      course: "Advanced React & TypeScript",
      amount: 99.00,
      status: "completed",
      method: "Credit Card",
      date: "2026-01-03",
      time: "14:35"
    },
    {
      id: "TXN-001233",
      student: "Maria Garcia",
      email: "maria.garcia@example.com",
      course: "Full-Stack Web Development",
      amount: 119.00,
      status: "completed",
      method: "PayPal",
      date: "2026-01-03",
      time: "12:20"
    },
    {
      id: "TXN-001232",
      student: "John Smith",
      email: "john.smith@example.com",
      course: "JavaScript ES6+ Guide",
      amount: 79.00,
      status: "pending",
      method: "Credit Card",
      date: "2026-01-02",
      time: "18:45"
    },
    {
      id: "TXN-001231",
      student: "Emily Davis",
      email: "emily.davis@example.com",
      course: "Node.js Masterclass",
      amount: 109.00,
      status: "completed",
      method: "Debit Card",
      date: "2026-01-02",
      time: "16:30"
    },
    {
      id: "TXN-001230",
      student: "Michael Brown",
      email: "michael.brown@example.com",
      course: "Python for Beginners",
      amount: 89.00,
      status: "failed",
      method: "Credit Card",
      date: "2026-01-02",
      time: "10:15"
    }
  ];

  const revenueByCategory = [
    { category: "Web Development", revenue: 45280, percentage: 36 },
    { category: "Programming", revenue: 37400, percentage: 30 },
    { category: "Data Science", revenue: 24860, percentage: 20 },
    { category: "Design", revenue: 17040, percentage: 14 }
  ];

  const topCourses = [
    { name: "Advanced React & TypeScript", sales: 234, revenue: "$23,166" },
    { name: "Full-Stack Development", sales: 189, revenue: "$22,491" },
    { name: "JavaScript ES6+", sales: 421, revenue: "$33,259" }
  ];

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 sm:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments & Revenue</h1>
            <p className="text-gray-600">Track transactions, revenue, and financial analytics</p>
          </div>
          
          <div className="flex gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900 font-medium"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-5 border-2 border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Revenue by Category */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Revenue by Category</h2>
                <p className="text-sm text-gray-600">Course category performance breakdown</p>
              </div>
            </div>

            <div className="space-y-4">
              {revenueByCategory.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{item.category}</span>
                    <span className="text-sm font-bold text-gray-900">${item.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.percentage}% of total revenue</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Recent Transactions</h2>
                <p className="text-sm text-gray-600">Latest payment activity</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    statusFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter("completed")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    statusFilter === "completed" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    statusFilter === "pending" ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pending
                </button>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left p-3 text-xs font-bold text-gray-700">Transaction ID</th>
                    <th className="text-left p-3 text-xs font-bold text-gray-700">Student</th>
                    <th className="text-left p-3 text-xs font-bold text-gray-700">Course</th>
                    <th className="text-center p-3 text-xs font-bold text-gray-700">Amount</th>
                    <th className="text-center p-3 text-xs font-bold text-gray-700">Status</th>
                    <th className="text-center p-3 text-xs font-bold text-gray-700">Date</th>
                    <th className="text-center p-3 text-xs font-bold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <p className="font-semibold text-gray-900 text-sm">{txn.id}</p>
                        <p className="text-xs text-gray-600">{txn.method}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-gray-900 text-sm">{txn.student}</p>
                        <p className="text-xs text-gray-600">{txn.email}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm text-gray-700 line-clamp-1">{txn.course}</p>
                      </td>
                      <td className="p-3 text-center">
                        <p className="font-bold text-gray-900">${txn.amount.toFixed(2)}</p>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                          txn.status === 'completed' ? 'bg-green-100 text-green-700' :
                          txn.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {txn.status === 'completed' && <CheckCircle size={12} />}
                          {txn.status === 'pending' && <Clock size={12} />}
                          {txn.status === 'failed' && <XCircle size={12} />}
                          {txn.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <p className="text-sm text-gray-700">{new Date(txn.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-600">{txn.time}</p>
                      </td>
                      <td className="p-3 text-center">
                        <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Top Selling Courses */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Courses</h3>
            
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <div className={`text-lg font-bold ${
                    index === 0 ? 'text-amber-500' :
                    index === 1 ? 'text-gray-400' :
                    'text-amber-700'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{course.name}</p>
                    <p className="text-xs text-gray-600">{course.sales} sales</p>
                  </div>
                  <p className="font-bold text-green-600 text-sm">{course.revenue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-blue-600" size={18} />
                  <span className="text-sm font-medium text-gray-700">Credit Card</span>
                </div>
                <span className="text-sm font-bold text-gray-900">62%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wallet className="text-purple-600" size={18} />
                  <span className="text-sm font-medium text-gray-700">PayPal</span>
                </div>
                <span className="text-sm font-bold text-gray-900">24%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-green-600" size={18} />
                  <span className="text-sm font-medium text-gray-700">Debit Card</span>
                </div>
                <span className="text-sm font-bold text-gray-900">14%</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Insights</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-lg font-bold text-green-600">96.4%</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Pending Payments</span>
                <span className="text-lg font-bold text-amber-600">$3,240</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Refunds (This Month)</span>
                <span className="text-lg font-bold text-red-600">$890</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Processing Fees</span>
                <span className="text-lg font-bold text-gray-900">$1,245</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
