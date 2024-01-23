/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { dummyData } from "../dummyData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [workOut, setWorkOut] = useState(dummyData);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState("");

  //add new workout
  function updateWorkOut(newWorkOut) {
    setWorkOut((curr) => [...curr, newWorkOut]);
  }
  //deleting workout
  function deleteWorkout(id) {
    setWorkOut((data) => data.filter((el) => el.id !== id));
  }

  return (
    <AppContext.Provider
      value={{
        workOut,
        setWorkOut,
        updateWorkOut,
        isFormOpen,
        setFormOpen,
        deleteWorkout,
        editId,
        setEditId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
