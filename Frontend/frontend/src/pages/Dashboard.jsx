import { useQuery } from '@apollo/client';
import { GET_SHIPMENTS } from '../graphql/queries';
import Layout from '../components/Layout';
import { 
  Package, 
  TruckIcon, 
  CheckCircle, 
  Clock,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function StatCard({ icon: Icon, title, value, change, color }) {
  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {change && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function RecentShipment({ shipment, onClick }) {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_TRANSIT: 'bg-blue-100 text-blue-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };

  return (
    <div
      onClick={() => onClick(shipment)}
      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-100 last:border-0"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-semibold text-gray-900">{shipment.trackingNumber}</span>
          <span className={`badge ${statusColors[shipment.status]}`}>
            {shipment.status.replace('_', ' ')}
          </span>
        </div>
        <p className="text-sm text-gray-600">{shipment.customerName}</p>
        <p className="text-xs text-gray-500 mt-1">
          {shipment.origin} → {shipment.destination}
        </p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  
  const { data } = useQuery(GET_SHIPMENTS, {
    variables: { page: 0, size: 5, sortBy: 'createdAt', sortDir: 'DESC' },
  });

  const allShipments = useQuery(GET_SHIPMENTS, {
    variables: { page: 0, size: 1000 },
  });

  const shipments = allShipments.data?.shipments?.content || [];
  const recentShipments = data?.shipments?.content || [];

  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'PENDING').length,
    inTransit: shipments.filter(s => s.status === 'IN_TRANSIT').length,
    delivered: shipments.filter(s => s.status === 'DELIVERED').length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your shipment overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Package}
            title="Total Shipments"
            value={stats.total}
            change="+12% from last month"
            color="bg-blue-600"
          />
          <StatCard
            icon={Clock}
            title="Pending"
            value={stats.pending}
            color="bg-yellow-600"
          />
          <StatCard
            icon={TruckIcon}
            title="In Transit"
            value={stats.inTransit}
            color="bg-purple-600"
          />
          <StatCard
            icon={CheckCircle}
            title="Delivered"
            value={stats.delivered}
            change="+8% this week"
            color="bg-green-600"
          />
        </div>

        {/* Recent Shipments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Shipments
                </h2>
                <button
                  onClick={() => navigate('/shipments')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {recentShipments.map((shipment) => (
                  <RecentShipment
                    key={shipment.id}
                    shipment={shipment}
                    onClick={() => navigate('/shipments')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full btn btn-primary justify-center">
                Create Shipment
              </button>
              <button className="w-full btn btn-secondary justify-center">
                Track Shipment
              </button>
              <button className="w-full btn btn-secondary justify-center">
                Generate Report
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Status Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-medium">{stats.pending}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">In Transit</span>
                  <span className="font-medium">{stats.inTransit}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Delivered</span>
                  <span className="font-medium">{stats.delivered}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}