import PreviewPorsche from "@/public/3d/previews/porsche.png";
import PreviewIronman from "@/public/3d/previews/ironman.png";
import PreviewGoose from "@/public/3d/previews/goose.png";
import { StaticImageData } from "next/image";

type Model = {
  id: "porsche" | "ironman" | "goose";
  name: string;
  model: string;
  preview: StaticImageData;
};

const modelData: Model[] = [
  {
    id: "porsche",
    name: "Porsche",
    model: "/3d/porsche.glb",
    preview: PreviewPorsche,
  },
  {
    id: "ironman",
    name: "Iron Man",
    model: "/3d/ironman.glb",
    preview: PreviewIronman,
  },
  {
    id: "goose",
    name: "Goose",
    model: "/3d/goose.glb",
    preview: PreviewGoose,
  },
];

export default modelData;
