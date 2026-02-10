import type { useGame } from "../Hooks/useGame";
import type usePlayer from "../Hooks/usePlayer";

export type IGameState = ReturnType<typeof usePlayer> &
  ReturnType<typeof useGame>;
