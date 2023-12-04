import { ModelName } from "@/lib/state";

const models = {
  "Iron Man": "ironman",
  "Mobius strip": "mobius",
  car: "porsche",
  goose: "goose",
  "black hole": "blackhole",
  brain: "brain",
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
