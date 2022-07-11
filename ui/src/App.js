import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import CreateTask from "./components/CreateTask.js";
import TaskDetails from "./components/TaskDetails.js";
import TaskTable from "./components/TaskTable.js";
import Profile from "./components/Profile.js";
import AdminMenu from "./components/AdminMenu.js";
import Header from "./components/Header.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import TaskCard from "./components/TaskCard.js";
import ViewModifyOrgs from "./components/ViewModifyOrgs.js";
import ViewModifyRoles from "./components/ViewModifyRoles.js";
import CreateOrgs from "./components/CreateOrgs.js";
import ModifyOrgs from "./components/ModifyOrgs.js";
import ModifyRoles from "./components/ModifyRoles.js";
const TaskContext = createContext(null);

function App() {
  const [userId, setUserId] = useState(null); //set this in Login (start as null)
  const [isAdmin, setIsAdmin] = useState(false);
  const [userOrg, setUserOrg] = useState(null); //set this in Login (start as null)

  const TaskContextValues = {
    userId,
    setUserId,
    isAdmin,
    setIsAdmin,
    userOrg,
    setUserOrg,
  };

  return (
    <div>
      <Router>
        <TaskContext.Provider value={TaskContextValues}>
          <Header />
          <Routes>
            {
            isAdmin ?

              <>
                {/* admin routes only */}
                <Route path="/admin" element={<AdminMenu />}/>
                <Route path="/admin/roles" element={<ViewModifyRoles />}/>
                <Route path="/admin/roles/edit/:id" element={<ModifyRoles />}/>
                <Route path="/admin/orgs" element={<ViewModifyOrgs />}/>
                <Route path="/admin/orgs/create" element={<CreateOrgs />}/>
                <Route path="/admin/orgs/edit/:id" element={<ModifyOrgs />}/>
                <Route path="/*" element={<Dashboard user={false} />}/>
              </>
              : <></>
            }
            {

            userId !== null ?

              <>
                {/* all user routes */}
                <Route path="/" element={<Dashboard user={true} />}/>
                <Route path="/unit" element={<Dashboard user={false} />}/>
                <Route path="/tasks/add" element={<CreateTask type={"task"} />}/>
                <Route path="/tasks/:task" element={<TaskDetails />}/>
                <Route path="/reports" element={<TaskTable isArchive={false} />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/archive" element={<TaskTable isArchive={true} />}/>
                <Route path = '/*' element = {<Dashboard user = {true}/>}></Route>
              </>
            :

              <>
                {/* unauthenticated routes */}
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path = '/*' element = {<Login/>}/>
              </>
            }
          </Routes>
        </TaskContext.Provider>
      </Router>
    </div>
  );
}

export { TaskContext, App };

/*
{
        isAdmin ?

          <Router>
            <Header/>
              <Routes>
                <Route path = '/tasks' element ={<Dashboard user = {false}/>}> </Route>
                <Route path = '/tasks/:user' element ={<Dashboard user = {false}/>}> </Route>
                <Route path = '/tasks/add' element ={<AddPage type = {"task"}/>}> </Route>
                <Route path = '/tasks/details/:task' element ={<TaskDetails/>}> </Route>
                <Route path = '/tasks/weekly' element ={<TaskTable/>}> </Route>
                <Route path = '/tasks/weekly/:user' element ={<TaskTable/>}> </Route>
                <Route path = '/profile' element ={<Profile/>}> </Route>
                <Route path = '/menu' element ={<AdminMenu/>}> </Route>
                <Route path = '/organizations' element ={<TaskTable/>}> </Route>
                <Route path = '/roles' element ={<TaskTable/>}> </Route>
                <Route path = '/*' element = {<Posts user = {false}/>}></Route>
              </Routes>
          </Router>

        :

        userId !== null ?

            <Router>
            <Header/>
              <Routes>
                <Route path = '/tasks' element ={<Dashboard user = {false}/>}> </Route>
                <Route path = '/tasks/:user' element ={<Dashboard user = {false}/>}> </Route>
                <Route path = '/tasks/add' element ={<AddPage type = {"task"}/>}> </Route>
                <Route path = '/tasks/details/:task' element ={<TaskDetails/>}> </Route>
                <Route path = '/tasks/weekly' element ={<TaskTable/>}> </Route>
                <Route path = '/tasks/weekly/:user' element ={<TaskTable/>}> </Route>
                <Route path = '/profile' element ={<Profile/>}> </Route>
                <Route path = '/*' element = {<Dashboard user = {false}/>}></Route>
              </Routes>
          </Router>

          :

          <Router>
            <Header/>
            <Routes>
                <Route path = '/' element ={<SignUp/>}> </Route>
                <Route path = '/login' element ={<Login/>}> </Route>
                <Route path = '/*' element = {<Login/>}></Route>
          </Routes>
        </Router>
      }
*/
