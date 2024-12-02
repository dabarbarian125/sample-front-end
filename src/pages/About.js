import React from 'react';

const About = () => {
  return (
    <section className="p-6">
      {/* Centered architecture diagram */}
      <div className="flex justify-center mb-8">
        <img 
          src={`/sample-project.drawio.svg`} 
          alt="Architecture Diagram" 
          className="max-w-full h-auto" 
        />
      </div>

      {/* Introduction */}
      <h1 className="text-3xl font-bold text-accent text-center mb-6">
        About This Project
      </h1>
      <p className="text-textColor leading-relaxed mb-6">
        This project serves as a foundational example of an architecture that can be 
        expanded upon to create large-scale enterprise applications. It is designed 
        with scalability, maintainability, and extensibility in mind, utilizing a set of 
        modern technologies and AWS services to provide a robust, scalable, and event-driven 
        environment. This architecture can be tailored and expanded to meet the unique 
        requirements of a variety of applications, making it an ideal starting point for 
        developers building complex solutions. Below, we highlight the key features, 
        technologies, and AWS services leveraged in this architecture.
      </p>

      {/* Project Features */}
      <h2 className="text-2xl font-semibold text-primary mb-4">Project Features</h2>

      <h3 className="text-xl font-semibold text-accent mt-4">Frontend:</h3>
      <ul className="list-disc list-inside text-textColor mb-4">
        <li>
          <strong>React:</strong> User interface, written in JavaScript and styled using 
          TailwindCSS to provide a responsive and modern design.
        </li>
        <li>
          <strong>WebSockets:</strong> Real-time messaging for features like chat functionality, 
          notifications, and collaborative interactions.
        </li>
        <li>
          <strong>AWS Cognito:</strong> Client authentication, including email confirmations, MFA, 
          and password management.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-accent mt-4">Backend:</h3>
      <ul className="list-disc list-inside text-textColor mb-4">
        <li>
          <strong>Node.js & Express.js:</strong> Backend written in TypeScript, with REST API 
          endpoints and secure CORS implementation.
        </li>
        <li>
          <strong>JWT Authentication:</strong> Secure and scalable stateless authentication.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-accent mt-4">Database:</h3>
      <ul className="list-disc list-inside text-textColor mb-4">
        <li>
          <strong>PostgreSQL:</strong> Reliable and efficient database for handling complex queries 
          with features like indexing, transactions, and data consistency.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-accent mt-4">Hosting and Deployment:</h3>
      <ul className="list-disc list-inside text-textColor mb-4">
        <li>
          <strong>AWS ECS:</strong> Hosting both frontend and backend applications with 
          automatic scaling based on demand.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-accent mt-4">Event-Driven Architecture:</h3>
      <ul className="list-disc list-inside text-textColor mb-4">
        <li>
          <strong>AWS CloudTrail, EventBridge, and Lambda:</strong> Automates user onboarding, 
          processes events, and keeps data consistent across components.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-accent mt-4">Infrastructure as Code (IaC):</h3>
      <ul className="list-disc list-inside text-textColor mb-4">
        <li>
          <strong>Pulumi:</strong> Efficient, repeatable, and maintainable infrastructure provisioning 
          written in TypeScript for seamless integration with application code.
        </li>
      </ul>

      {/* GitHub Repositories */}
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">GitHub Repositories</h2>
      <ul className="list-disc list-inside text-textColor">
        <li>
          <a 
            href="https://github.com/dabarbarian125/sample-front-end" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            Frontend Repository
          </a>
          - Complete React-based frontend code.
        </li>
        <li>
          <a 
            href="https://github.com/dabarbarian125/sample-back-end" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            Backend Repository
          </a>
          - Node.js backend code with REST APIs and JWT authentication.
        </li>
        <li>
          <a 
            href="https://github.com/dabarbarian125/sample-infrastructure" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            Infrastructure Repository
          </a>
          - Pulumi scripts for provisioning infrastructure.
        </li>
      </ul>
    </section>
  );
};

export default About;
