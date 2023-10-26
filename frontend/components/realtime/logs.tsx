import { X } from "lucide-react";
import { useState } from "react";

export default function Logs({
  messages,
  close,
  isConnected,
}: {
  messages: string[];
  close: () => void;
  isConnected: boolean;
}) {
  return (
    <div className="z-50 flex h-64 w-96 flex-col overflow-y-auto rounded-md border border-neutral-700 bg-neutral-900 font-mono text-xs">
      <div className="sticky top-0 flex items-center self-end p-2">
        <div
          className={`mr-2 h-2 w-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-600"
          }`}
        />
        {isConnected ? "Connected" : "Not Connected"}
        <button
          onClick={close}
          className="ml-3 mr-1 flex h-5 w-5 items-center justify-center rounded-md bg-red-600/10 transition-all hover:bg-red-600/25"
        >
          <X className="h-4 w-4 text-red-600" />
        </button>
      </div>

      {messages.length > 0 ? (
        messages.map((message, i) => {
          return <Message key={i}>{message}</Message>;
        })
      ) : (
        <div className="select-none p-2 text-neutral-600">No messages yet.</div>
      )}
    </div>
  );
}

function Message({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border-b border-neutral-700 p-2">
      <span className="select-none text-neutral-600">{">> "}</span>
      {children}
    </div>
  );
}
