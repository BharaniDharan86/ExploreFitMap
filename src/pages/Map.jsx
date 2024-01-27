import MapView from "../features/map-features/MapView";
import Forms from "../features/forms/Forms";
import WorkOut from "../features/workout/WorkOut";
import { useAppContext } from "../context/AppContext";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const Map = () => {
  const { isFormOpen, sideBarOpen, setSideBarOpen } = useAppContext();
  return (
    <div className="h-fit">
      <MapView />
      <div className="h-svh">
        <div className="flex items-end justify-end ">
          <button onClick={() => setSideBarOpen((val) => !val)} className="p-3">
            {sideBarOpen ? (
              <HiChevronUp className="text-xl text-stone-50 bg-slate-600 " />
            ) : (
              <HiChevronDown className="text-xl text-stone-50 bg-slate-600" />
            )}
          </button>
        </div>
        {isFormOpen ? <Forms /> : <></>}
        <WorkOut />
      </div>
    </div>
  );
};

export default Map;
