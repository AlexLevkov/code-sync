import React from "react";

const About = () => {
  return (
    <div>
      <h1 className="about-title">Get Started</h1>

      <p className="about-p">
        Welcome to CodeSync, a real-time coding collaboration platform powered
        by socket.io. This application has been designed for remote interaction
        between mentors and students.
      </p>
      <p className="about-p">
        To initiate a session, the mentor should be the first to enter,
        selecting the 'mentor' checkbox on the login page. Students can then
        join the room, ensuring the 'mentor' box remains unchecked.
      </p>
      <p className="about-p">
        Inside the interactive coding environment, students can alter the
        provided code in pursuit of bug resolution, while mentors have the
        capacity to oversee and provide guidance through the integrated chat
        function.{" "}
      </p>

      <p className="about-p">
        Upon successful bug elimination, a success message will be displayed.
      </p>
      <p className="about-p">
        Thank you for exploring CodeSync. I hope you had an enjoyable
        experience. If you want to see more of my work, please visit this{" "}
        <strong>
          {" "}
          <a href="https://alexlevkov.com">link.</a>
        </strong>
      </p>
    </div>
  );
};

export default About;
