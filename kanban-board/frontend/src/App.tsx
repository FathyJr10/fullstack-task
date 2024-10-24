import Board from "./components/Board";
import Form from "./components/Form";

const App: React.FC = () => {
  return (
    <div className="bg-slate-400 min-h-screen p-2 ">
      <header className="flex flex-col items-center justify-center text-2xl text-white mb-8">
        <b>Kanban Board</b>
      </header>

      <div className="flex flex-row text-white justify-between	">
        <Form />
        {/* Board Section */}
        <Board />
      </div>
    </div>
  );
};

export default App;
