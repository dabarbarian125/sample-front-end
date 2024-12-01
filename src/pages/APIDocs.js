import React from 'react';

const APIDocs = () => {
  return (
    <div className="ml-72 p-6">
      <h1 className="text-3xl font-bold text-accent mb-4">API Documentation</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-primary">GET /api/users</h2>
          <p className="text-textColor">Fetches a list of users.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-primary">POST /api/users</h2>
          <p className="text-textColor">
            Creates a new user. Requires a JSON body with user details.
          </p>
        </section>
      </div>
    </div>
  );
};

export default APIDocs;
