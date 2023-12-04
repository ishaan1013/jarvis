"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "@/lib/state";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

import HandNone from "@/public/hands/none.png";
import HandTranslate from "@/public/hands/translate.png";
import HandRotate from "@/public/hands/rotate.png";
import HandScale from "@/public/hands/scale.png";
import HandPoint from "@/public/hands/point.png";

import modelData from "@/lib/modelData";

import { Separator } from "../ui/separator";
import {
  BadgeHelp,
  Box,
  Home,
  SlidersHorizontal,
  Menu as MenuIcon,
  CloudLightning,
  Zap,
  Speech,
  Mic,
} from "lucide-react";

import Link from "next/link";
import { trigger } from "../realtime";

const menuItems = [
  {
    name: "Models",
    icon: <Box className="mr-2 h-4 w-4" />,
    lgIcon: <Box className="mr-2 h-6 w-6" />,
  },
  {
    name: "Gesture Controls",
    icon: <SlidersHorizontal className="mr-2 h-4 w-4" />,
    lgIcon: <SlidersHorizontal className="mr-2 h-6 w-6" />,
  },
  {
    name: "Voice Commands",
    icon: <Speech className="mr-2 h-4 w-4" />,
    lgIcon: <Speech className="mr-2 h-6 w-6" />,
  },
  {
    name: "About",
    icon: <BadgeHelp className="mr-2 h-4 w-4" />,
    lgIcon: <BadgeHelp className="mr-2 h-6 w-6" />,
  },
];

export default function Menu() {
  const { menuOpen, setMenuOpen, isConnected, jarvis, clearAll, gesture } =
    useStore();
  const [active, setActive] = useState(0);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* <button
        onClick={() => trigger()}
        className="absolute left-16 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-muted-foreground/50 bg-secondary"
      >
        <Zap className="h-5 w-5" />
      </button> */}
      {/* <div className="absolute left-32 top-4 z-50 flex h-10 items-center text-muted-foreground">
        {JSON.stringify(gesture)}
      </div> */}
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogTrigger>
          <button className="gesture-clickable absolute left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-muted-foreground/50 bg-secondary">
            <MenuIcon className="xw-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="flex h-[650px] p-0">
          <div className="flex w-52 select-none flex-col justify-between border-r border-border bg-muted-foreground/[0.03] p-4 py-6">
            <div className="flex w-full flex-col space-y-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`w-full justify-start ${
                    active === index ? "bg-secondary" : "bg-transparent"
                  } px-3`}
                  variant="secondary"
                >
                  {item.icon} {item.name}
                </Button>
              ))}
              {
                <div
                  className={`flex duration-200 ${
                    jarvis ? "visible opacity-100" : "invisible opacity-0"
                  } h-10 w-full items-center justify-start px-3 text-muted-foreground`}
                >
                  <Mic className="mr-2 h-4 w-4" /> Jarvis listening...
                </div>
              }
            </div>
            <div className="flex w-full flex-col items-start space-y-2">
              {isConnected ? (
                <div className="flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
                  <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                  Server Connected
                </div>
              ) : (
                <div className="flex items-center rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-300">
                  <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                  Server Inactive
                </div>
              )}
              <Link href="/" className="w-full">
                <Button
                  className={`w-full justify-start px-3`}
                  variant="secondary"
                >
                  <Home className="mr-2 h-4 w-4" /> Back to Home
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex grow flex-col items-start justify-start py-6 pl-4 pr-8">
            <div className="mb-4 mt-1 flex items-center text-2xl font-medium">
              {menuItems[active].lgIcon} {menuItems[active].name}
            </div>

            {active === 0 ? (
              <Models />
            ) : active === 1 ? (
              <Controls />
            ) : active === 2 ? (
              <VoiceCommands />
            ) : active === 3 ? null : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Models() {
  const { objects, setVisible } = useStore();

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="mb-4 flex w-full items-center">
        <div className="text-muted-foreground">Visible</div>
        <div className="ml-4 h-[1px] w-full bg-border" />
      </div>
      {modelData.map((model) => {
        if (objects[model.id].visible) {
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
                {objects[model.id].visible ? (
                  <Button
                    onClick={() => {
                      setVisible(model.id, !objects);
                    }}
                    variant="link"
                    className="mt-1 h-auto p-0 font-normal text-red-500 underline hover:opacity-70"
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setVisible(model.id, !objects);
                    }}
                    variant="link"
                    className="mt-1 h-auto p-0 font-normal underline hover:opacity-70 "
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="mb-4 mt-2 flex w-full items-center">
        <div className="text-muted-foreground">Hidden</div>
        <div className="ml-4 h-[1px] w-full bg-border" />
      </div>
      {modelData.map((model) => {
        if (!objects[model.id].visible) {
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
                    setVisible(model.id, true);
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
    </div>
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

function VoiceCommands() {
  return (
    <>
      <div className="mb-2 inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="ml-4">
          <div className="text-base font-medium">"(Hey) Jarvis"</div>
          <div className="text-muted-foreground">
            Active Jarvis to initiate voice commands.
          </div>
        </div>
      </div>
      <div className="mb-2 inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="ml-4">
          <div className="text-base font-medium">
            "Add/Remove {"{"}model{"}"}"
          </div>
          <div className="text-muted-foreground">
            Add or remove the specified model from the board.
          </div>
        </div>
      </div>
      <div className="mb-2 inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="ml-4">
          <div className="text-base font-medium">"Clear all"</div>
          <div className="text-muted-foreground">
            Remove all active models from the board.
          </div>
        </div>
      </div>
      <div className="mb-2 inline-flex h-20 w-full items-center justify-start overflow-hidden whitespace-nowrap rounded-md border border-border bg-muted-foreground/[0.03] text-sm">
        <div className="ml-4">
          <div className="text-base font-medium">"Open/Close Menu"</div>
          <div className="text-muted-foreground">
            Open or close the main menu.
          </div>
        </div>
      </div>
    </>
  );
}
