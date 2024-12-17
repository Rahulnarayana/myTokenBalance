// src/components/Container.js
import React from 'react';

export default function Container({ children }) {
  return (
    <main className="flex-grow flex items-center justify-center bg-gray-700 py-10">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        {children}
      </div>
    </main>
  );
}
