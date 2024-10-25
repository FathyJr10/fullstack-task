import React, { useEffect, useState } from "react";
import { deleteMember, fetchMembers, updateMember } from "../backendInt";
import Member from "./member";
import Card from "./Card";
import Popup from "./editForm";

const Board: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadMembers = async () => {
    try {
      const membersData = await fetchMembers();
      setMembers(membersData);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setModalOpen(true);
  };

  const handleSubmit = async (
    formData: Partial<{
      name: string;
      age: number;
      mobileNumber: string;
      email: string;
    }>
  ) => {
    if (editingMember) {
      await updateMember(editingMember.id, formData);
      setEditingMember(null);
      loadMembers();
      setModalOpen(false);
    }
  };

  // Filter members by status
  const unclaimedMembers = members.filter(
    (member) => member.status === "Unclaimed"
  );
  const firstContactMembers = members.filter(
    (member) => member.status === "First Contact"
  );
  const preparingWorkOfferMembers = members.filter(
    (member) => member.status === "Preparing Work Offer"
  );
  const sentToTherapistsMembers = members.filter(
    (member) => member.status === "Sent to Therapists"
  );
  const handleDelete = async () => {
    if (editingMember) {
      await deleteMember(editingMember.id); // Call the delete function
      setEditingMember(null);
      loadMembers(); // Refresh member list after deletion
      setModalOpen(false); // Close modal
    }
  };

  return (
    <div className="w-screen bg-blue-50 p-4 lg:p-8 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-auto">
      {/* Unclaimed Column */}
      <div className="p-4 bg-blue-50 border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-blue-50 mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">Unclaimed</h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            {unclaimedMembers.length}
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[340px] overflow-y-auto relative">
          {unclaimedMembers.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              age={member.age}
              email={member.email}
              mobileNumber={member.mobileNumber}
              onEdit={() => handleEditClick(member)}
            />
          ))}
        </div>
      </div>

      {/* First Contact Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">First Contact</h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            {firstContactMembers.length}
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[340px] overflow-y-auto relative">
          {firstContactMembers.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              age={member.age}
              email={member.email}
              mobileNumber={member.mobileNumber}
              onEdit={() => handleEditClick(member)}
            />
          ))}
        </div>
      </div>

      {/* Preparing Work Offer Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">
            Preparing Work Offer
          </h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            {preparingWorkOfferMembers.length}
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[340px] overflow-y-auto relative">
          {preparingWorkOfferMembers.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              age={member.age}
              email={member.email}
              mobileNumber={member.mobileNumber}
              onEdit={() => handleEditClick(member)}
            />
          ))}
        </div>
      </div>

      {/* Sent to Therapists Column */}
      <div className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit">
        <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
          <h3 className="text-black text-lg font-semibold">
            Sent to Therapists
          </h3>
          <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
            {sentToTherapistsMembers.length}
          </h3>
        </div>

        <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[340px] overflow-y-auto relative">
          {sentToTherapistsMembers.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              age={member.age}
              email={member.email}
              mobileNumber={member.mobileNumber}
              onEdit={() => handleEditClick(member)}
            />
          ))}
        </div>
      </div>

      {/* Modal for Editing Member */}
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingMember(null); // Clear editing state
        }}
        onDelete={handleDelete} // Pass the handleDelete function
        onSubmit={handleSubmit}
        formData={{
          name: editingMember?.name || "",
          age: editingMember?.age || 0,
          email: editingMember?.email || "",
          mobileNumber: editingMember?.mobileNumber || "",
        }}
      />
    </div>
  );
};

export default Board;
