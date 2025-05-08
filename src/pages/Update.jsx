import React, { useEffect, useState } from "react";
import GoalHeader from "../components/GoalHeader";
import step from "../assets/amico.png";
import { Await, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { axiosinstace } from "../axiosinstace";


const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const[ isSubmiting, setIsubmiting]= useState(false)
  const redirect = useNavigate();
  const {goalId }= useParams()

  useEffect(() => {
    const getGoal = async () => {
      const { data } = await axiosinstace(`/${goalId}`);
      // console.log(data);
      setIsLoading(false)
      setTitle(data.goal.title)
      setDescription(data.goal.description)
      setProgress(data.goal.progress)
    };
    getGoal();
  }, [goalId]);


  const handleUpdate = async (e) =>{
    e.preventDefault()
    setIsubmiting (true)

    try {
      const {data} = await axiosinstace.patch(`/${goalId}`,{title: title.toLocaleLowerCase(), description, progress})
        if (data.success){
          redirect('/all')
        }
    } catch (error) {
      console.log(error);
      toast.error("you can not change to existing title")
      setIsubmiting(false)
      
      
    }
  }

  return (
    <>
      <GoalHeader heading="Progress" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container d-flex justify-content-between align-items-center mt-3 pb-3 gap-lg-2">
          <div className="main-form py-5 px-1 ps-lg-2 ps-xl-3 pe-xl-3 rounded-2">
            <ToastContainer />
            <form onSubmit={handleUpdate} className="create-form">
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Goal Title"
                  className="bg-transparent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mt-5">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Goal Description"
                  className="bg-transparent"
                  required
                ></textarea>
              </div>
              <div>
                <p>Update Progress</p>
                <input
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  type="number"
                  min="0"
                  max="100"
                  className="bg-transparent mt-2"
                  required
                />
              </div>
              <div className="mt-2">
                <button className="blue-bg p-2" disabled={isSubmiting}>{
                isSubmiting ? "updating..." : "update"}</button>
              </div>
            </form>
          </div>
          <div className="d-none d-lg-block main-img">
            <img src={step} alt="image of a step" />
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
