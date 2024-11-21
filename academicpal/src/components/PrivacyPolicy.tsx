import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">Privacy Policy</h1>
        <p className="text-gray-300 mb-4">
          At Academic Pal, we prioritize your privacy and are committed to
          safeguarding your personal information. This Privacy Policy outlines
          how we collect, use, and protect your data when you use our website.
        </p>

        <h2 className="text-2xl text-yellow-400 font-semibold mb-3">
          Information We Collect
        </h2>
        <ul className="list-disc pl-5 text-gray-300 mb-4">
          <li>Your name, email address, and other personal details provided during signup.</li>
          <li>Usage data, such as IP addresses and browser types, for analytics.</li>
        </ul>

        <h2 className="text-2xl text-yellow-400 font-semibold mb-3">
          How We Use Your Data
        </h2>
        <p className="text-gray-300 mb-4">
          We use your data to provide and improve our services, communicate updates, and ensure
          a seamless user experience.
        </p>

        <h2 className="text-2xl text-yellow-400 font-semibold mb-3">
          Third-Party Sharing
        </h2>
        <p className="text-gray-300 mb-4">
          Your data is never sold or shared without your consent, except as
          required by law or for essential services like analytics and
          advertising.
        </p>

        <h2 className="text-2xl text-yellow-400 font-semibold mb-3">
          Your Rights
        </h2>
        <p className="text-gray-300">
          You have the right to access, update, or delete your data. For any
          concerns, feel free to contact us at{" "}
          <a href="mailto:nnm23cs256@nmamit.in" className="text-red-400 underline">
            nnm23cs256@nmamit.in
          </a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
