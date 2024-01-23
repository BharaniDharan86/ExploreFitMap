import { useAppContext } from "../../context/AppContext";
import WorkOutList from "./WorkOutList";

const WorkOut = () => {
  const { workOut } = useAppContext();

  return (
    <div className="w-[100%] p-6 overflow-y-scroll">
      {workOut.map((data) => {
        return <WorkOutList key={data.id} data={data} />;
      })}
    </div>
  );
};

export default WorkOut;
