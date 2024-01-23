/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { formatTimestampToDate } from "../../helper/dateConverter";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { useAppContext } from "../../context/AppContext";

const WorkOutList = ({ data }) => {
  const { deleteWorkout, setEditId, setFormOpen } = useAppContext();
  const { id, distance, duration, steps, position } = data;

  return (
    <NavLink to={`?lat=${position.latitude}&lng=${position.longitude}`}>
      <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md mb-4 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {distance} km
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400">
              {duration} min
            </p>
          </div>

          <div className="text-md text-gray-500 dark:text-gray-400">
            {formatTimestampToDate(id)}
          </div>
        </div>
        <div>
          <p className="text-green-500 mt-2">{steps} steps👣</p>
          <div className="absolute inset-y-0 right-0 flex items-end mr-2 mb-2 space-x-2 gap-x-2">
            <div className="tooltip " data-tip="Delete">
              <IoMdTrash
                className="text-red-500 cursor-pointer  text-xl"
                onClick={() => deleteWorkout(id)}
              />
            </div>
            <div className="tooltip" data-tip="Edit">
              <IoMdCreate
                className="text-blue-500 cursor-pointer text-xl"
                onClick={() => {
                  setFormOpen(true);
                  setEditId(id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default WorkOutList;
