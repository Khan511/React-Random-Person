import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, seteLoading] = useState(false);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("Random Person");

  const fetchData = async () => {
    seteLoading(true);
    try {
      const response = await fetch(url);
      const { results } = await response.json();
      const personInof = results[0];

      const { email } = personInof;
      const { first: Name } = personInof.name;
      const { age } = personInof.dob;
      const { postcode } = personInof.location;
      const {
        street: { number, name },
      } = personInof.location;
      const { phone } = personInof;
      const { large: image } = personInof.picture;
      const { password } = personInof.login;

      const newPerson = {
        email,
        Name,
        age,
        postcode,
        street: `${number} ${name}`,
        phone,
        image,
        password,
      };
      setPerson(newPerson);
      seteLoading(false);
      setTitle(newPerson.Name);
      setValue("name");
    } catch (error) {
      console.log(error);
      seteLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUserInfo = () => {
    fetchData();
  };

  const handleHover = (e) => {
    if (e.target.classList.contains("icon")) {
      const target = e.target.dataset.label;
      setValue(target);
      setTitle(person[target]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="Random User"
            className="user-img"
          />
          <p className="user-title">My {value} is</p>
          <p className="user-value">{title}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="Name"
              onMouseOver={handleHover}
            >
              {<FaUser />}
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleHover}
            >
              {<FaEnvelopeOpen />}
            </button>
            <button className="icon" data-label="age" onMouseOver={handleHover}>
              {<FaCalendarTimes />}
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleHover}
            >
              {<FaMap />}
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleHover}
            >
              {<FaPhone />}
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleHover}
            >
              {<FaLock />}
            </button>
          </div>
          <button onClick={getUserInfo} className="btn">
            {loading ? "Loading..." : "Random User"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
