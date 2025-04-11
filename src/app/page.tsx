"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Checkbox, Modal, Radio } from "antd";

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
  const [newTask, setNewTask] = useState<string>("");
  const [selectedProjectID, setSelectedProjectID] = useState<string>(
    projectDefault.id
  );
  const [selectedDeleteProjectId, setSelectedDeleteProjectId] = useState<
    string | null
  >(null);
  const handleDeleteProject = (id: string) => {
    setSelectedDeleteProjectId(id);
  };

  const deleteProject = (id: string) => {
    const updateProject = projects.filter((project) => project.id !== id);
    setProjects(updateProject);
  };

  const projectSelected = projects.find(
    (project) => project.id == selectedProjectID
  );

  const handleSelectProject = (id: string) => {
    setSelectedProjectID(id);
    handleCancel();
  };
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

  const task: Task = {
    id: uuidv4(),
    name: newTask.trim(),
    status: false,
  };

  const addTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && newTask.trim()) {
      e.preventDefault();

      const task: Task = {
        id: uuidv4(),
        name: newTask.trim(),
        status: false,
      };

      // Cập nhật project đang chọn
      const updatedProjects = projects.map((project) => {
        if (project.id === selectedProjectID) {
          return { ...project, tas: [...project.tas, task] };
        } else {
          return project;
        }
      });

      setProjects(updatedProjects);
      setNewTask("");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleTaskStatus = (taskId: string) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectID) {
        const updatedTasks = project.tas.map((task) =>
          task.id === taskId ? { ...task, status: !task.status } : task
        );
        return { ...project, tas: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };
  const todoTasks = projectSelected?.tas.filter((task) => !task.status) || [];
  const completedTasks =
    projectSelected?.tas.filter((task) => task.status) || [];

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start gap-20 md:px-[200px] bg-[#f0f0f4]">
      <div className="w-full absolute inset-0">
        <div className="bg-emerald-500">
          <img
            src="/images/header-bg-mountain-min_ZCo6NEYQT_KJ (2).png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex justify-between z-10 items-center w-full ">
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
        <div className="w-full shadow-lg shadow-black rounded-[12px] bg-white justify-center items-center gap-[15px] py-[10px]">
          <div className="bg-white flex justify-center items-center pl-[10px] gap-[15px] p-[20px] border-b-[1px] border-[#f0f0f4]">
            <h3 className="text-[24px] font-bold text-black">Tasks</h3>
            <div className="w-full  px-[10px] flex flex-col gap-[10px]">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                type="text"
                placeholder="Type to add a new task"
                onKeyDown={addTask}
                className="w-full rounded-[6px] border border-[#f0f0f4] px-[10px] py-[10px] text-[16px] text-black bg-yellow-100"
              />
            </div>
          </div>
            <div className="flex flex-col relative group justify-between p-3">
              {todoTasks.map((task) => (
                <div key={task.id}>
                  <div className="flex px-[20px] justify-between">
                    <div className="flex gap-[20px] items-center">
                      <div>
                        <button
                          className="w-5 h-5 border rounded-full text-[#000000] flex flex-col items-center justify-center transition-color"
                          onClick={() => toggleTaskStatus(task.id)}
                        />
                      </div>
                      <p className="text-[#000000] ">{task.name}</p>
                    </div>
                    <div className="">
                      <img
                        className="w-[30px] h-[30px] hidden group-hover:block"
                        src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/drop-task-item_2g-tBVXMHAZ.svg"
                        alt="Delete"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex hover:bg-green-50 relative group justify-between p-3"
                >
                  <div className="flex gap-[20px] items-center">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="w-5 h-5 border rounded-full flex items-center justify-center transition-colors bg-green-500"
                    >
                      ✓
                    </button>
                    <p className="line-through text-gray-500">{task.name}</p>
                  </div>
                </div>
              ))}
            </div>
         
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
          <div
            key={project.id}
            className="flex justify-between py-[10px] border-b border-[#f0f0f4] items-center relative group"
            onClick={() => handleSelectProject(project.id)}
          >
            <h4 className="text-[16px]">{project.name}</h4>

            {selectedDeleteProjectId === project.id &&
            project.id !== "id-default" ? (
              <div className="flex items-center gap-[5px] ">
                <p>Are you sure?</p>
                <button
                  className="ml-2 bg-red-800 p-1 rounded-[4px] text-amber-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="ml-2 bg-[#c1c1c1] p-1 rounded-[4px] text-amber-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDeleteProjectId(null);
                  }}
                >
                  cancel
                </button>
              </div>
            ) : (
              project.id !== "id-default" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project.id);
                  }}
                  className="hidden group-hover:block hover:opacity-80 group:"
                  title="Delete project"
                >
                  <img
                    src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/drop-project-icon_T7hUGuu4-.svg"
                    alt="Delete"
                    className="w-[20px] h-[20px] hover:opacity-80"
                  />
                </button>
              )
            )}
          </div>
        ))}
      </Modal>
    </div>
  );
}
