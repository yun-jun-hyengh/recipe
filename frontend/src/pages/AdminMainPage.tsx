import React from 'react';
import * as FiIcons from 'react-icons/fi';

const FiSearch = FiIcons.FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FiSettings = FiIcons.FiSettings as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FiBell = FiIcons.FiBell as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FiUser = FiIcons.FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const AdminMainPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-xl font-bold text-indigo-600">Metis</div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            "Dashboard","Analytics","Users","Products","Orders",
            "Forms","Elements","Reports","Messages","Calendar","Files"
          ].map((item, i) => (
            <div key={i} className={`p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition ${item==="Dashboard"?"bg-indigo-100 text-indigo-600":""}`}>
              {item}
            </div>
          ))}
          <div className="pt-6 text-xs text-gray-400 uppercase">Admin</div>
          {["Settings","Security","Help & Support"].map((item, i) => (
            <div key={i} className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">{item}</div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <input placeholder="Search... (Ctrl+K)" className="w-72 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <FiSearch className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex items-center space-x-4">
            <FiSettings className="w-5 h-5 text-gray-500 cursor-pointer" />
            <FiBell className="w-5 h-5 text-gray-500 cursor-pointer" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <FiUser className="w-5 h-5 text-gray-500" />
              <span>John Doe</span>
            </div>
          </div>
        </header>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { title: "Total Users", value: "12,428", change: "+12.5%" },
            { title: "Revenue", value: "$54,320", change: "+8.2%" },
            { title: "Orders", value: "1,852", change: "-2.1%" },
            { title: "Avg. Response", value: "2.3s", change: "+5.4%" },
          ].map((stat, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-sm text-gray-400">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p className={`text-xs ${stat.change.startsWith("-")?"text-red-600":"text-green-600"}`}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
            <h3 className="font-bold mb-2">Revenue Overview</h3>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">[Graph Placeholder]</div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <h3 className="font-bold mb-2">Recent Activity</h3>
            {[
              "New user registered (2m ago)",
              "Order #1234 completed (5m ago)",
              "Server maintenance scheduled (1h ago)"
            ].map((act, i) => <div key={i} className="text-sm text-gray-600">{act}</div>)}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-bold mb-2">User Growth (Last 7 Days)</h3>
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">[Bar Chart Placeholder]</div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-bold mb-2">Order Status Distribution</h3>
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">[Pie Chart Placeholder]</div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-bold mb-2">Storage Status</h3>
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">[Progress Circle Placeholder]</div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-md rounded-lg mt-6 p-4">
          <h3 className="font-bold mb-2">Recent Orders</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["#1000","Sarah Wilson","$462.14","Cancelled","02/08/2025"],
                ["#7002","Sarah Wilson","$299.90","Shipped","02/08/2025"],
                ["#6802","John Doe","$442.68","Shipped","02/08/2025"],
                ["#5034","Jane Smith","$223.79","Completed","02/08/2025"],
                ["#9102","Mike Johnson","$96.73","Cancelled","04/08/2025"],
              ].map((order, i) => (
                <tr key={i} className="border-t">{order.map((col, j) => <td key={j} className="py-2">{col}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminMainPage;
