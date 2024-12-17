// src/components/Header.js
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="bg-gray-800 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-400">MyToken App</h1>
        <ConnectButton />
      </div>
    </header>
  );
}
