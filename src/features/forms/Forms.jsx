import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Forms = () => {
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const { workOut, updateWorkOut, setFormOpen, editId, setEditId, setWorkOut } =
    useAppContext();
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const isEditMode = editId || null;

  const editItem = workOut.find((data) => data.id === editId) ?? null;

  useEffect(() => {
    if (editId && isEditMode) {
      setDistance(editItem.distance);
      setDuration(editItem.duration);
      setSteps(editItem.steps);
      setNotes(editItem.notes);
    } else {
      setDistance("");
      setDuration("");
      setNotes("");
      setSteps("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, isEditMode]);

  function handleSubmit(e) {
    e.preventDefault();

    if (isEditMode) {
      //find the item from the data using id
      setWorkOut((workOut) => {
        const currData = [...workOut];
        const toUpdateItemIndex = currData.findIndex(
          (data) => data.id === editId
        );

        if (toUpdateItemIndex !== -1) {
          console.log();

          currData[toUpdateItemIndex] = {
            ...currData[toUpdateItemIndex],
            distance,
            duration,
            steps,
            notes,
          };
        }

        return currData;
      });

      setEditId("");
    }

    if (!isEditMode) {
      const newWorkOut = {
        id: Date.now(),
        duration,
        distance,
        steps,
        notes,
        position: {
          latitude: lat,
          longitude: lng,
        },
      };

      updateWorkOut(newWorkOut);
    }

    setDistance("");
    setDuration("");
    setSteps("");
    setFormOpen(false);
  }

  return (
    <div className="w-[100%] flex flex-col  items-center">
      <form className=" p-4 w-[100%]" onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Distance</span>
          </div>
          <input
            value={distance}
            onChange={(e) => {
              setDistance(e.target.value);
            }}
            type="text"
            placeholder="in kms"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Duration</span>
          </div>
          <input
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            type="text"
            placeholder="in min"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Steps</span>
          </div>
          <input
            type="text"
            value={steps}
            onChange={(e) => {
              setSteps(e.target.value);
            }}
            placeholder="per min"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="textarea textarea-bordered mt-4"
          placeholder="Add Note"
        ></textarea>

        <div>
          <input
            type="submit"
            value="Submit"
            className="btn bg-green-500 text-stone-100 capitalize font-sans m-3"
          />
        </div>
      </form>
    </div>
  );
};

export default Forms;
