import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Download, Calendar, CreditCard, Eye } from "lucide-react";

export const InstructorEarnings = () => {
  const earningsOverview = {
    thisMonth: "$2,450",
    lastMonth: "$1,980",
    thisMonthChange: "+23.8%",
    totalEarnings: "$18,340",
    pendingPayment: "$890",
    totalStudents: 1000
  };

  const earningsByMonth = [
    { month: "January", amount: "$2,450", students: 89, courses: 5 },
    { month: "December", amount: "$1,980", students: 76, courses: 4 },
    { month: "November", amount: "$1,650", students: 62, courses: 3 },
    { month: "October", amount: "$2,120", students: 81, courses: 4 },
    { month: "September", amount: "$1,780", students: 71, courses: 3 },
    { month: "August", amount: "$1,920", students: 75, courses: 3 }
  ];

  const courseRevenue = [
    { course: "Advanced React & TypeScript", students: 234, revenue: "$3,450", avgPerStudent: "$14.74", growth: "+12.5%" },
    { course: "Full-Stack Web Development", students: 189, revenue: "$2,890", avgPerStudent: "$15.29", growth: "+8.2%" },
    { course: "JavaScript ES6+ Guide", students: 421, revenue: "$5,230", avgPerStudent: "$12.42", growth: "+15.3%" },
    { course: "Node.js Backend Development", students: 156, revenue: "$1,920", avgPerStudent: "$12.31", growth: "+5.2%" }
  ];

  const paymentHistory = [
    { id: 1, date: "Jan 5, 2024", amount: "$1,200", status: "Completed", method: "Bank Transfer" },
    { id: 2, date: "Dec 28, 2023", amount: "$980", status: "Completed", method: "Bank Transfer" },
    { id: 3, date: "Dec 15, 2023", amount: "$1,500", status: "Completed", method: "Bank Transfer" },
    { id: 4, date: "Nov 30, 2023", amount: "$890", status: "Pending", method: "Bank Transfer" },
    { id: 5, date: "Nov 15, 2023", amount: "$1,200", status: "Completed", method: "Bank Transfer" }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Earnings & Payments</h2>
        <p className="text-gray-600 mt-1">Monitor your revenue and payment history</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-emerald-600">
              <DollarSign size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-emerald-700">{earningsOverview.thisMonthChange}</span>
          </div>
          <h3 className="text-emerald-700 text-sm font-medium mb-1">This Month</h3>
          <p className="text-3xl font-bold text-emerald-900">{earningsOverview.thisMonth}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-600">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-blue-700 text-sm font-medium mb-1">Total Earnings</h3>
          <p className="text-3xl font-bold text-blue-900">{earningsOverview.totalEarnings}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-amber-600">
              <CreditCard size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-amber-700 text-sm font-medium mb-1">Pending Payment</h3>
          <p className="text-3xl font-bold text-amber-900">{earningsOverview.pendingPayment}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-600">
              <Eye size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-purple-700 text-sm font-medium mb-1">Total Students</h3>
          <p className="text-3xl font-bold text-purple-900">{earningsOverview.totalStudents}</p>
        </motion.div>
      </div>

      {/* Revenue by Course */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Revenue by Course</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Students</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Avg/Student</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody>
              {courseRevenue.map((course, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{course.course}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.students}</td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-600">{course.revenue}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.avgPerStudent}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-green-600 font-semibold">{course.growth}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Earnings by Month & Payment History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Monthly Earnings</h3>
              <button className="text-emerald-600 hover:text-emerald-700">
                <Download size={20} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Earnings</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Students</th>
                </tr>
              </thead>
              <tbody>
                {earningsByMonth.map((month, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{month.month}</td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">{month.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{month.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Payment History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{payment.date}</td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">{payment.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
