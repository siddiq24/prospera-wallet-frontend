import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Wave from "react-wavify";
import Header from "../../components/Header";
import { Dashb } from "../../assets/Svg";
import { Plus, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../redux/slices/historySlice";
import axios from "axios";
import { useNavigate } from "react-router";
import { Down, Up } from "../../components/profile/Svg";
import DashboardSkeleton from "../../components/loading/DashboardSceletone";
const URL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
  const navigate = useNavigate()
  const [select, setSelect] = useState('all')
  const [range, setRange] = useState('daily')
  const { token } = useSelector(state => state.user)
  const { history, loading } = useSelector((state) => state.history);
  const dispatch = useDispatch()
  // console.log(history)

  const [balance, setBalance] = useState(null)
  const [chartData, setChartData] = useState([])
  const [daily, setDaily] = useState([])

  useEffect(() => {
    dispatch(fetchHistory(token));
    (async () => {
      try {
        const resH = await axios.get(`${URL}/user/wallet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(resH.data.data)

        const resC = await axios.get(`${URL}/user/summary?range=${range}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChartData(
          resC.data.data.map((data, i) => ({
            day: (resC.data.data.length == 4 ? `Week ${i + 1}` : new Date(data.date).toDateString().slice(0, 3)),
            income: data.total_income,
            expense: data.total_expense
          }))
        );
        const resD = await axios.get(`${URL}/user/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDaily(resD.data.data[5])
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch, token, balance, range]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip rounded-lg" style={{ fontSize: '14px', backgroundColor: 'white', padding: '5px' }}>
          <p className="text-center">{label}</p>
          {payload?.[0] && <p className="label text-blue-600">Income : {'Rp.' + payload[0].value.toLocaleString("id-ID")}</p>}
          {payload?.[1] && <p className="label text-red-600">Expense : {'Rp.' + payload[1].value.toLocaleString("id-ID")}</p>}
        </div>
      );
    }
    return null;
  };

  if (loading) return (
    <div className="flex-1">
      <DashboardSkeleton />
    </div>
  );

  return (
    <div className=" flex-1">
      <Header title={'Dashboard'} Icon={Dashb} />
      {/* Header Background biru - hanya untuk mobile */}
      <div className="bg-blue-600 h-16 md:hidden"></div>

      {/* ===== Mobile Layout ===== */}
      <div className="block md:hidden">
        {/* Balance Card Mobile */}
        <div className="-mt-16 px-4">
          <div className="bg-white rounded-2xl shadow-lg relative overflow-hidden">
            {/* Wave Background */}
            {/* <p>{new Date(Date.now()).toDateString().slice(0, 3)}</p> */}
            <Wave
              fill="#2948FF1A"
              paused={false}
              style={{ display: "flex" }}
              options={{
                height: 80,
                amplitude: 20,
                speed: 0.15,
                points: 3,
              }}
            />

            <div className="absolute inset-0 p-6 flex justify-between items-center">
              {/* Balance Section */}
              <div className="">
                <p className="text-gray-600 text-sm">Balance</p>
                <p className="text-xl font-bold">Rp. {balance?.toLocaleString("id-ID") || '-'}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <button onClick={() => { navigate('/transaction/topup') }}
                    className="bg-blue-600 text-white p-3 rounded-full shadow">
                    <Plus size={16} />
                  </button>
                  <span className="text-xs text-gray-700 mt-2">Top Up</span>
                </div>
                <div className="flex flex-col items-center">
                  <button onClick={() => { navigate('/transaction/transfer') }}
                    className="bg-blue-600 text-white p-3 rounded-full shadow">
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
                <select onChange={(e) => {
                  e.preventDefault()
                  setSelect(e.target.value)
                }}
                  className="focus:outline-none focus:ring-0 rounded px-2 py-1 text-sm bg-[#F1F1F1]">
                  <option value={'all'}>All</option>
                  <option value={'income'}>Income</option>
                  <option value={'expense'}>Expense</option>
                </select>
                <select onChange={(e) => {
                  e.preventDefault()
                  setRange(e.target.value)
                }}
                  className="focus:outline-none focus:ring-0 rounded px-2 py-1 text-sm bg-[#F1F1F1]">
                  <option value={'daily'}>7 Days</option>
                  <option value={'weekly'}>30 Days</option>
                </select>
              </div>
            </div>

            <div className="-ml-5">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="day" style={{ fontSize: "10px" }} />
                  <YAxis style={{ fontSize: "10px" }} />
                  <Tooltip content={CustomTooltip} />
                  {(select == 'income' || select == 'all') && < Bar dataKey="income" fill="#2563eb" radius={[6, 6, 0, 0]} />}
                  {(select == 'expense' || select == 'all') && <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />}
                </BarChart>
              </ResponsiveContainer>
            </div>

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
              {history?.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between pb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        <img src={`https://api.dicebear.com/9.x/open-peeps/png?seed==${t.id}`} alt="" />
                        {/* <img src={t.counterparty_img} alt="" /> */}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {t.counterparty_name}
                      </div>
                      <div className="text-xs text-gray-500">{t.total}</div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold text-sm ${t.type === "transfer" ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {t.type === "transfer" ? "+" : "-"}Rp
                    {t.total.toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Desktop Layout ===== */}
      <div className="hidden md:block">
        {/* Bagian Atas: 2 grid */}
        <div className="flex gap-6 mb-6">
          {/* Balance Card Desktop */}
          <div className="bg-white flex-1 border border-gray-300 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <img src="/balance.png"></img>
              <span className="text-gray-700 font-medium">Balance</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{balance?.toLocaleString("id-ID") || '-'}</p>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <div >
                Income
                <div className="text-green-600 font-medium flex w-max">
                  Rp.{history?.length > 0
                    ? (daily?.total_income ?? 0).toLocaleString("id-ID")
                    : '0'
                  }
                  <span className="ml-2">
                    +{balance > 0
                      ? Math.round(((daily?.total_income ?? 0) / balance) * 100)
                      : 0
                    }%
                  </span>
                  <Up />
                </div>
              </div>
              <div >
                Expense
                <div className="text-red-500 font-medium flex w-max">
                  Rp.{history?.length > 0
                    ? (daily?.total_expense ?? 0).toLocaleString("id-ID")
                    : '0'
                  }
                  <span className="ml-2">
                    +{balance > 0
                      ? Math.round(((daily?.total_expense ?? 0) / balance) * 100)
                      : 0
                    }%
                  </span>
                  <Down />
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
                <button onClick={() => { navigate('/transaction/topup') }}
                  className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 shadow text-sm">
                  <Plus size={16} />
                  Top Up
                </button>
                <button onClick={() => { navigate('/transaction/transfer') }}
                  className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 shadow text-sm">
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
                <select onChange={(e) => {
                  e.preventDefault()
                  setRange(e.target.value)
                }}
                  className="focus:outline-none focus:ring-0 border border-gray-300 rounded px-2 py-1 text-sm bg-[#F1F1F1]">
                  <option value={'daily'}>7 Days</option>
                  <option value={'weekly'}>30 Days</option>
                </select>
                <select onChange={(e) => {
                  e.preventDefault()
                  setSelect(e.target.value)
                }}
                  className="focus:outline-none focus:ring-0 border border-gray-300 rounded px-2 py-1 text-sm bg-[#F1F1F1]">
                  <option value={'all'}>All</option>
                  <option value={'income'}>Income</option>
                  <option value={'expense'}>Expense</option>
                </select>
              </div>
            </div>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="day" />
                  <YAxis style={{ fontSize: "10px" }} />
                  <Tooltip content={CustomTooltip} />
                  {(select == 'income' || select == 'all') && (
                    <Bar dataKey="income" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  )}
                  {(select == 'expense' || select == 'all') && (
                    <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>

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
              {history?.map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {t.counterparty_im
                          ? <img src={`${URL}/profile/${t.counterparty_img}`} alt="" className="rounded-full" />
                          : <img src={`https://api.dicebear.com/9.x/open-peeps/png?seed=${t.id}&flip=${t.id % 2 == 0}`} alt="" className="rounded-full" />
                        }
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {t.counterparty_name}
                      </p>
                      <p className="text-xs text-gray-500">{t.method}</p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold text-sm ${t.type === "transfer" ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {t.type === "transfer" ? "+" : "-"}Rp
                    {t.total.toLocaleString("id-ID")}
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
