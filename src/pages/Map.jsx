import MapView from "../features/map-features/MapView";
import Forms from "../features/forms/Forms";
import WorkOut from "../features/workout/WorkOut";
import { useAppContext } from "../context/AppContext";

const Map = () => {
  const { isFormOpen } = useAppContext();
  return (
    <div className="flex h-svh">
      <div className="flex flex-col w-[50%]">
        {isFormOpen ? <Forms /> : <></>}

        <WorkOut />
      </div>
      <MapView />
    </div>
  );
};

export default Map;
