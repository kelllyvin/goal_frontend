import SingleGoal from "../components/SingleGoal";
import GoalHeader from "../components/GoalHeader";
import Loading from "../components/Loading";
import { useFetch } from "../Hooks/useFetch";
import Empty from "../components/Empty";
import ErrorFetch from "../components/ErrorFetch";
import Goals from "../data/goals";
import { useState,useEffect } from "react";
import { axiosinstace } from "../axiosinstace";

const Complete = () => {

   const [isLoading, setisLoading] = useState(true);
   const [goals, setGoals] = useState({});

   const getGoals = async () => {
     const { data } = await axiosinstace("/completed");
     setisLoading(false);
     setGoals(data.goals);
   };

   useEffect(() => {
     getGoals();
   }, []);

   if (isLoading) {
     return <Loading />;
   }

   if (!isLoading && goals.length === 0) {
     return <Empty />;
   }

  const completedGoals = Goals.filter((g) => g.progress === 100);
  return (
    <div className="container mt-2">
      <GoalHeader heading="Completed" />

      <div>
        {goals &&
          goals.map((g) => {
            return <SingleGoal key={g._id} {...g} />;
          })}
      </div>
    </div>
  );
};

export default Complete;
