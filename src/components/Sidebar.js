import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-secondary text-textColor h-screen p-6 fixed">
      <h2 className="text-2xl font-bold text-accent mb-6">Navigation</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="block px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/api-docs"
            className="block px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark"
          >
            API Docs
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="block px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
