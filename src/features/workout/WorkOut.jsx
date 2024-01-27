import { useAppContext } from "../../context/AppContext";
import WorkOutList from "./WorkOutList";

const WorkOut = () => {
  const { workOut } = useAppContext();

  return (
    <div className="w-[100%] p-6 overflow-y-scroll">
      <h1 className="text-center text-2xl py-3 text-green-400 font-semibold">
        Your Workouts
      </h1>
      {workOut.map((data) => {
        return <WorkOutList key={data.id} data={data} />;
      })}
    </div>
  );
};

export default WorkOut;
