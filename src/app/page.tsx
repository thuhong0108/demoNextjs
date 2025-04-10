"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "antd";

interface Task {
  id: string;
  name: string;
  status: boolean;
}
interface Project {
  id: string;
  name: string;
  tas: Task[];
}

const projectDefault: Project = {
  id: "id-default",
  name: "Default",
  tas: [],
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([projectDefault]);
  const [newProject, setNewProject] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedProjectID, setSelectedProjectID] = useState<string>(
    projectDefault.id
  );

  const projectSelected = projects.find(
    (project) => project.id == selectedProjectID
  );
  
  const handleSelectProject = (id: string) =>{
    setSelectedProjectID(id);
    setIsModalOpen(false);

  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addProject = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && newProject.trim()) {
      const project: Project = {
        id: uuidv4(),
        name: newProject.trim(),
        tas: [],
      };
      setProjects([...projects, project]);
      setNewProject("");
    }
  };

  const addTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && newTask.trim()) {
      e.preventDefault();
      const task: Task = {
        id: uuidv4(),
        name: newTask.trim(),
        status: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
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
          <button
            className="flex items-center gap-3 bg-[#00000021] py-0.5 rounded-[6px] px-2 text-amber-50 text-[14px]"
            onClick={showModal}
          >
            {projectSelected?.name}

            <img
              src="./images/project-icon_1RFrQOmw6A.svg"
              alt="Todo Logo"
              className=""
            />
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
                  </div>
                  <div className="hidden group-hover:block">
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
      
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        
      >
        <div className="flex gap-[20px] border-b-[1px] border-[#f0f0f4] py-[20px]">
          <h4 className="text-[22px]">Project</h4>
          <input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            type="text"
            placeholder="New project"
            onKeyDown={addProject}
            className="w-full h-[40px] rounded-[6px] border border-[#f0f0f4] pl-[10px] text-[16px] text-black bg-yellow-100"
          />
        </div>

        {projects.map((project) => (
          <div className="">
            <div
            key={project.id}
            className="py-[10px] border-b border-[#f0f0f4]"
            onClick={() => {
              handleSelectProject(project.id);
                        }}
          >
            <div>
              <h4 className="text-[16px]">{project.name}</h4>
            </div>
          </div>
          </div>
        ))}
      </Modal>
    </div>
  );
}
