import React,{useState} from "react";

function ActivityList({ activities, deleteActivity, week, setEditingActivity }) {
  if (activities.length === 0) {
    return <p>No activities added yet.</p>;
  }

  // create derived sorted array (do NOT mutate state)
  const sortedActivities = [...activities].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  const [showEnd,setShowEnd]=useState(true);

  if(showEnd) return (
    <div className="text-center w-full">
      <table border="1" className="w-full">
        <thead>
        <tr>
          <th>Start Time</th>
          <th>End Time <button className="p-1 bg-blue-600" onClick={()=>setShowEnd(false)}>Hide End</button></th>
          <th>Name</th>
          <th>Group</th>
          <th>Edit</th>
          <th>Delete BTn</th>
        </tr>
        </thead>
        <tbody>
      {sortedActivities.map((act) => (
        <tr key={act._id}>
          <td>{act.startTime}</td> 
          <td>{act.endTime}</td>  
          <td>{act.name}</td>
          <td>{act.group}</td>
          <td>
            <button onClick={() => setEditingActivity(act)}>
              Edit
            </button>
          </td>
          <td>
            <button onClick={() => deleteActivity(act._id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
      </tbody>
      </table>
    </div>
  );
  return (
    <div className="text-center w-full">
      <table border="1" className="w-full">
        <thead>
        <tr>
          <th>Start Time <button className="p-1 bg-blue-600" onClick={()=>setShowEnd(true)}>Show End</button></th>
          <th>Name</th>
          <th>Group</th>
          <th>Delete BTn</th>
        </tr>
        </thead>
      <tbody>
      {sortedActivities.filter(act=>(act.week==week))
      .map((act) => (
        <tr key={act.id}>
          <td>{act.startTime}</td>   
          <td>{act.name}</td>
          <td>{act.group}</td>
          <td><button className="bg-blue-600" onClick={() => deleteActivity(act._id)}>
            Delete
          </button></td>
        </tr>
      ))}
      </tbody>
      </table>
    </div>
  );
}

export default ActivityList;