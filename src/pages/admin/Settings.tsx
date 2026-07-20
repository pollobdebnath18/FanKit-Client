import { useState } from "react";
import { motion } from "framer-motion";
import { FaStore, FaCreditCard, FaLock, FaBell, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const Settings = () => {
  const [storeName, setStoreName] = useState("FanKit Jersey Store");
  const [email, setEmail] = useState("support@fankit.com");
  const [phone, setPhone] = useState("+880 1780-589179");
  const [address, setAddress] = useState("32 Akhaliya, Sylhet, Bangladesh");

  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);
  const [stripeSandbox, setStripeSandbox] = useState(true);

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 p-6 max-w-4xl">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3A] md:text-3xl">Settings</h2>
        <p className="mt-1 text-slate-500">Configure FanKit store details and configurations</p>
      </div>

      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800"
        >
          <FaCheckCircle className="text-emerald-500 text-lg shrink-0" />
          <span className="text-sm font-bold">Settings saved successfully!</span>
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Store profile */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#0B1F3A] flex items-center gap-2 mb-6">
            <FaStore className="text-[#F5A623]" /> Store Details
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#F5A623] focus:bg-white transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Support Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#F5A623] focus:bg-white transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#F5A623] focus:bg-white transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Physical Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#F5A623] focus:bg-white transition"
                required
              />
            </div>
          </div>
        </div>

        {/* Payments gateway settings */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#0B1F3A] flex items-center gap-2 mb-6">
            <FaCreditCard className="text-[#F5A623]" /> Payment Gateways
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 text-sm">Stripe Credit Card Payments</p>
                <p className="text-xs text-slate-400">Accept credit and debit cards globally</p>
              </div>
              <input
                type="checkbox"
                checked={stripeEnabled}
                onChange={() => setStripeEnabled(!stripeEnabled)}
                className="toggle toggle-success"
              />
            </div>

            {stripeEnabled && (
              <div className="ml-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-xs">Stripe Sandbox / Test Mode</p>
                  <p className="text-[11px] text-slate-400">Uses Stripe mock keys for local simulation</p>
                </div>
                <input
                  type="checkbox"
                  checked={stripeSandbox}
                  onChange={() => setStripeSandbox(!stripeSandbox)}
                  className="toggle toggle-sm"
                />
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              <div>
                <p className="font-bold text-slate-900 text-sm">Cash on Delivery (COD)</p>
                <p className="text-xs text-slate-400">Allow users to pay with cash upon arrival</p>
              </div>
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={() => setCodEnabled(!codEnabled)}
                className="toggle toggle-success"
              />
            </div>
          </div>
        </div>

        {/* System configurations settings */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#0B1F3A] flex items-center gap-2 mb-6">
            <FaLock className="text-[#F5A623]" /> System Maintenance
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#D6392E] text-sm">Store Maintenance Mode</p>
                <p className="text-xs text-slate-400">Temporarily block user transactions and browsing</p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={() => setMaintenanceMode(!maintenanceMode)}
                className="toggle toggle-error"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              <div>
                <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <FaBell className="text-slate-400 text-xs" /> Email Alerts on Orders
                </p>
                <p className="text-xs text-slate-400">Send direct system notification emails when customers buy jerseys</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="toggle toggle-success"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3.5">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5C] text-white font-bold text-sm shadow-md hover:shadow-lg transition duration-300"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;