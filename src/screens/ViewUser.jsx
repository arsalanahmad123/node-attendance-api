import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [attendance, setAttendance] = useState({
    status: "present",
    date: "",
  });

  const [showUpdateForm, setShowUpdateForm] = useState({
    show: true,
    id: "",
  });

  const createAttendance = async (e) => {
    e.preventDefault();

    if (!attendance.status.trim()) {
      alert("Status cannot be empty");
      return;
    }
    const response = await fetch(
      `http://localhost:5000/api/v1/users/${id}/attendance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      fetchUser();
      alert("Attendance created successfully");
    } else {
      alert(json.message);
    }
  };

  const attendanceOptions = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
  ];

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/users/${id}`);
    const json = await response.json();
    if (json.success) {
      setUser(json.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleUpdateForm = (id) => {
    setShowUpdateForm({
      show: false,
      id: id,
    });
    updateAttendanceStatus(id);
  };

  const updateAttendanceStatus = async (e, id) => {
    e.preventDefault();
    console.log(`Attendance id: ${id}`);
  };

  return (
    <>
      <div>
        <h1>User</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {user.attendances && (
          <li style={{ listStyleType: "none", width: "500px" }}>
            <ul>
              {user.attendances.map((attendance) => (
                <li
                  key={attendance._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "10px",
                    backgroundColor: "teal",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "20px",
                  }}
                >
                  Status: {attendance.status}, Date:{" "}
                  {formatDate(attendance.date)}
                  <button
                    onClick={() => handleUpdateForm(attendance._id)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </li>
              ))}
            </ul>
          </li>
        )}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "5px",
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <h3>Create Attendance</h3>
            <form
              onSubmit={createAttendance}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ marginRight: "10px" }}>Status: </p>
              <select
                name="status"
                value={attendance.status}
                onChange={(e) =>
                  setAttendance({ ...attendance, status: e.target.value })
                }
                required
                style={{ marginRight: "10px", padding: "5px" }}
              >
                {attendanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <p style={{ marginRight: "10px" }}>Date: </p>
              <input
                type="date"
                name="date"
                value={attendance.date}
                onChange={(e) =>
                  setAttendance({ ...attendance, date: e.target.value })
                }
                required
                style={{ marginRight: "10px", padding: "5px" }}
              />
              <button type="submit" style={{ padding: "5px" }}>
                Submit
              </button>
            </form>
          </div>
          {showUpdateForm.show && (
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "5px",
                width: "50%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <h3>Update Attendance</h3>
              <form
                onSubmit={updateAttendanceStatus}
                style={{ display: "flex" }}
              >
                <p style={{ marginRight: "10px" }}>Status: </p>
                <select
                  name="status"
                  value={showUpdateForm.status}
                  onChange={(e) =>
                    setShowUpdateForm({
                      ...showUpdateForm,
                      status: e.target.value,
                    })
                  }
                  required
                  style={{ marginRight: "10px", padding: "5px" }}
                >
                  {attendanceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button type="submit" style={{ padding: "5px" }}>
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewUser;
