import React from 'react';
import * as FiIcons from 'react-icons/fi';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
// const FiSearch = FiIcons.FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiSettings = FiIcons.FiSettings as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiBell = FiIcons.FiBell as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiUser = FiIcons.FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const AdminMainPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Header */}
        <AdminHeader />

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
          <h3 className="font-bold mb-2">신규 가입자(최근 3개월)</h3>
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
