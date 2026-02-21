import './App.css'
import React,{useState, useEffect} from 'react';
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import WeekForm from './components/WeekForm'


function App() {
  const [activities, setActivities] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [addingGroup, setAddingGroup] = useState(false);
  const [activeWeek,setActiveWeek]=useState('daily');

  const fetchActivities = async () => {

    setLoading(true);
    setError(null);

    try {

      const response = await fetch(
        `http://localhost:8000/activities?week=${activeWeek}`
      );

      const data = await response.json();

      setActivities(data);

    } catch (err) {

      console.log(err);
      setError("Failed to load activities");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchActivities();
  }, [activeWeek]);

  useEffect(() => {

    const fetchGroups = async () => {

      try {

        const response = await fetch(
          "http://localhost:8000/groups"
        );

        const data = await response.json();

        setGroups(data);

      } catch (err) {

        console.log("Failed to load groups", err);

      }
    };

    fetchGroups();

  }, []);

  const [weeks,setWeeks]=useState(()=>{
    const strWeek=localStorage.getItem("weeks");
    return strWeek ? JSON.parse(strWeek) : [{key:'daily',week:'Daily'}];
  });

  useEffect(() => {
    localStorage.setItem("weeks", JSON.stringify(weeks));
  }, [weeks]);

  const addActivity = async (activity) => {

    try {

      const response = await fetch(
        "http://localhost:8000/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(activity)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add activity");
      }

      const savedActivity = await response.json();

      // Update state with backend response
      setActivities(prev => [...prev, savedActivity]);

    } catch (error) {

      console.log("Add activity error:", error);
      setError("Could not add activity");
    }
  };

  const updateActivity = async (id, updatedData) => {

    try {

      const response = await fetch(
        `http://localhost:8000/activities/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedData)
        }
      );

      const updated = await response.json();

      setActivities(prev =>
        prev.map(act => act._id === id ? updated : act)
      );

    } catch (error) {

      console.log("Update error:", error);

    }
  };

  const deleteActivity = async (id) => {

  try {

    await fetch(
      `http://localhost:8000/activities/${id}`,
      {
        method: "DELETE"
      }
    );

    // Update UI after backend success
    setActivities(prev =>
      prev.filter(act => act._id !== id)
    );

  } catch (error) {

    console.log("Delete error:", error);

  }
};

const addGroup = async (groupName) => {

  try {

    const response = await fetch(
      "http://localhost:8000/groups",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: groupName })
      }
    );

    const newGroup = await response.json();

    setGroups(prev => [...prev, newGroup]);

  } catch (error) {

    console.log("Add group error:", error);

  }
};

  const changeWeek=(key)=>{
    setActiveWeek(key);
  }

  const [activeForm,setActiveForm]=useState(false);

  const [activeW,setActiveW]=useState(false);

  return (
    <>
      <h1 className="p-8 text-6xl font-bold text-center text-blue-600 [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000]">Daily Timetable</h1>
      <div className='p-4 grid grid-cols-12 gap-8 justify-items-center'>
        <div className='colspan-1'></div>
        <div className='h-fit w-full p-4 col-span-7 m-3 p-3 bg-yellow-200 justify-items-center border'>
          <div className='text-center'>{weeks.map(w => (
            <button key={w.key} className={`m-2 p-3 bg-${w.key===activeWeek?'red-500':'blue-600'} border`} onClick={()=>changeWeek(w.key)}>{w.week}</button>
          ))}</div>
          {loading ? (
            <div className="p-6 text-center font-semibold">
              Loading activities...
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">
              {error}
            </div>
          ) : (
            <ActivityList
              activities={activities}
              deleteActivity={deleteActivity}
              week={activeWeek} 
              setEditingActivity={setEditingActivity}
            />
          )}
        </div>
        <div className='w-full col-span-2 text-center'>
        <button className='w-1/2 m-2 p-2 bg-red-500 border col-span-1' onClick={()=>{setActiveForm(true);setEditingActivity(null)}}>Add Activity</button>
        {(activeForm || editingActivity)?<ActivityForm addActivity={addActivity} week={activeWeek} setActiveForm={setActiveForm} editingActivity={editingActivity} setEditingActivity={setEditingActivity} updateActivity={updateActivity} groups={groups} setAddingGroup={setAddingGroup}/>:null}
        </div>
        <div className='w-full col-span-2 text-center'>
          <button onClick={()=>{setActiveW(true);setAddingGroup(false);}} className='max-h-10 w-1/2 m-2 p-2 bg-red-500 border col-span-2'>Add/Delete Week</button>
          <div className={(activeW || addingGroup)?"block":"hidden"}><WeekForm weeks={weeks} setActiveW={setActiveW} setWeeks={setWeeks} activeWeek={activeWeek} setActivities={setActivities} setActiveWeek={setActiveWeek} addGroup={addGroup} addingGroup={addingGroup} setAddingGroup={setAddingGroup}/></div>
        </div>
      </div>
    </>
  );
}

export default App
