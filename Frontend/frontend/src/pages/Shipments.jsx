import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SHIPMENTS, DELETE_SHIPMENT } from '../graphql/queries';
import { LayoutGrid, Table, Plus, Filter, Download, Search } from 'lucide-react';
import GridView from '../components/GridView';
import TileView from '../components/TileView';
//import ShipmentDetail from '../components/ShipmentDetail';
import ShipmentDetail from '../components/ShipmentDetails';
import ShipmentForm from '../components/ShipmentForm';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import Layout from '../components/Layout';

export default function Shipments() {
  const [viewMode, setViewMode] = useState('tile');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);
  const [deletingShipment, setDeletingShipment] = useState(null);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({
    page: 0,
    size: 12,
    sortBy: 'createdAt',
    sortDir: 'DESC',
    status: null,
    search: '',
  });

  const { loading, error, data, refetch } = useQuery(GET_SHIPMENTS, {
    variables: filters,
  });

  const [deleteShipmentMutation, { loading: deleteLoading }] = useMutation(DELETE_SHIPMENT, {
    onCompleted: () => {
      showToast('Shipment deleted successfully!', 'success');
      setDeletingShipment(null);
      refetch();
    },
    onError: (error) => {
      showToast(`Error: ${error.message}`, 'error');
      setDeletingShipment(null);
    },
  });

  const shipments = data?.shipments?.content || [];
  const totalPages = data?.shipments?.totalPages || 0;
  const totalElements = data?.shipments?.totalElements || 0;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleView = (shipment) => {
    setSelectedShipment(shipment);
  };

  const handleCreate = () => {
    setEditingShipment(null);
    setShowForm(true);
  };

  const handleEdit = (shipment) => {
    setEditingShipment(shipment);
    setShowForm(true);
  };

  const handleDelete = (shipment) => {
    setDeletingShipment(shipment);
  };

  const confirmDelete = () => {
    if (deletingShipment) {
      deleteShipmentMutation({
        variables: { id: deletingShipment.id },
        refetchQueries: ['GetShipments'],
      });
    }
  };

  const handleFormSuccess = (message) => {
    showToast(message, 'success');
    refetch();
  };

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 0 });
  };

  const handleStatusFilter = (status) => {
    setFilters({ ...filters, status: status === 'ALL' ? null : status, page: 0 });
  };

  const handleExport = () => {
    showToast('Export feature coming soon!', 'info');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shipments
            </h1>
            <p className="text-gray-500 mt-1">
              {totalElements} total shipments
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Shipment
          </button>
        </div>

        {/* Filters & Actions */}
        <div className="card p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by tracking number, customer..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.search}
                onChange={handleSearch}
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleStatusFilter(e.target.value)}
                value={filters.status || 'ALL'}
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="IN_TRANSIT">In Transit</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>

              <button
                onClick={handleExport}
                className="btn btn-secondary flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-200'
                }`}
                title="Grid View"
              >
                <Table className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('tile')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'tile'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-200'
                }`}
                title="Tile View"
              >
                <LayoutGrid className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card p-6 bg-red-50 border-red-200">
            <p className="text-red-600">Error loading shipments: {error.message}</p>
          </div>
        )}

        {/* Shipments View */}
        {!loading && !error && (
          <>
            {viewMode === 'grid' ? (
              <GridView
                shipments={shipments}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <TileView
                shipments={shipments}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                  disabled={filters.page === 0}
                  className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {filters.page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                  disabled={filters.page >= totalPages - 1}
                  className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && shipments.length === 0 && (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No shipments found
            </h3>
            <p className="text-gray-500 mb-6">
              {filters.search || filters.status
                ? 'Try adjusting your filters'
                : 'Get started by creating your first shipment'}
            </p>
            <button onClick={handleCreate} className="btn btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Create Shipment
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedShipment && (
        <ShipmentDetail
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
        />
      )}

      {/* Form Modal */}
      {showForm && (
        <ShipmentForm
          shipment={editingShipment}
          onClose={() => {
            setShowForm(false);
            setEditingShipment(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation */}
      {deletingShipment && (
        <ConfirmDialog
          title="Delete Shipment"
          message={`Are you sure you want to delete shipment "${deletingShipment.trackingNumber}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          onConfirm={confirmDelete}
          onCancel={() => setDeletingShipment(null)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Layout>
  );
}