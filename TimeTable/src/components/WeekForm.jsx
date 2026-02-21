import React, { useState } from "react";

function WeekForm({
  weeks,
  setActiveW,
  setWeeks,
  activeWeek,
  setActivities,
  setActiveWeek,
  addGroup,
  addingGroup,
  setAddingGroup
}) {

  const [newWeek, setNewWeek] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [renameW, setRenameW] = useState("");

  // ---------------- DELETE WEEK ----------------
  const deleteW = (w) => {

    if (w === "daily") {
      alert("'Daily' cannot be deleted");
      return;
    }

    if (w === activeWeek) {
      setActiveWeek("daily");
    }

    setWeeks(prev =>
      prev.filter(week => week.key !== w)
    );

    setActivities(prev =>
      prev.filter(act => act.week !== w)
    );
  };

  // ---------------- ADD WEEK ----------------
  const addW = (e) => {

    e.preventDefault();

    if (!newWeek) {
      alert("Enter a valid name");
      return;
    }

    setWeeks(prev => [
      ...prev,
      {
        key: newWeek + Date.now(),
        week: newWeek
      }
    ]);

    setNewWeek("");
  };

  // ---------------- DUPLICATE WEEK ----------------
  const duplicate = (w) => {

    const dupWeekKey = w.key + "Copy" + Date.now();

    setWeeks(prev => [
      ...prev,
      {
        key: dupWeekKey,
        week: w.week + "Copy"
      }
    ]);

    // duplicate activities
    setActivities(prev => [
      ...prev,
      ...prev
        .filter(act => act.week === w.key)
        .map(act => ({
          ...act,
          week: dupWeekKey
        }))
    ]);
  };

  // ================= GROUP MODE =================
  if (addingGroup) {

    return (
      <div className="p-4 bg-yellow-200 border text-center">

        <h3 className="font-bold">Add Group</h3>

        <input
          type="text"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          className="border p-1"
        />

        <button
          type="button"
          className="ml-2 bg-blue-600 px-2 py-1 text-white"
          onClick={() => {

            if (!newGroup) return;

            addGroup(newGroup);
            setNewGroup("");
            setAddingGroup(false);

          }}
        >
          Add Group
        </button>

        <br /><br />

        <button
          type="button"
          onClick={() => setAddingGroup(false)}
        >
          Cancel
        </button>

      </div>
    );
  }

  // ================= WEEK MODE =================
  return (

    <form
      onSubmit={addW}
      className="p-4 text-center bg-yellow-200 border"
    >

      {weeks.map(week => (

        <div key={week.key} className="m-2">

          {renameW !== week.key ? (

            <>
              <div className="border bg-red-500 p-2">
                {week.week}
              </div>

              <div>

                <button
                  type="button"
                  className="bg-blue-600 px-2 py-1 text-white"
                  onClick={() => setRenameW(week.key)}
                >
                  Rename
                </button>

                <button
                  type="button"
                  className="bg-blue-600 px-2 py-1 text-white"
                  onClick={() => duplicate(week)}
                >
                  Duplicate
                </button>

                <button
                  type="button"
                  className="bg-blue-600 px-2 py-1 text-white"
                  onClick={() => deleteW(week.key)}
                >
                  Delete
                </button>

              </div>
            </>

          ) : (

            <>
              <input
                type="text"
                value={week.week}
                onChange={(e) => {

                  setWeeks(prev =>
                    prev.map(w =>
                      w.key === week.key
                        ? { ...w, week: e.target.value }
                        : w
                    )
                  );

                }}
              />

              <button
                type="button"
                onClick={() => setRenameW("")}
              >
                OK
              </button>
            </>

          )}

        </div>

      ))}

      <label>Add Week</label>

      <input
        type="text"
        value={newWeek}
        onChange={(e) => setNewWeek(e.target.value)}
      />

      <button type="submit">Add</button>

      <br />

      <button
        type="button"
        onClick={() => setActiveW(false)}
      >
        Close Form
      </button>

    </form>

  );
}

export default WeekForm;