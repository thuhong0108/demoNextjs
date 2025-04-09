"use client";

import { useState } from "react";

interface Task {
  id: string;
  name: string;
  status: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTask.trim()) {
      e.preventDefault();
      const task: Task = {
        id: "1",
        name: newTask.trim(),
        status: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US",{
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start gap-20">
      <div className="w-full absolute inset-0">
        <div className="bg-emerald-500">
          <img
            src="/images/header-bg-mountain-min_ZCo6NEYQT_KJ (2).png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-[900px] flex z-10 justify-between items-center">
       <div className="flex items-center gap-3">
       <img
          src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/todo-app-logo_begPyVFhCQy-.svg?updatedAt=1636031123870"
          alt="Todo Logo"
          className="w-[60px] h-[120px]" 
        />
          <button className="flex items-center gap-3 bg-[#00000021] py-0.5 rounded-[6px] px-2 tex-[#ffffff] text-[14px]" >Project
          <img
          src="./images/project-icon_1RFrQOmw6A.svg"
          alt="Todo Logo"
          className=""/>
          </button>
       </div>
       <div className="text-white text-[16px]">
        <p>{currentDate}</p>
       </div>
      </div>
      <div className="w-full flex justify-center items-center z-30 mt-[-120px]">
        <div className="shadow-lg shadow-black rounded-[12px] bg-white justify-center items-center gap-[15px] py-[10px]">
          <div className="bg-white flex justify-center items-center pl-[10px] gap-[15px] p-[20px] border-b-[1px] border-[#f0f0f4]">
            <h3 className="text-[24px] font-bold text-black">Tasks</h3>
            <div className="px-[10px] flex flex-col gap-[10px]">
              <input
                // onClick ={handleSubmit}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                type="text"
                placeholder="Type to add a new task"
                onKeyDown={addTask}
                
                className="w-[800px] h-[40px] rounded-[6px] border border-[#f0f0f4] pl-[10px] text-[16px] text-black bg-yellow-100"
              
              />
            </div>
          </div>
          {tasks.map((task) => (
            <div className="flex flex-col hover:bg-amber-100 relative group justify-between p-3">
            <div key={task.id}>
              <div className="flex px-[20px] justify-between">
                <div className="flex gap-[20px] items-center">
                  <div>
                    <button className="w-5 h-5 border rounded-full flex flex-col items-center justify-center transition-color" />
                  </div>
                  <p>{task.name}</p>
                </div >
                <div  className="hidden group-hover:block">
                <img
                  className="w-[30px] h-[30px]"
                  src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/drop-task-item_2g-tBVXMHAZ.svg"
                  alt="Delete"
                />
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
