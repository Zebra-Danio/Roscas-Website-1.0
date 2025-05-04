'use client';

import React from 'react';

// This is a simplified provider for TinaCMS
export function TinaCMSProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <EditButton />
    </>
  );
}

function EditButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="rounded-full bg-primary p-3 text-white shadow-lg hover:bg-primary/80"
        onClick={() => {
          window.location.href = '/admin/index.html';
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
    </div>
  );
} 