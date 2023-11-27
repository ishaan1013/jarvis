import { create } from "zustand";

type Visible = {
  porsche: boolean;
  ironman: boolean;
  goose: boolean;
};

type State = {
  target: THREE.Object3D | null;
  setTarget: (target: THREE.Object3D | null) => void;
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  visible: Visible;
  setVisible: (visible: Visible) => void;
};

export const useStore = create<State>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  menuOpen: true,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  visible: {
    porsche: true,
    ironman: false,
    goose: false,
  },
  setVisible: (visible) => set({ visible }),
}));
