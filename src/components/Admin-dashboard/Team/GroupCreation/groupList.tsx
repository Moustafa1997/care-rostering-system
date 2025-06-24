import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ViewGroupList from "@/components/ui/admin/view-group-list";
import EditGroupList from "@/components/ui/admin/edit-group-list";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";

export default function GroupList() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'view', 'edit'
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleViewClick = () => {
    setCurrentView('view');
  };

  const handleEditClick = () => {
    setCurrentView('edit');
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Handle delete logic here
    setIsDeleteModalOpen(false);
    // Optionally reset to list view after delete
    setCurrentView('list');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  if (currentView === 'view') {
    return <ViewGroupList onBack={handleBackToList} />;
  }

  if (currentView === 'edit') {
    return <EditGroupList onBack={handleBackToList} />;
  }

  return (
    <>
      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-500 mb-4">
            Team /<span className="text-[#959595]">Group-List</span>
          </p>
          <h1 className="text-2xl text-gray-500 font-semibold mb-4">
            Group list
          </h1>
        </div>
        <div className="p-6 space-y-8 bg-white rounded-2xl">
          {/* Group detail */}
          <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
            <div className="col-span-8 flex justify-start gap-32">
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Group name
                </label>
                <span>physiotherapy Service</span>
              </div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Number of staff
                </label>
                <span>2</span>
              </div>
            </div>
            <div className="col-span-4 flex gap-2">
              <Button variant="outline" className="w-40" onClick={handleViewClick}>
                View
              </Button>
              <Button variant="outline" className="w-40" onClick={handleEditClick}>
                Edit
              </Button>
              <Button variant="outline" className="w-40" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 !mt-3 shadow">
            <div className="col-span-8 flex justify-start gap-32">
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Group name
                </label>
                <span>physiotherapy Service</span>
              </div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Number of staff
                </label>
                <span>10</span>
              </div>
            </div>
            <div className="col-span-4 flex gap-2">
              <Button variant="outline" className="w-40" onClick={handleViewClick}>
                View
              </Button>
              <Button variant="outline" className="w-40" onClick={handleEditClick}>
                Edit
              </Button>
              <Button variant="outline" className="w-40" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 !mt-3 shadow">
            <div className="col-span-8 flex justify-start gap-32">
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Group name
                </label>
                <span>physiotherapy Service</span>
              </div>
              <div>
                <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                  Number of staff
                </label>
                <span>10</span>
              </div>
            </div>
            <div className="col-span-4 flex gap-2">
              <Button variant="outline" className="w-40" onClick={handleViewClick}>
                View
              </Button>
              <Button variant="outline" className="w-40" onClick={handleEditClick}>
                Edit
              </Button>
              <Button variant="outline" className="w-40" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Are your sure you want to delete this group?"
        description="If you delete all data will be deleted"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}