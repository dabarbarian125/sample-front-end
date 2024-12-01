import React from 'react';

const About = () => {
  return (
    <div className="ml-72 p-6">
      <h1 className="text-3xl font-bold text-accent mb-4">About This Project</h1>
      <p className="text-textColor">
        This project demonstrates a WebSocket-based communication app with user
        authentication. It also includes an API to fetch user data and dynamic
        UI updates using React state and TailwindCSS.
      </p>
      <h2 className="text-xl font-semibold text-primary mt-4">Architecture</h2>
      <p className="text-textColor">
        The app uses:
        <ul className="list-disc list-inside">
          <li>React for frontend UI</li>
          <li>WebSockets for real-time messaging</li>
          <li>JWT for authentication</li>
          <li>Express.js for the backend API</li>
        </ul>
      </p>
    </div>
  );
};

export default About;
