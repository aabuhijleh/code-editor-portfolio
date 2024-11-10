"use client";

import PacmanLoader from "react-spinners/PacmanLoader";

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fade-out flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <PacmanLoader color="white" />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Setting up the workspace...
        </h4>
      </div>
    </div>
  );
}
