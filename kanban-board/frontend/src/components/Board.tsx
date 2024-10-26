import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Importing the drag-and-drop context and components
import { deleteMember, fetchMembers, updateMember } from "../backendInt";
import Member from "./Member";
import Card from "./Card";
import Popup from "./editForm";

interface BoardProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>; //the state is keep updating its self
}

const Board: React.FC<BoardProps> = ({ members, setMembers }) => {
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

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
    setPopupOpen(true);
  };
  const handleSubmit = async (
    //for popUp menu to edit in it
    //make it optional to change data
    formData: Partial<{
      name: string;
      age: number;
      mobileNumber: string;
      email: string;
      status: string;
    }>
  ) => {
    if (editingMember) {
      await updateMember(editingMember.id, formData);
      setEditingMember(null);
      loadMembers();
      setPopupOpen(false);
    }
  };

  // Function to handle drag end
  const handleOnDrag = async (result: any) => {
    const { destination, source } = result;

    // If dropped outside the list or in the same position
    if (
      !destination ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    ) {
      return;
    }

    // Get the updated members location
    const updatedMembers = [...members];
    const [movedMember] = updatedMembers.splice(source.index, 1); //move member from column to another
    movedMember.status = destination.droppableId; // Update status based on the allocated column
    updatedMembers.splice(destination.index, 0, movedMember);

    setMembers(updatedMembers);

    // update the member status in the backend
    try {
      await updateMember(movedMember.id, { status: movedMember.status });
    } catch (error) {
      //error handling
      console.error("Error updating member status ", error);
      alert("Error updating member status ");
    }
  };

  const handleDelete = async () => {
    if (editingMember) {
      await deleteMember(editingMember.id);
      setEditingMember(null);
      loadMembers();
      setPopupOpen(false);
    }
  };

  // Filter members by status
  const getMembersByStatus = (status: string) =>
    members.filter((member) => member.status === status);

  return (
    <DragDropContext onDragEnd={handleOnDrag}>
      <div className="w-screen bg-blue-50 p-4 lg:p-8 rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-auto">
        {/* Unclaimed Column 
        droppableId used for updating the user statues by drag and drop*/}
        <Droppable droppableId="Unclaimed">
          {(provided) => (
            <div
              className="p-4 bg-blue-50 border-gray-300 border rounded-lg shadow-md max-h-fit"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="sticky top-0 bg-blue-50 mb-4 flex items-center space-x-2 justify-between z-10">
                <h3 className="text-black text-lg font-semibold">Unclaimed</h3>
                <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
                  {getMembersByStatus("Unclaimed").length}
                </h3>
              </div>
              <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[330px] overflow-y-auto relative">
                {getMembersByStatus("Unclaimed").map((member, index) => (
                  <Draggable
                    key={member.id}
                    draggableId={String(member.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          name={member.name}
                          age={member.age}
                          email={member.email}
                          mobileNumber={member.mobileNumber}
                          onEdit={() => handleEditClick(member)} // Trigger edit on card click
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        {/* First Contact Column */}
        <Droppable droppableId="First Contact">
          {(provided) => (
            <div
              className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
                <h3 className="text-black text-lg font-semibold">
                  First Contact
                </h3>
                <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
                  {getMembersByStatus("First Contact").length}
                </h3>
              </div>
              <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[330px] overflow-y-auto relative">
                {getMembersByStatus("First Contact").map((member, index) => (
                  <Draggable
                    key={member.id}
                    draggableId={String(member.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          name={member.name}
                          age={member.age}
                          email={member.email}
                          mobileNumber={member.mobileNumber}
                          onEdit={() => handleEditClick(member)} // Trigger edit on card click
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        {/* Preparing Work Offer Column */}
        <Droppable droppableId="Preparing Work Offer">
          {(provided) => (
            <div
              className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
                <h3 className="text-black text-lg font-semibold">
                  Preparing Work Offer
                </h3>
                <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
                  {getMembersByStatus("Preparing Work Offer").length}
                </h3>
              </div>
              <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[330px] overflow-y-auto relative">
                {getMembersByStatus("Preparing Work Offer").map(
                  (member, index) => (
                    <Draggable
                      key={member.id}
                      draggableId={String(member.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            name={member.name}
                            age={member.age}
                            email={member.email}
                            mobileNumber={member.mobileNumber}
                            onEdit={() => handleEditClick(member)} // Trigger edit on card click
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        {/* Therapists Column */}
        <Droppable droppableId="Sent to Therapists">
          {(provided) => (
            <div
              className="p-4 bg-paleBlue border-gray-300 border rounded-lg shadow-md max-h-fit"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="sticky top-0 bg-paleBlue mb-4 flex items-center space-x-2 justify-between z-10">
                <h3 className="text-black text-lg font-semibold">
                  Sent to Therapists
                </h3>
                <h3 className="text-xs bg-white text-black rounded-full px-2 py-1 font-bold">
                  {getMembersByStatus("Sent to Therapists").length}
                </h3>
              </div>
              <div className="space-y-4 pr-2 max-h-[330px] sm:max-h-[100px] md:max-h-[270px] lg:max-h-[330px] overflow-y-auto relative">
                {getMembersByStatus("Sent to Therapists").map(
                  (member, index) => (
                    <Draggable
                      key={member.id}
                      draggableId={String(member.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            name={member.name}
                            age={member.age}
                            email={member.email}
                            mobileNumber={member.mobileNumber}
                            onEdit={() => handleEditClick(member)} // Trigger edit on card click
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        {/* Popup menu for Editing Member */}
        <Popup
          isOpen={isPopupOpen}
          onClose={() => {
            setPopupOpen(false);
            setEditingMember(null);
          }}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          formData={{
            name: editingMember?.name || "",
            age: editingMember?.age || 0,
            email: editingMember?.email || "",
            mobileNumber: editingMember?.mobileNumber || "",
            status: editingMember?.status || "",
          }}
        />
      </div>
    </DragDropContext>
  );
};

export default Board;
