import { motion } from "framer-motion";
import {
  FaDollarSign,
  FaShoppingBag,
  FaUsers,
  FaTshirt,
  FaArrowUp,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router";

const stats = [
  {
    label: "Total Revenue",
    value: "$24,850.00",
    change: "+12.5%",
    desc: "from last month",
    icon: <FaDollarSign className="h-6 w-6 text-[#F5A623]" />,
    bg: "from-[#0B1F3A]/5 to-[#F5A623]/5",
    border: "border-l-4 border-[#F5A623]",
  },
  {
    label: "Total Orders",
    value: "1,245",
    change: "+8.2%",
    desc: "from last week",
    icon: <FaShoppingBag className="h-6 w-6 text-[#0B1F3A]" />,
    bg: "from-[#0B1F3A]/5 to-[#1A3A5C]/5",
    border: "border-l-4 border-[#0B1F3A]",
  },
  {
    label: "Active Users",
    value: "843",
    change: "+15.3%",
    desc: "from last week",
    icon: <FaUsers className="h-6 w-6 text-emerald-500" />,
    bg: "from-emerald-500/5 to-teal-500/5",
    border: "border-l-4 border-emerald-500",
  },
  {
    label: "Total Jerseys",
    value: "128",
    change: "+4.1%",
    desc: "added recently",
    icon: <FaTshirt className="h-6 w-6 text-cyan-500" />,
    bg: "from-cyan-500/5 to-blue-500/5",
    border: "border-l-4 border-cyan-500",
  },
];

const recentOrders = [
  {
    id: "ORD-9823",
    customer: "Rahat Chowdhury",
    email: "rahat@gmail.com",
    product: "Argentina 3-Star Home Jersey",
    amount: "$89.99",
    date: "July 20, 2026",
    status: "Delivered",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "ORD-9822",
    customer: "Sadia Islam",
    email: "sadia@outlook.com",
    product: "Real Madrid 24/25 Home Jersey",
    amount: "$99.99",
    date: "July 20, 2026",
    status: "Pending",
    statusColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "ORD-9821",
    customer: "Tanvir Ahmed",
    email: "tanvir@yahoo.com",
    product: "Brazil Retro 1998 Yellow Jersey",
    amount: "$79.99",
    date: "July 19, 2026",
    status: "Shipped",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "ORD-9820",
    customer: "Mitu Talukder",
    email: "mitu@gmail.com",
    product: "Manchester United Third Jersey",
    amount: "$84.99",
    date: "July 18, 2026",
    status: "Delivered",
    statusColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "ORD-9819",
    customer: "Zamil Hasan",
    email: "zamil@gmail.com",
    product: "Portugal Ronaldo #7 Jersey",
    amount: "$109.99",
    date: "July 17, 2026",
    status: "Pending",
    statusColor: "bg-amber-100 text-amber-800",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5C] p-6 text-white shadow-md">
        <h2 className="text-2xl font-bold md:text-3xl">Welcome Back, Admin!</h2>
        <p className="mt-2 text-blue-200">
          Here is a quick overview of what is happening in FanKit today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md ${stat.border}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">{stat.label}</span>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{stat.value}</span>
              <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600">
                <FaArrowUp className="text-[10px]" />
                {stat.change}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Orders List (Span 2) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <p className="text-xs text-slate-400">Keep track of the latest purchases</p>
            </div>
            <Link
              to="/admin/orders"
              className="rounded-lg bg-slate-50 px-4 py-2 text-xs font-bold text-[#0B1F3A] hover:bg-slate-100 transition"
            >
              View All Orders
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase text-slate-400">
                  <th className="pb-3 pl-2">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3 pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 pl-2 font-mono text-xs font-bold text-slate-500">{order.id}</td>
                    <td className="py-3">
                      <div>
                        <p className="font-bold text-slate-950">{order.customer}</p>
                        <p className="text-xs text-slate-400">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-3 max-w-[200px] truncate">{order.product}</td>
                    <td className="py-3 font-semibold text-slate-900">{order.amount}</td>
                    <td className="py-3 pr-2">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed (Span 1) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Activities</h3>
            <p className="text-xs text-slate-400">Latest updates on operations</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <FaTshirt className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">New Product Added</p>
                <p className="text-xs text-slate-500">"Real Madrid Away Jersey 24/25"</p>
                <span className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <FaClock /> 10 mins ago
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <FaUsers className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">New Admin Assigned</p>
                <p className="text-xs text-slate-500">Assigned role to sumit@fankit.com</p>
                <span className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <FaClock /> 2 hours ago
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <FaShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Stock Alert</p>
                <p className="text-xs text-slate-500">Brazil Retro Jersey is running low (2 left)</p>
                <span className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <FaClock /> 4 hours ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;