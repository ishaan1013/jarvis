import { ModelName } from "@/lib/state";

const models = {
  "Iron Man": "ironman",
  "mobius strip": "mobius",
  car: "porsche",
  goose: "goose",
  "black hole": "blackhole",
  "Mis minutes": "minutes",
  "Miss minutes": "minutes",
};

const voiceToModel = (voice: string): ModelName | null => {
  if (models.hasOwnProperty(voice)) {
    return models[voice as keyof typeof models] as ModelName;
  }
  return null;
};

export default voiceToModel;
