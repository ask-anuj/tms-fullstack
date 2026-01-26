import { format } from 'date-fns';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Package, 
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

const getStatusBadge = (status) => {
  const badges = {
    PENDING: 'badge-pending',
    IN_TRANSIT: 'badge-in-transit',
    DELIVERED: 'badge-delivered',
    CANCELLED: 'badge-cancelled',
  };
  return badges[status] || 'badge-pending';
};

function ActionMenu({ shipment, onView, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 animate-fade-in">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(shipment);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(shipment);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(shipment);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function TileView({ shipments, onView, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          onClick={() => onView(shipment)}
          className="card p-5 hover:shadow-md transition-all duration-200 cursor-pointer group animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                {shipment.trackingNumber}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {shipment.customerName}
              </p>
            </div>
            <ActionMenu
              shipment={shipment}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            <span className={`badge ${getStatusBadge(shipment.status)}`}>
              {shipment.status.replace('_', ' ')}
            </span>
          </div>

          {/* Route */}
          <div className="space-y-2 mb-4">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">From</p>
                <p className="text-sm font-medium text-gray-900">
                  {shipment.origin}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">To</p>
                <p className="text-sm font-medium text-gray-900">
                  {shipment.destination}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            {shipment.carrier && (
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{shipment.carrier}</span>
              </div>
            )}
            {shipment.deliveryDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {format(new Date(shipment.deliveryDate), 'MMM dd, yyyy')}
                </span>
              </div>
            )}
            {shipment.cost && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-semibold">
                  ${shipment.cost.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}