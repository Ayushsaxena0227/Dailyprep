import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Activity } from "lucide-react";

const VisitorStatsChart = ({ BASE_URL, adminSecret }) => {
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/admin/visitors`, {
          headers: { "x-admin-secret": adminSecret },
        });
        setVisitors(data.visitors || []);
      } catch (err) {
        console.error("Failed to fetch visitors", err);
        setVisitors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVisitors();
  }, [BASE_URL, adminSecret]);

  // 📅 Format today's date
  const todayStr = new Date().toISOString().split("T")[0];
  const todayData = visitors.find((v) => v.date === todayStr);
  const todayCount = todayData ? todayData.count : 0;

  // (Optional) Yesterday's count
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const yesterdayData = visitors.find((v) => v.date === yesterdayStr);
  const yesterdayCount = yesterdayData ? yesterdayData.count : 0;

  const last7DaysData = () => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - idx));
      const dateStr = date.toISOString().split("T")[0];
      const match = visitors.find((v) => v.date === dateStr);
      return {
        name: date.toLocaleDateString("en", { weekday: "short" }),
        visitors: match ? match.count : 0,
      };
    });
  };

  if (loading) {
    return <div className="text-gray-400">Loading visitor stats...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
      {/* Top numeric stats */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-cyan-400" />
          Weekly Visitors
        </h3>

        {/* Today's Visitors Display */}
        <div className="text-right">
          <div className="text-sm text-gray-400">Today</div>
          <div className="text-2xl font-bold text-white">{todayCount}</div>
        </div>
      </div>

      {/* Optional yesterday display */}
      <div className="text-gray-400 text-sm mb-2">
        Yesterday: {yesterdayCount}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={last7DaysData()}>
          <defs>
            <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#06b6d4"
            fillOpacity={1}
            fill="url(#visitorsGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(VisitorStatsChart);
