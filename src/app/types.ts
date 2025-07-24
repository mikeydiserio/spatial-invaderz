// Type definitions
export type GameState = "menu" | "playing" | "paused" | "gameOver";
export type EnemyType = "basic" | "medium" | "advanced";
export type PowerUpType =
  | "rapidFire"
  | "shieldBoost"
  | "freeze"
  | "doublePoints"
  | "lifeUp";
export type Direction = "left" | "right";

export interface Position {
  x: number;
  y: number;
}

export interface Bullet extends Position {
  id: number;
}

export interface Enemy extends Position {
  id: string;
  type: EnemyType;
  health: number;
  speed: number;
  value: number;
}

export interface Shield {
  id: number;
  health: number;
  position: number;
}

export interface PowerUp extends Position {
  id: number;
  type: PowerUpType;
  speed: number;
}

export interface UFO {
  id: number;
  x: number;
  y: number;
  direction: Direction;
  speed: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

export interface Explosion {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

export interface ScoreEffect {
  id: number;
  x: number;
  y: number;
  value: number;
  life: number;
}
export type GameAction =
  | { type: "START_GAME" }
  | { type: "PAUSE_UNPAUSE" }
  | { type: "GAME_OVER" }
  | { type: "NEXT_LEVEL" }
  | {
      type: "GAME_TICK";
      payload: { keysPressed: { [key: string]: boolean }; deltaTime: number };
    }
  | { type: "FIRE_BULLET" };

// --- Object shape types ---

export interface Bullet {
  id: number;
  x: number;
  y: number;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  type: EnemyType;
  health: number;
  speed: number;
  value: number;
}

export interface Shield {
  id: number;
  health: number;
  position: number;
}

export interface PowerUp {
  id: number;
  x: number;
  y: number;
  type: PowerUpType;
  speed: number;
}

export interface UFO {
  id: number;
  x: number;
  y: number;
  direction: Direction;
  speed: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

export interface Explosion {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

export interface ScoreEffect {
  id: number;
  x: number;
  y: number;
  value: number;
  life: number;
}

// --- Main State type ---

export interface InitialStateType {
  gameState: GameState;
  score: number;
  lives: number;
  level: number;
  playerPosition: number;
  playerBullets: Bullet[];
  enemies: Enemy[];
  enemyDirection: Direction;
  enemyBullets: Bullet[];
  shields: Shield[];
  powerUps: PowerUp[];
  activePowerUp: PowerUpType | null;
  ufo: UFO | null;
  explosions: Explosion[];
  scoreEffects: ScoreEffect[];
}
