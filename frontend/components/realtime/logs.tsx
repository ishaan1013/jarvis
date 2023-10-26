import { useState } from "react";

export default function Logs({ messages }: { messages: string[] }) {
  return (
    <div className="flex h-96 w-[32rem] flex-col overflow-y-auto rounded-md border border-neutral-700 bg-neutral-900">
      {messages.length > 0 ? (
        messages.map((message, i) => {
          return <Message key={message + i}>{message}</Message>;
        })
      ) : (
        <div className="select-none border-b border-neutral-700 p-4 font-mono text-sm text-neutral-600">
          No messages yet.
        </div>
      )}
    </div>
  );
}

function Message({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border-b border-neutral-700 p-4 font-mono text-sm">
      <span className="select-none text-neutral-600">{">> "}</span>
      {children}
    </div>
  );
}
