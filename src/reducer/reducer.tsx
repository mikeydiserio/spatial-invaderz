import {
  Direction,
  Enemy,
  EnemyType,
  Explosion,
  GameAction,
  InitialStateType,
  Particle,
  ScoreEffect,
} from "../app/types";

// --- Constants (Adjust these to balance the game) ---
const PLAYER_SPEED_PER_SEC = 25;
const PLAYER_HITBOX_RADIUS = 2.5;
const ENEMY_ROWS = 5;
const ENEMY_COLS = 10;
const ENEMY_FIRE_CHANCE_PER_SEC = 0.1; // Chance for enemies to fire each second
// BULLETS
const PLAYER_BULLET_SPEED_PER_SEC = 80; // How fast player bullets move
const ENEMY_BULLET_SPEED_PER_SEC = 40; // How fast enemy bullets move
const MAX_ENEMY_BULLETS = 5; // Maximum number of enemy bullets on screen at once
// ALIENS / INVADERS
const ENEMY_STARTING_SPEED_PER_SEC = 0.2; // The initial horizontal speed of enemies at level 1
const ENEMY_SPEED_INCREASE_PER_LEVEL = 0.2; // How much faster enemies get each level
const ENEMY_VERTICAL_DROP = 2; // How far enemies drop down (in screen %) when they hit the wall
const ENEMY_MAX_SPEED_MULTIPLIER = 3; // How many times faster the last enemy is
const ENEMY_HITBOX_RADIUS = 2.5;
const ENEMY_HITBOX_RADIUS_SQUARED = ENEMY_HITBOX_RADIUS * ENEMY_HITBOX_RADIUS;
const SHIELD_WIDTH = 5;
const SHIELD_DAMAGE_PER_HIT = 25;
const UFO_SPAWN_CHANCE_PER_SEC = 5; // Chance for UFO to spawn each second
// UFO
const UFO_SPEED_PER_SEC = 15;

export const initialState: InitialStateType = {
  gameState: "menu",
  score: 0,
  lives: 3,
  level: 1,
  playerPosition: 50,
  playerBullets: [],
  enemies: [],
  enemyDirection: "right",
  enemyBullets: [],
  shields: [
    { id: 1, health: 100, position: 20 },
    { id: 2, health: 100, position: 40 },
    { id: 3, health: 100, position: 60 },
    { id: 4, health: 100, position: 80 },
  ],
  powerUps: [],
  activePowerUp: null,
  ufo: null,
  explosions: [],
  scoreEffects: [],
};

const createEnemiesForLevel = (level: number): Enemy[] => {
  const enemies: Enemy[] = [];
  const speed =
    ENEMY_STARTING_SPEED_PER_SEC + (level - 1) * ENEMY_SPEED_INCREASE_PER_LEVEL;
  for (let row = 0; row < ENEMY_ROWS; row++) {
    for (let col = 0; col < ENEMY_COLS; col++) {
      const type: EnemyType =
        row === 0 ? "advanced" : row < 3 ? "medium" : "basic";
      enemies.push({
        id: `${row}-${col}`,
        x: 10 + col * 8,
        y: 10 + row * 6,
        type,
        health: type === "advanced" ? 2 : 1,
        speed: speed,
        value: type === "advanced" ? 30 : type === "medium" ? 20 : 10,
      });
    }
  }
  return enemies;
};

const createExplosion = (x: number, y: number, color: string): Explosion => {
  const particles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
    // More particles
    id: `particle-${Date.now()}-${i}`,
    x,
    y,
    vx: (Math.random() - 0.5) * 80, // Higher velocity
    vy: (Math.random() - 0.5) * 80,
    size: Math.random() * 3 + 1,
    color,
    life: 0.7 + Math.random() * 0.5, // Longer life
  }));
  return { id: Date.now(), x, y, particles };
};

const createScoreEffect = (
  x: number,
  y: number,
  value: number
): ScoreEffect => {
  return {
    id: Date.now(),
    x,
    y,
    value,
    life: 0.5, // Shorter life for score effects
  };
};

export function gameReducer(
  state: typeof initialState,
  action: GameAction
): typeof initialState {
  switch (action.type) {
    case "START_GAME": {
      const level = 1; // Or state.level if restarting
      const newEnemies: Enemy[] = Array.from({ length: ENEMY_ROWS }, (_, row) =>
        Array.from({ length: ENEMY_COLS }, (_, col) => {
          const type: EnemyType =
            row === 0 ? "advanced" : row < 3 ? "medium" : "basic";
          return {
            id: `${row}-${col}`,
            x: 10 + col * 8,
            y: 10 + row * 6,
            type,
            health: type === "advanced" ? 2 : 1,
            speed:
              ENEMY_STARTING_SPEED_PER_SEC +
              level * ENEMY_SPEED_INCREASE_PER_LEVEL, // Adjusted for smoother gameplay
            value: type === "advanced" ? 30 : type === "medium" ? 20 : 10,
          };
        })
      ).flat();
      return { ...initialState, gameState: "playing", enemies: newEnemies };
    }
    case "NEXT_LEVEL": {
      // This action advances the player, preserving score and lives.
      const newLevel = state.level + 1;
      return {
        ...state,
        level: newLevel,
        enemies: createEnemiesForLevel(newLevel),
        playerBullets: [],
        enemyBullets: [],
        enemyDirection: "right",
        explosions: [],
      };
    }

    case "PAUSE_UNPAUSE": {
      return {
        ...state,
        gameState: state.gameState === "playing" ? "paused" : "playing",
      };
    }

    case "FIRE_BULLET": {
      const bulletLimit = state.activePowerUp === "rapidFire" ? 4 : 2;
      if (state.playerBullets.length >= bulletLimit) return state;
      return {
        ...state,
        playerBullets: [
          ...state.playerBullets,
          { id: Date.now(), x: state.playerPosition, y: 90 },
        ],
      };
    }

    case "GAME_TICK": {
      if (state.gameState !== "playing") return state;
      const { keysPressed, deltaTime } = action.payload;
      const dt = Math.min(deltaTime, 0.1);
      let {
        playerPosition,
        playerBullets,
        enemies,
        enemyDirection,
        enemyBullets,
        ufo,
        shields,
        explosions,
        score,
        lives,
      } = { ...state };
      const { scoreEffects } = { ...state };
      // Player Movement (with deltaTime)
      if (keysPressed["ArrowLeft"] && playerPosition > 5) {
        playerPosition -= PLAYER_SPEED_PER_SEC * dt;
      }
      if (keysPressed["ArrowRight"] && playerPosition < 95) {
        playerPosition += PLAYER_SPEED_PER_SEC * dt;
      }
      // Bullet Movement (with deltaTime)
      playerBullets = playerBullets
        .map((b) => ({ ...b, y: b.y - PLAYER_BULLET_SPEED_PER_SEC * dt }))
        .filter((b) => b.y > 0);
      enemyBullets = enemyBullets
        .map((b) => ({ ...b, y: b.y + ENEMY_BULLET_SPEED_PER_SEC * dt }))
        .filter((b) => b.y < 100);

      // Enemy Movement (with deltaTime)
      const isFrozen = state.activePowerUp === "freeze";
      if (!isFrozen && enemies.length > 0) {
        // ✅ NEW: CALCULATE DYNAMIC SPEED MULTIPLIER
        const startingEnemyCount = ENEMY_ROWS * ENEMY_COLS;
        const remainingRatio = enemies.length / startingEnemyCount;
        // This formula makes speed increase as ratio decreases.
        const speedMultiplier =
          1 + (1 - remainingRatio) * (ENEMY_MAX_SPEED_MULTIPLIER - 1);

        const rightmostEnemy = Math.max(...enemies.map((e) => e.x));
        const leftmostEnemy = Math.min(...enemies.map((e) => e.x));
        let moveDown = false;
        if (
          (enemyDirection === "right" && rightmostEnemy > 90) ||
          (enemyDirection === "left" && leftmostEnemy < 10)
        ) {
          enemyDirection = enemyDirection === "right" ? "left" : "right";
          moveDown = true;
        }
        enemies = enemies.map((enemy) => {
          // ✅ UPDATED: Apply the speedMultiplier to the enemy's base speed
          const dynamicSpeed = enemy.speed * speedMultiplier;
          return {
            ...enemy,
            x: moveDown
              ? enemy.x
              : enemy.x +
                (enemyDirection === "right" ? dynamicSpeed : -dynamicSpeed) *
                  dt,
            y: moveDown ? enemy.y + ENEMY_VERTICAL_DROP : enemy.y,
          };
        });
      }
      // UFO Movement (with deltaTime)
      if (ufo) {
        const newX =
          ufo.x +
          (ufo.direction === "right" ? UFO_SPEED_PER_SEC : -UFO_SPEED_PER_SEC) *
            dt;
        if (newX > 105 || newX < -5) {
          ufo = null;
        } else {
          ufo = { ...ufo, x: newX, speed: UFO_SPEED_PER_SEC };
        }
      }

      // ✅ UFO SPAWNING LOGIC
      if (!ufo && Math.random() < UFO_SPAWN_CHANCE_PER_SEC * dt) {
        const direction: Direction = Math.random() < 0.5 ? "left" : "right";
        ufo = {
          id: Date.now(),
          x: direction === "right" ? -5 : 105,
          y: 8,
          direction: direction,
          speed: UFO_SPEED_PER_SEC,
        };
      }
      // COLLISION DETECTION
      if (
        state.enemies.length > 0 &&
        state.enemyBullets.length < MAX_ENEMY_BULLETS &&
        Math.random() < ENEMY_FIRE_CHANCE_PER_SEC * dt
      ) {
        const shooter =
          state.enemies[Math.floor(Math.random() * state.enemies.length)];
        enemyBullets.push({ id: Date.now(), x: shooter.x, y: shooter.y });
      }

      const bulletsThatHitSomething = new Set<number>();
      const enemiesThatWereHit = new Set<string>();

      for (const bullet of playerBullets) {
        // If this bullet already hit something, skip its checks
        if (bulletsThatHitSomething.has(bullet.id)) continue;
        for (const enemy of enemies) {
          if (enemiesThatWereHit.has(enemy.id)) continue;
          const dx = bullet.x - enemy.x;
          const dy = bullet.y - enemy.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < ENEMY_HITBOX_RADIUS_SQUARED) {
            bulletsThatHitSomething.add(bullet.id);
            enemiesThatWereHit.add(enemy.id);
            score += enemy.value;
            explosions.push(createExplosion(enemy.x, enemy.y, "#f0f"));
            scoreEffects.push(createScoreEffect(enemy.x, enemy.y, enemy.value));
            enemies = enemies.filter((e) => e.id !== enemy.id);
            break;
          }
        }
      }

      if (enemiesThatWereHit.size > 0) {
        enemies = enemies.filter((e) => !enemiesThatWereHit.has(e.id));
      }

      // ## Enemy Bullets vs Player ##
      for (const bullet of enemyBullets) {
        const distance = Math.sqrt(
          Math.pow(bullet.x - playerPosition, 2) + Math.pow(bullet.y - 90, 2)
        );
        if (distance < PLAYER_HITBOX_RADIUS) {
          bulletsThatHitSomething.add(bullet.id);
          lives--;
          explosions.push(createExplosion(playerPosition, 90, "#0ff"));
          break;
        }
      }

      // ## All Bullets vs Shields ##
      shields = shields.map((shield) => {
        let newHealth = shield.health;
        for (const bullet of [...playerBullets, ...enemyBullets]) {
          if (
            bullet.y > 80 &&
            bullet.y < 85 &&
            Math.abs(bullet.x - shield.position) < SHIELD_WIDTH
          ) {
            bulletsThatHitSomething.add(bullet.id);
            newHealth -= SHIELD_DAMAGE_PER_HIT;
          }
        }
        return { ...shield, health: Math.max(0, newHealth) };
      });
      // --- CLEANUP AND EFFECTS (This section was missing) ---
      playerBullets = playerBullets.filter(
        (b) => !bulletsThatHitSomething.has(b.id)
      );
      enemyBullets = enemyBullets.filter(
        (b) => !bulletsThatHitSomething.has(b.id)
      );
      shields = shields.filter((s) => s.health > 0);

      explosions = explosions
        .map((exp) => ({
          ...exp,
          particles: exp.particles
            .map((p) => ({
              ...p,
              x: p.x + p.vx * dt,
              y: p.y + p.vy * dt,
              life: p.life - dt,
            }))
            .filter((p) => p.life > 0),
        }))
        .filter((exp) => exp.particles.length > 0);

      // --- GAME STATE CHECKS ---
      if (lives <= 0) {
        return { ...state, gameState: "gameOver", lives: 0, score };
      }
      if (enemies.some((e) => e.y > 85)) {
        return { ...state, gameState: "gameOver", lives: 0, score };
      }

      // --- RETURN FINAL STATE (This section is now correct) ---
      return {
        ...state,
        playerPosition,
        playerBullets,
        enemyBullets,
        enemies,
        enemyDirection,
        shields,
        scoreEffects,
        explosions,
        score,
        lives,
        ufo,
      };
    }
    default:
      return state;
  }
}

export default gameReducer;
export type { GameAction, InitialStateType };
