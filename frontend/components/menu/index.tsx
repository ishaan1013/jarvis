"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "@/lib/state";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image";

import HandNone from "@/public/hands/none.png";
import HandTranslate from "@/public/hands/translate.png";
import HandRotate from "@/public/hands/rotate.png";
import HandScale from "@/public/hands/scale.png";
import HandPoint from "@/public/hands/point.png";

import modelData from "@/lib/modelData";

import { Separator } from "../ui/separator";

// const menuItems = ["Models", "Controls", "Server Connection", "About"];

const menuItems = [
  {
    name: "Models",
    icon: "📦",
    description: "Manage your models",
  },
  {
    name: "Controls",
    icon: "🎛",
    description: "Manage your controls",
  },
  {
    name: "Server Connection",
    icon: "🌐",
    description: "Manage your server connections",
  },
  {
    name: "About",
    icon: "👋",
    description: "About this app",
  },
];

export default function Menu() {
  const { menuOpen, setMenuOpen } = useStore();
  const [active, setActive] = useState(0);

  return (
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
      <DialogTrigger>
        <button className=" absolute left-4 top-4 z-50">menu</button>
      </DialogTrigger>
      <DialogContent className="flex h-[600px] p-0">
        <div className="flex w-52 select-none flex-col space-y-2 border-r border-border bg-muted-foreground/[0.03] p-4 py-6">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              onClick={() => setActive(index)}
              className={`w-full justify-start ${
                active === index ? "bg-secondary" : "bg-transparent"
              } px-3`}
              variant="secondary"
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className="flex grow flex-col items-start justify-start py-6 pl-4 pr-8">
          <div className="mb-4 mt-1 text-2xl font-medium">
            {menuItems[active].icon} {menuItems[active].name}
          </div>

          {active === 0 ? (
            <Models />
          ) : active === 1 ? (
            <Controls />
          ) : active === 2 ? null : active === 3 ? null : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Models() {
  const { visible, setVisible } = useStore();

  return (
    <>
      {modelData.map((model) => {
        if (visible[model.id]) {
          return (
            <div
              key={model.id}
              className="mb-2 inline-flex h-24 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm"
            >
              <div className="aspect-square h-full bg-contain">
                <Image
                  src={model.preview}
                  alt={model.name + " 3D Model"}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="ml-4">
                <div className="text-base font-medium">{model.id}.glb</div>
                <Button
                  onClick={() => {
                    const newVisible = { ...visible };
                    newVisible[model.id] = false;
                    setVisible(newVisible);
                  }}
                  variant="link"
                  className="mt-1 h-auto p-0 font-normal text-red-500 underline hover:opacity-70"
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        }
        return null;
      })}
      <Separator className="mb-4 mt-2" />

      {modelData.map((model) => {
        if (!visible[model.id]) {
          return (
            <div
              key={model.id}
              className="mb-2 inline-flex h-24 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm"
            >
              <div className="aspect-square h-full bg-contain">
                <Image
                  src={model.preview}
                  alt={model.name + " 3D Model"}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="ml-4">
                <div className="text-base font-medium">{model.id}.glb</div>
                <Button
                  onClick={() => {
                    const newVisible = { ...visible };
                    newVisible[model.id] = true;
                    setVisible(newVisible);
                  }}
                  variant="link"
                  className="mt-1 h-auto p-0 font-normal underline hover:opacity-70 "
                >
                  Add
                </Button>
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

function Controls() {
  return (
    <>
      <div className="mb-2 inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="aspect-square h-full bg-contain">
          <Image
            src={HandNone}
            alt="Relaxed Hand"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="ml-4">
          <div className="text-base font-medium">Relaxed Hand</div>
          <div className="text-muted-foreground">
            Neutral position; no action.
          </div>
        </div>
      </div>
      <div className="mb-2 inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="aspect-square h-full bg-contain">
          <Image
            src={HandTranslate}
            alt="Fist Hand"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="ml-4">
          <div className="text-base font-medium">Fist</div>
          <div className="text-muted-foreground">
            Grab an object and move it around in 2D space.
          </div>
        </div>
      </div>
      <div className="mb-2 inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="aspect-square h-full bg-contain">
          <Image
            src={HandRotate}
            alt="Index & Middle Finger Up Hand"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="ml-4">
          <div className="text-base font-medium">
            Peace Sign (Index + Middle)
          </div>
          <div className="text-muted-foreground">
            Point at an object and rotate in 3D space.
          </div>
        </div>
      </div>
      <div className="mb-2 inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="aspect-square h-full bg-contain">
          <Image
            src={HandScale}
            alt="Index & Pinky Finger Up Hand"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="ml-4">
          <div className="text-base font-medium">Rock Sign (Index + Pinky)</div>
          <div className="text-muted-foreground">
            Point at an object and scale it uniformly.
          </div>
        </div>
      </div>
      <Separator className="mb-4 mt-2" />
      <div className="inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="aspect-square h-full bg-contain">
          <Image
            src={HandPoint}
            alt="Index & Pinky Finger Up Hand"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="ml-4">
          <div className="text-base font-medium">
            Pointing (For Menu + Settings)
          </div>
          <div className="text-muted-foreground">
            Point to preview cursor, "press" forward to click.
          </div>
        </div>
      </div>
    </>
  );
}
