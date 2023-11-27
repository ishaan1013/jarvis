"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/state";
import { Button } from "../ui/button";
import { useState } from "react";

const menuItems = ["Settings", "Controls", "Server Connection", "About"];

export default function Menu() {
  const { menuOpen, setMenuOpen } = useStore();
  const [active, setActive] = useState(0);

  return (
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
      <DialogTrigger>
        <button className=" absolute left-4 top-4 z-50">menu</button>
      </DialogTrigger>
      <DialogContent className="flex h-[600px] p-0">
        <div className="flex w-60 flex-col space-y-2 border-r border-border bg-muted-foreground/[0.03] p-6">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              onClick={() => setActive(index)}
              size="lg"
              className={`w-full justify-start ${
                active === index ? "bg-secondary" : "bg-transparent"
              } px-4 text-base`}
              variant="secondary"
            >
              {item}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
