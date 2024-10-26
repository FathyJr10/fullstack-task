import { useEffect, useState } from "react";
import Board from "./components/Board";
import Form from "./components/Form";
import Member from "./components/Member";
import { fetchMembers } from "./backendInt";
//parent component

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  // Load members initially
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const membersData = await fetchMembers();
        setMembers(membersData);
      } catch (error) {
        console.error("Error loading members:", error);
      }
    };

    loadMembers();
  }, []);

  const addMember = (newMember: Member) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };
  return (
    <div className="bg-slate-400 min-h-screen p-2 ">
      <header className="flex flex-col items-center justify-center text-2xl text-white mb-8">
        <b>Kanban Board</b>
      </header>

      <div className="flex flex-row text-white justify-between	">
        <Form addMember={addMember} />
        <Board members={members} setMembers={setMembers} />
      </div>
    </div>
  );
};

export default App;
