import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FormControl } from "react-bootstrap";
import {FaPlus} from "react-icons/fa6";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const { uid } = useParams();

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const applyFilters = async (role: string, name: string) => {
    if (role && name) {
      const users = await client.findUsersByRoleAndName(role, name);
      setUsers(users);
    } else if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);
    applyFilters(newRole, name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    applyFilters(role, newName);
  };
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
      <div>
        <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
          <FaPlus className="me-2"/>
          Create User
        </button>

        <h3>Users</h3>
        <FormControl
            onChange={handleNameChange}
            placeholder="Search people"
            className="float-start w-25 me-2 wd-filter-by-name"
        />
        <select
            value={role}
            onChange={handleRoleChange}
            className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>

        {/* Display filtered users */}
        <PeopleTable users={users}/>
      </div>
  );
}
