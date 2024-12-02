import React from 'react';

const APIDocs = () => {
  return (
    <div className="ml-72 p-6">
      <h1 className="text-3xl font-bold text-accent mb-4">API Documentation</h1>

      <div className="space-y-6">
        {/* GET /api/users */}
        <section>
          <h2 className="text-xl font-semibold text-primary">GET /api/users</h2>
          <p className="text-textColor">Fetches a list of users.</p>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-secondary">Example Response:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm text-black overflow-x-auto">
{`[
  {
    "id": 1,
    "username": "tester",
    "email": "tester@test.com"
  },
  ...
]`}
            </pre>
          </div>
        </section>

        {/* POST /api/users */}
        <section>
          <h2 className="text-xl font-semibold text-primary">POST /api/users</h2>
          <p className="text-textColor">Creates a new user. Requires a JSON body with user details.</p>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-secondary">Example Request Body:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm text-black overflow-x-auto">
{`{
  "username": "johndoe",
  "email": "johndoe@example.com"
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default APIDocs;
