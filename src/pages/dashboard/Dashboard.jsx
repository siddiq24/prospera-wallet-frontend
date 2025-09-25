import React from "react";
import { Plus, Send } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Wave from "react-wavify";

const Dashboard = () => {
  const chartData = [
    { day: "Sat", income: 20000, expense: 50000 },
    { day: "Sun", income: 80000, expense: 50000 },
    { day: "Mon", income: 85000, expense: 65000 },
    { day: "Tue", income: 85000, expense: 20000 },
    { day: "Wed", income: 30000, expense: 5000 },
    { day: "Thu", income: 20000, expense: 60000 },
    { day: "Fri", income: 70000, expense: 45000 },
  ];

  const transactions = [
    {
      id: 1,
      name: "Floyd Miles",
      type: "expense",
      amount: 50000,
      method: "Send",
    },
    {
      id: 2,
      name: "Floyd Miles",
      type: "income",
      amount: 50000,
      method: "Send",
    },
    {
      id: 3,
      name: "Floyd Miles",
      type: "expense",
      amount: 50000,
      method: "Send",
    },
    {
      id: 4,
      name: "Floyd Miles",
      type: "income",
      amount: 50000,
      method: "Send",
    },
    {
      id: 5,
      name: "Floyd Miles",
      type: "expense",
      amount: 50000,
      method: "Send",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip rounded-lg" style={{ fontSize: '14px', backgroundColor: 'white', padding: '5px' }}>
          <p className="text-center">{label}</p>
          <p className="label text-blue-600">{`Income : ${payload[0].value}`}</p>
          <p className="label text-red-600">{`Expense : ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white min-h-screen max-w-5xl mx-auto">
      {/* Header Background biru - hanya untuk mobile */}
      <div className="bg-blue-600 h-28 md:hidden"></div>

      {/* ===== Mobile Layout ===== */}
      <div className="block md:hidden">
        {/* Balance Card Mobile */}
        <div className="-mt-16 px-4">
          <div className="bg-white rounded-2xl shadow-lg relative overflow-hidden">
            {/* Wave Background */}
            <Wave
              fill='#2948FF1A'
              paused={false}
              style={{ display: 'flex' }}
              options={{
                height: 80,
                amplitude: 20,
                speed: 0.15,
                points: 3
              }}
            />

            <div className="absolute inset-0 p-6 flex justify-between items-center">
              {/* Balance Section */}
              <div className="">
                <p className="text-gray-600 text-sm">Balance</p>
                <p className="text-xl font-bold">Rp. 500.000</p>
              </div>

              {/* Actions */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <button className="bg-blue-600 text-white p-3 rounded-full shadow">
                    <Plus size={16} />
                  </button>
                  <span className="text-xs text-gray-700 mt-2">Top Up</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="bg-blue-600 text-white p-3 rounded-full shadow">
                    <Send size={16} />
                  </button>
                  <span className="text-xs text-gray-700 mt-2">Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Chart Section Mobile */}
        <div className="px-6 py-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Financial Chart
              </h3>
              <div className="flex gap-3">
                <select className="rounded px-2 py-1 text-sm bg-[#F1F1F1]">
                  <option>Income</option>
                  <option>Expense</option>
                </select>
                <select className="rounded px-2 py-1 text-sm bg-[#F1F1F1]">
                  <option>7 Days</option>
                  <option>30 Days</option>
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" style={{ fontSize: '10px' }} />
                <YAxis style={{ fontSize: '10px' }} />
                <Tooltip content={ CustomTooltip} />
                <Bar dataKey="income" fill="#2563eb" radius={[10, 10, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Expense</span>
              </div>
            </div>
          </div>

          {/* Transaction History Mobile */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction History
              </h3>
              <button className="text-blue-600 text-sm">See All</button>
            </div>

            <div className="space-y-4">
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between pb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        <img src="/avatar.png" alt="" />
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-gray-500">{t.method}</div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold text-sm ${t.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {t.type === "income" ? "+" : "-"}Rp
                    {t.amount.toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Desktop Layout ===== */}
      <div className="hidden md:block p-6">
        {/* Bagian Atas: 2 grid */}
        <div className="flex gap-6 mb-6">
          {/* Balance Card Desktop */}
          <div className="bg-white flex-1 border border-gray-300 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <img src="/balance.png"></img>
              <span className="text-gray-700 font-medium">Balance</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">Rp.120.000</p>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <div>
                Income
                <div className="text-green-600 font-medium">
                  Rp.200.000 <span className="ml-1">+2%</span>
                </div>
              </div>
              <div>
                Expense
                <div className="text-red-500 font-medium">
                  Rp.100.000 <span className="ml-1">+5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fast Service + Buttons */}
          <div className="bg-white flex-2 border border-gray-300 col-auto rounded-xl p-6 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-center ">
              <h3 className="text-gray-700 font-medium text-lg">
                Fast Service
              </h3>
              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow text-sm">
                  <Plus size={16} />
                  Top Up
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow text-sm">
                  <Send size={16} />
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Bawah: Chart + History */}
        <div className="grid grid-cols-3 gap-6">
          {/* Financial Chart Desktop */}
          <div className="col-span-2 bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Financial Chart
              </h3>
              <div className="flex gap-3">
                <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-[#F1F1F1]">
                  <option>7 Days</option>
                  <option>30 Days</option>
                </select>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-[#F1F1F1]">
                  <option>All</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={CustomTooltip}/>
                <Bar dataKey="income" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Expense</span>
              </div>
            </div>
          </div>

          {/* Transaction History Desktop */}
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction History
              </h3>
              <button className="text-blue-600 text-sm">See All</button>
            </div>
            <div className="space-y-4">
              {transactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        <img src="/avatar.png" alt="" />
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.method}</p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold text-sm ${t.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {t.type === "income" ? "+" : "-"}Rp
                    {t.amount.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
