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
      alert("Values Added");
    });
  };
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
            <p id={student.id}>
              {student.id} = {student.name} {student.age}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
