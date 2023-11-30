import { ModelName } from "@/lib/state";

const models = {
  "Iron Man": "ironman",
  car: "porsche",
  goose: "goose",
};

const voiceToModel = (voice: string): ModelName | null => {
  if (models.hasOwnProperty(voice)) {
    return models[voice as keyof typeof models] as ModelName;
  }
  return null;
};

export default voiceToModel;
