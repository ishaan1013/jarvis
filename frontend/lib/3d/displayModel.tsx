import { ModelName } from "../state";

import BlackHole from "@/components/3d/blackhole";
import Brain from "@/components/3d/brain";
import Goose from "@/components/3d/goose";
import IronMan from "@/components/3d/ironman";
import Mobius from "@/components/3d/mobius";
import Minutes from "@/components/3d/minutes";
import Porsche from "@/components/3d/porsche";

export const displayModel = (model: ModelName | null) => {
  switch (model) {
    case "blackhole":
      return <BlackHole />;
    case "brain":
      return <Brain />;
    case "ironman":
      return <IronMan />;
    case "mobius":
      return <Mobius />;
    case "goose":
      return <Goose />;
    case "minutes":
      return <Minutes />;
    case "porsche":
      return <Porsche />;
    default:
      return null;
  }
};
