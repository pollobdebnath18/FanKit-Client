import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaTruck,
  FaClock,
  FaEllipsisV,
} from "react-icons/fa";

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  date: string;
  status: "Pending" | "Shipped" | "Delivered";
}

const initialOrders: Order[] = [
  {
    id: "ORD-9823",
    customer: "Rahat Chowdhury",
    email: "rahat@gmail.com",
    product: "Argentina 3-Star Home Jersey",
    amount: 89.99,
    date: "July 20, 2026",
    status: "Delivered",
  },
  {
    id: "ORD-9822",
    customer: "Sadia Islam",
    email: "sadia@outlook.com",
    product: "Real Madrid 24/25 Home Jersey",
    amount: 99.99,
    date: "July 20, 2026",
    status: "Pending",
  },
  {
    id: "ORD-9821",
    customer: "Tanvir Ahmed",
    email: "tanvir@yahoo.com",
    product: "Brazil Retro 1998 Yellow Jersey",
    amount: 79.99,
    date: "July 19, 2026",
    status: "Shipped",
  },
  {
    id: "ORD-9820",
    customer: "Mitu Talukder",
    email: "mitu@gmail.com",
    product: "Manchester United Third Jersey",
    amount: 84.99,
    date: "July 18, 2026",
    status: "Delivered",
  },
  {
    id: "ORD-9819",
    customer: "Zamil Hasan",
    email: "zamil@gmail.com",
    product: "Portugal Ronaldo #7 Jersey",
    amount: 109.99,
    date: "July 17, 2026",
    status: "Pending",
  },
  {
    id: "ORD-9818",
    customer: "Ishrat Jahan",
    email: "ishrat@gmail.com",
    product: "England Kane #9 Home Jersey",
    amount: 104.99,
    date: "July 16, 2026",
    status: "Delivered",
  },
  {
    id: "ORD-9817",
    customer: "Nasir Uddin",
    email: "nasir@gmail.com",
    product: "Spain Yamal #10 Away Jersey",
    amount: 89.99,
    date: "July 15, 2026",
    status: "Shipped",
  },
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-emerald-100 text-emerald-800",
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Stats calculation
  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const shippedCount = orders.filter((o) => o.status === "Shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  const handleUpdateStatus = (id: string, newStatus: "Pending" | "Shipped" | "Delivered") => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    setActiveMenuId(null);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 p-6">
      {/* Page Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3A] md:text-3xl">Manage Orders</h2>
        <p className="mt-1 text-slate-500">Track and manage customer jersey orders</p>
      </div>

      {/* Orders Stats Summary */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Orders</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{totalCount}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center font-bold text-slate-500">
            📊
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{pendingCount}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
            <FaClock />
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shipped</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{shippedCount}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
            <FaTruck />
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Delivered</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{deliveredCount}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by Order ID, customer, jersey..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-[#F5A623] focus:bg-white transition-colors"
          />
        </div>

        {/* Filter status */}
        <div className="flex items-center gap-3">
          <FaFilter className="text-slate-400 text-xs" />
          <div className="flex gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
            {["All", "Pending", "Shipped", "Delivered"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                  statusFilter === status
                    ? "bg-[#0B1F3A] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold uppercase text-slate-400">
                <th className="pb-3 pl-2">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Jersey Product</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3">Date Ordered</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 pl-2 font-mono text-xs font-bold text-[#0B1F3A]">
                      {order.id}
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-bold text-slate-900">{order.customer}</p>
                        <p className="text-xs text-slate-400">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 font-medium max-w-[220px] truncate">
                      {order.product}
                    </td>
                    <td className="py-4 font-semibold text-slate-900">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="py-4 text-xs text-slate-500">
                      {order.date}
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 pr-2 text-right relative">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === order.id ? null : order.id)}
                        className="p-2 text-slate-400 hover:text-[#0B1F3A] hover:bg-slate-50 rounded-lg transition"
                      >
                        <FaEllipsisV />
                      </button>

                      {/* Dropdown Menu for Action Status updates */}
                      {activeMenuId === order.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveMenuId(null)}
                          />
                          <div className="absolute right-2 top-12 z-20 mt-1 w-44 rounded-lg border border-slate-100 bg-white py-1.5 shadow-xl text-left">
                            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Update Status
                            </p>
                            <button
                              onClick={() => handleUpdateStatus(order.id, "Pending")}
                              className="flex w-full items-center px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition"
                            >
                              Set to Pending
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, "Shipped")}
                              className="flex w-full items-center px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition"
                            >
                              Set to Shipped
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, "Delivered")}
                              className="flex w-full items-center px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition"
                            >
                              Set to Delivered
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                    No orders found matching the filter or search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;