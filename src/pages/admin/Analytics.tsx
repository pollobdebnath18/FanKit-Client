import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const salesData = [
  { name: "Jan", sales: 4000, revenue: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398 },
  { name: "Mar", sales: 5000, revenue: 9800 },
  { name: "Apr", sales: 2780, revenue: 3908 },
  { name: "May", sales: 1890, revenue: 4800 },
  { name: "Jun", sales: 2390, revenue: 3800 },
  { name: "Jul", sales: 3490, revenue: 4300 },
];

const categoryData = [
  { name: "Club Jerseys", value: 45 },
  { name: "National Teams", value: 30 },
  { name: "Retro Classics", value: 15 },
  { name: "Special Editions", value: 10 },
];

const weeklyTrafficData = [
  { day: "Mon", current: 240, previous: 180 },
  { day: "Tue", current: 300, previous: 220 },
  { day: "Wed", current: 320, previous: 280 },
  { day: "Thu", current: 280, previous: 290 },
  { day: "Fri", current: 390, previous: 310 },
  { day: "Sat", current: 480, previous: 350 },
  { day: "Sun", current: 520, previous: 380 },
];

const PIE_COLORS = ["#0B1F3A", "#F5A623", "#00C49F", "#FF8042"];

const Analytics = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3A] md:text-3xl">Analytics & Reports</h2>
        <p className="mt-1 text-slate-500">Track visual metrics, sales growth, and customer behaviors</p>
      </div>

      {/* Grid of charts */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Sales & Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col"
        >
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Revenue & Sales Performance</h3>
            <p className="text-xs text-slate-400">Monthly breakdown of overall customer spending</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B1F3A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0B1F3A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5A623" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Total Revenue ($)"
                  stroke="#F5A623"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Jerseys Sold"
                  stroke="#0B1F3A"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Traffic Growth Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col"
        >
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Weekly Traffic Metrics</h3>
            <p className="text-xs text-slate-400">Comparing page visitors of current week vs previous week</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Line
                  type="monotone"
                  dataKey="current"
                  name="This Week"
                  stroke="#0B1F3A"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  name="Last Week"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sales by Category Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col"
        >
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Jersey Categories Distribution</h3>
            <p className="text-xs text-slate-400">Proportion of orders across jersey type catalogs</p>
          </div>
          <div className="h-80 w-full flex flex-col items-center justify-center sm:flex-row">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />

                    ))}
                  </Pie>

                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom legends */}
            <div className="mt-4 sm:mt-0 sm:ml-8 space-y-3.5">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2.5">
                  <div
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-none">{item.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold">{item.value}% Share</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Product Stock Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col"
        >
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Top Brands Performance</h3>
            <p className="text-xs text-slate-400">Total volume ordered by athletic brands</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { brand: "Adidas", count: 480 },
                  { brand: "Nike", count: 320 },
                  { brand: "Puma", count: 180 },
                  { brand: "Castore", count: 90 },
                  { brand: "Retro", count: 250 },
                ]}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="brand" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" name="Orders Count" fill="#0B1F3A" radius={[4, 4, 0, 0]}>
                  {PIE_COLORS.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#0B1F3A" : index === 1 ? "#F5A623" : "#1e293b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;