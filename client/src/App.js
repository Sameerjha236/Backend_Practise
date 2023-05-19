import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setData(response.data);
    });
  }, []);

  const submitHandler = () => {
    Axios.post("http://localhost:3001/api/insert", {
      name: name,
      age: age,
    }).then(() => {
      setData([...data, { name, age }]);
    });
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
      .then(() => {
        // Filter out the deleted student from the data state
        const updatedData = data.filter((student) => student.id !== id);
        setData(updatedData);
        console.log("Value deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateStudent = () => {};

  return (
    <div className="App">
      <h1>Student Database</h1>
      <form>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="age">Age: </label>
          <input
            type="text"
            name="age"
            id="age"
            value={age}
            required
            onChange={handleAgeChange}
          />
        </div>
        <br />
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
      <div className="data">
        {data.map((student) => {
          return (
            <div id={student.id} className="card">
              <div className="card-1">
                <h1>{student.name}</h1>
                <h2>{student.age}</h2>
                <h5>{student.id}</h5>
              </div>
              <div className="card-2">
                <button onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
                <input type="text" />
                <button onClick={() => updateStudent(student.id)}>
                  Update Age
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
