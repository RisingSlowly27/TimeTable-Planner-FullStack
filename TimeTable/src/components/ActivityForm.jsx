import React, { useState, useEffect } from "react";

function ActivityForm({ addActivity, week, setActiveForm, editingActivity, setEditingActivity, updateActivity, groups, setAddingGroup, setActivities}) {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("Physical");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("23:59");
  useEffect(() => {
    if (editingActivity) {
      setName(editingActivity.name);
      setGroup(editingActivity.group);
      setStartTime(editingActivity.startTime);
      setEndTime(editingActivity.endTime);
    }
    else{
      setName("");
      setGroup("Physical");
      setStartTime("");
      setEndTime("23:59");
    }
  }, [editingActivity]);

  const submitActivity = (e) => {
    e.preventDefault();

    // Guard clause for invalid time
    if (endTime <= startTime) {
      alert("End time must be greater than start time");
      return;
    }

    const activity = {
      name,
      group,
      startTime,
      endTime,
      week
    };

    if (editingActivity) {
      updateActivity(editingActivity._id, activity);
      setEditingActivity(null);
    } else {
      addActivity(activity);
      setActivities(prev => [...prev, activity]);
    }
    // Reset form
    setName("");
    setGroup("Physical");
  };

  // Button disable condition
  const isDisabled = !name || !startTime || !endTime;

  return (
    <div className='col-span-2'>
    <form onSubmit={submitActivity} className="p-4 m text-center bg-yellow-200 border">
      <h3 className='font-bold'>{editingActivity?`Editing ${editingActivity.name}`:"Add Activity"}</h3>

      <label htmlFor="activityName">Activity Name</label>
      <br />
      <input
        id="activityName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <label htmlFor="groupAct">Group</label>
      <br />
      <select
        id="groupAct"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        {groups.map(g => (
          <option key={g._id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>
      <br />

      <button type="button" onClick={()=>setAddingGroup(true)}>Add New Group</button>
      <br /><br />
      <label htmlFor="startTime">Start Time  </label>
      <input
        id="startTime"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br /><br />

      <label htmlFor="endTime">End Time  </label>
      <input
        id="endTime"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <br /><br />

      <button type="submit" className="m-3 p-1" disabled={isDisabled}>
        {editingActivity?"Edit":"Add Activity"}
      </button>
      <button type="button" className="m-3 p-1" onClick={()=>setActiveForm(false)}>
        Close Form
      </button>
    </form>
    </div>
  );
}

export default ActivityForm;

