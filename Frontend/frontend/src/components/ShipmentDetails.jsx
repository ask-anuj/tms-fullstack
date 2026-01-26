import { format } from 'date-fns';
import { X, MapPin, Calendar, Package, DollarSign, User, Phone, Mail } from 'lucide-react';

const getStatusBadge = (status) => {
  const badges = {
    PENDING: 'badge-pending',
    IN_TRANSIT: 'badge-in-transit',
    DELIVERED: 'badge-delivered',
    CANCELLED: 'badge-cancelled',
  };
  return badges[status] || 'badge-pending';
};

export default function ShipmentDetail({ shipment, onClose }) {
  if (!shipment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {shipment.trackingNumber}
            </h2>
            <p className="text-blue-100 mt-1">Shipment Details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Status */}
          <div className="mb-6">
            <span className={`badge text-base ${getStatusBadge(shipment.status)}`}>
              {shipment.status.replace('_', ' ')}
            </span>
          </div>

          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Customer Name</p>
                  <p className="font-medium text-gray-900">{shipment.customerName}</p>
                </div>
              </div>
              {shipment.customerEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{shipment.customerEmail}</p>
                  </div>
                </div>
              )}
              {shipment.customerPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{shipment.customerPhone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Route Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Route Information
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-0.5 h-16 bg-gray-300"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex-1 space-y-8">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Origin</p>
                    <p className="font-semibold text-gray-900 text-lg">{shipment.origin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Destination</p>
                    <p className="font-semibold text-gray-900 text-lg">{shipment.destination}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipment Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {shipment.carrier && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-gray-400" />
                    <p className="text-xs text-gray-500">Carrier</p>
                  </div>
                  <p className="font-semibold text-gray-900">{shipment.carrier}</p>
                </div>
              )}
              {shipment.weight && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-gray-400" />
                    <p className="text-xs text-gray-500">Weight</p>
                  </div>
                  <p className="font-semibold text-gray-900">{shipment.weight} kg</p>
                </div>
              )}
              {shipment.cost && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <p className="text-xs text-gray-500">Cost</p>
                  </div>
                  <p className="font-semibold text-gray-900">${shipment.cost.toFixed(2)}</p>
                </div>
              )}
              {shipment.pickupDate && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <p className="text-xs text-gray-500">Pickup Date</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {format(new Date(shipment.pickupDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              )}
              {shipment.deliveryDate && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <p className="text-xs text-gray-500">Delivery Date</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {format(new Date(shipment.deliveryDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {shipment.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
              <p className="text-gray-600 bg-gray-50 rounded-lg p-4">{shipment.notes}</p>
            </div>
          )}

          {/* Metadata */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Created At</p>
                <p className="font-medium text-gray-900">
                  {shipment.createdAt && format(new Date(shipment.createdAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              {shipment.createdBy && (
                <div>
                  <p className="text-gray-500">Created By</p>
                  <p className="font-medium text-gray-900">{shipment.createdBy}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <button className="btn btn-primary">
            Edit Shipment
          </button>
        </div>
      </div>
    </div>
  );
}