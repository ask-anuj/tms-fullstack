import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SHIPMENT, UPDATE_SHIPMENT } from '../graphql/queries';
import { X, Loader2, Save } from 'lucide-react';

export default function ShipmentForm({ shipment, onClose, onSuccess }) {
  const isEdit = !!shipment;
  
  const [formData, setFormData] = useState({
    trackingNumber: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    origin: '',
    destination: '',
    status: 'PENDING',
    carrier: '',
    weight: '',
    cost: '',
    pickupDate: '',
    deliveryDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (shipment) {
      setFormData({
        trackingNumber: shipment.trackingNumber || '',
        customerName: shipment.customerName || '',
        customerEmail: shipment.customerEmail || '',
        customerPhone: shipment.customerPhone || '',
        origin: shipment.origin || '',
        destination: shipment.destination || '',
        status: shipment.status || 'PENDING',
        carrier: shipment.carrier || '',
        weight: shipment.weight || '',
        cost: shipment.cost || '',
        pickupDate: shipment.pickupDate || '',
        deliveryDate: shipment.deliveryDate || '',
        notes: shipment.notes || '',
      });
    }
  }, [shipment]);

  const [createShipment, { loading: createLoading }] = useMutation(CREATE_SHIPMENT, {
    onCompleted: () => {
      onSuccess('Shipment created successfully!');
      onClose();
    },
    onError: (error) => {
      console.error('Create error:', error);
      setErrors({ submit: error.message });
    },
  });

  const [updateShipment, { loading: updateLoading }] = useMutation(UPDATE_SHIPMENT, {
    onCompleted: () => {
      onSuccess('Shipment updated successfully!');
      onClose();
    },
    onError: (error) => {
      console.error('Update error:', error);
      setErrors({ submit: error.message });
    },
  });

  const loading = createLoading || updateLoading;

  const validate = () => {
    const newErrors = {};

    if (!formData.trackingNumber.trim()) {
      newErrors.trackingNumber = 'Tracking number is required';
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.origin.trim()) {
      newErrors.origin = 'Origin is required';
    }
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    const input = {
      trackingNumber: formData.trackingNumber,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail || null,
      customerPhone: formData.customerPhone || null,
      origin: formData.origin,
      destination: formData.destination,
      status: formData.status,
      carrier: formData.carrier || null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      cost: formData.cost ? parseFloat(formData.cost) : null,
      pickupDate: formData.pickupDate || null,
      deliveryDate: formData.deliveryDate || null,
      notes: formData.notes || null,
    };

    if (isEdit) {
      updateShipment({ 
        variables: { id: shipment.id, input },
        refetchQueries: ['GetShipments']
      });
    } else {
      createShipment({ 
        variables: { input },
        refetchQueries: ['GetShipments']
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isEdit ? 'Edit Shipment' : 'Create New Shipment'}
            </h2>
            <p className="text-blue-100 mt-1">
              {isEdit ? 'Update shipment information' : 'Fill in the details below'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Tracking & Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                className={`input ${errors.trackingNumber ? 'border-red-500' : ''}`}
                placeholder="e.g., TRK001"
              />
              {errors.trackingNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.trackingNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={`input ${errors.customerName ? 'border-red-500' : ''}`}
                placeholder="e.g., John Doe"
              />
              {errors.customerName && (
                <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Email
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={`input ${errors.customerEmail ? 'border-red-500' : ''}`}
                placeholder="john@example.com"
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Phone
              </label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className="input"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          {/* Route Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origin <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className={`input ${errors.origin ? 'border-red-500' : ''}`}
                  placeholder="e.g., Mumbai, MH"
                />
                {errors.origin && (
                  <p className="text-red-500 text-xs mt-1">{errors.origin}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className={`input ${errors.destination ? 'border-red-500' : ''}`}
                  placeholder="e.g., Delhi, DL"
                />
                {errors.destination && (
                  <p className="text-red-500 text-xs mt-1">{errors.destination}</p>
                )}
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_TRANSIT">In Transit</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carrier
                </label>
                <input
                  type="text"
                  name="carrier"
                  value={formData.carrier}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., FedEx, UPS, Blue Dart"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 25.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g., 299.99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Date
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="input resize-none"
              placeholder="Additional information about the shipment..."
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-primary flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isEdit ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEdit ? 'Update Shipment' : 'Create Shipment'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}