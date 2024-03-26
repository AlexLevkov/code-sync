import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Link } from "react-router-dom";
import Lobby from "./cmps/Lobby.js";
import CodeBlockRoom from "./cmps/CodeBlockRoom";
import AddLessonForm from "./cmps/AddLessonForm.js";
import About from "./cmps/About.js";
import { useQuery } from "react-query";
import img from "./imgs/giphy.gif";

function App() {
  // const socketLink = "http://localhost:2000/cs";
  const socketLink = "https://central-server-81cq.onrender.com/cs";

  // process.env.NODE_ENV === "production" ? "/" : "http://localhost:3030";
  // const httpLink = "http://localhost:2000/api/exercises";
  const httpLink = "https://central-server-81cq.onrender.com/api/exercises";
  // process.env.NODE_ENV === "production";
  // ? "/api/exercises"
  // : "http://localhost:3030/api/exercises";
  // const httpLink = 'http://18.185.79.59:3030/api/exercises'
  // const httpLink = "https://lbapics.alexlevkov.com/api/exercises";

  const [userType, setUserType] = useState("student");
  const [userId, setUserId] = useState("");

  const uniqid = require("uniqid");

  const onChangeType = (type) => {
    setUserType(type);
  };
  const { data, refetch, isLoading } = useQuery("repoData", () =>
    fetch(httpLink)
      .then((res) => res.json())
      .catch((err) => {
        console.log("err:", err);
      })
  );
  const fetchData = () => {
    refetch();
  };

  useEffect(() => {
    setUserId(uniqid());
  }, []);

  return (
    <Router>
      <nav>
        <Link className="nav-link-main logo" to="/">
          <span>CodeSync</span>
          <i className={`fa-solid fa-rotate circle`}></i>
        </Link>
        {/* <Link className="nav-link-main" to="/">
          Home
        </Link> */}
        <Link className="nav-link-main" to="/add-lesson">
          Add Lesson
        </Link>
        {/* <Link className="nav-link-main" to="/about">
          Get Started
        </Link> */}
      </nav>
      <img className="sm-img" src={img} alt="img" />
      <Routes className="router">
        <Route
          exact
          path="/"
          element={
            <Lobby
              socketLink={socketLink}
              exercises={data}
              httpLink={httpLink}
              fetchData={fetchData}
              setUserType={setUserType}
            />
          }
        />
        <Route
          path="/lesson/:id"
          element={
            <CodeBlockRoom
              userId={userId}
              userType={userType}
              setUserType={setUserType}
              onChangeType={onChangeType}
              socketLink={socketLink}
              httpLink={httpLink}
            />
          }
        />
        <Route
          path="/add-lesson"
          element={<AddLessonForm httpLink={httpLink} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      {isLoading && (
        <h1 className="loading-txt animate__animated animate__heartBeat">
          Loading...
        </h1>
      )}
    </Router>
  );
}

export default App;
