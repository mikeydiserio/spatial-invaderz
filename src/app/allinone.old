"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bullet,
  Direction,
  Enemy,
  EnemyType,
  Explosion,
  GameState,
  Particle,
  PowerUp,
  PowerUpType,
  ScoreEffect,
  Shield,
  UFO,
} from "./types";
export default function SpaceInvaders() {
  // Game states
  const [gameState, setGameState] = useState<GameState>("menu");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [level, setLevel] = useState<number>(1);

  // Player state
  const [playerPosition, setPlayerPosition] = useState<number>(50);
  const [playerBullets, setPlayerBullets] = useState<Bullet[]>([]);

  // Enemies state
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [enemyDirection, setEnemyDirection] = useState<Direction>("right");
  const [enemyBullets, setEnemyBullets] = useState<Bullet[]>([]);

  // Shields state
  const [shields, setShields] = useState<Shield[]>([
    { id: 1, health: 100, position: 20 },
    { id: 2, health: 100, position: 40 },
    { id: 3, health: 100, position: 60 },
    { id: 4, health: 100, position: 80 },
  ]);

  // Power-ups
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [activePowerUp, setActivePowerUp] = useState<PowerUpType | null>(null);

  // UFO
  const [ufo, setUfo] = useState<UFO | null>(null);

  // Explosions and score effects
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [scoreEffects, setScoreEffects] = useState<ScoreEffect[]>([]);

  // Refs
  const gameRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>(0);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const lastFrameTime = useRef<number>(0);

  // Constants
  const frameRate = 60; // Target 60 FPS

  const enemy = (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="4" width="16" height="4" fill="#FF00FF" />
      <rect x="4" y="8" width="24" height="4" fill="#FF00FF" />
      <rect x="0" y="12" width="32" height="4" fill="#FF00FF" />
      <rect x="8" y="16" width="4" height="4" fill="#FF00FF" />
      <rect x="20" y="16" width="4" height="4" fill="#FF00FF" />
      <rect x="12" y="20" width="8" height="4" fill="#FF00FF" />
    </svg>
  );
  const enemy2 = (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="4" height="4" fill="#FFFF00" />
      <rect x="12" y="4" width="8" height="4" fill="#FFFF00" />
      <rect x="24" y="4" width="4" height="4" fill="#FFFF00" />
      <rect x="0" y="8" width="32" height="4" fill="#FFFF00" />
      <rect x="4" y="12" width="24" height="4" fill="#FFFF00" />
      <rect x="8" y="16" width="4" height="4" fill="#FFFF00" />
      <rect x="20" y="16" width="4" height="4" fill="#FFFF00" />
      <rect x="12" y="20" width="8" height="4" fill="#FFFF00" />
    </svg>
  );
  const enemy3 = (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="0" width="4" height="4" fill="#FF0000" />
      <rect x="12" y="0" width="8" height="4" fill="#FF0000" />
      <rect x="24" y="0" width="4" height="4" fill="#FF0000" />
      <rect x="0" y="4" width="32" height="4" fill="#FF0000" />
      <rect x="4" y="8" width="24" height="4" fill="#FF0000" />
      <rect x="8" y="12" width="16" height="4" fill="#FF0000" />
      <rect x="12" y="16" width="8" height="4" fill="#FF0000" />
      <rect x="8" y="20" width="4" height="4" fill="#FF0000" />
      <rect x="20" y="20" width="4" height="4" fill="#FF0000" />
    </svg>
  );

  const enemy4 = (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="0" width="4" height="4" fill="#FF0000" />
      <rect x="12" y="0" width="8" height="4" fill="#FF0000" />
      <rect x="24" y="0" width="4" height="4" fill="#FF0000" />
      <rect x="0" y="4" width="32" height="4" fill="#FF0000" />
      <rect x="4" y="8" width="24" height="4" fill="#FF0000" />
      <rect x="8" y="12" width="16" height="4" fill="#FF0000" />
      <rect x="12" y="16" width="8" height="4" fill="#FF0000" />
      <rect x="8" y="20" width="4" height="4" fill="#FF0000" />
      <rect x="20" y="20" width="4" height="4" fill="#FF0000" />
    </svg>
  );

  // Initialize enemies
  const initializeEnemies = useCallback(() => {
    const newEnemies: Enemy[] = [];
    const rows = 5;
    const cols = 11;
    const horizontalSpacing = 8;
    const verticalSpacing = 6;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const type: EnemyType =
          row === 0 ? "advanced" : row < 3 ? "medium" : "basic";
        newEnemies.push({
          id: `${row}-${col}`,
          x: 10 + col * horizontalSpacing,
          y: 10 + row * verticalSpacing,
          type,
          health: type === "advanced" ? 2 : 1,
          speed: 0.5 + 0.1 * level,
          value: type === "advanced" ? 30 : type === "medium" ? 20 : 10,
        });
      }
    }

    setEnemies(newEnemies);
    setEnemyDirection("right");
  }, [level]);

  // Initialize game
  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setLives(3);
    setLevel(1);
    setPlayerPosition(50);
    setPlayerBullets([]);
    setEnemyBullets([]);
    setShields(shields.map((s) => ({ ...s, health: 100 })));
    setActivePowerUp(null);
    setUfo(null);
    setExplosions([]);
    setScoreEffects([]);
    initializeEnemies();
  };

  // Create explosion effect
  const createExplosion = (
    x: number,
    y: number,
    color: string,
    value?: number
  ) => {
    const particles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: `particle-${Date.now()}-${i}`,
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 3 + 1,
      color,
      life: 30 + Math.random() * 30,
    }));

    setExplosions((prev) => [...prev, { id: Date.now(), x, y, particles }]);

    if (value !== undefined) {
      setScoreEffects((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: x + (Math.random() * 20 - 10),
          y: y + (Math.random() * 20 - 10),
          value,
          life: 60,
        },
      ]);
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;

      if (gameState === "playing") {
        if (e.key === " ") {
          // Fire bullet - limit based on power-up
          const bulletLimit = activePowerUp === "rapidFire" ? 4 : 2;
          if (playerBullets.length < bulletLimit) {
            setPlayerBullets((bullets) => [
              ...bullets,
              { id: Date.now(), x: playerPosition, y: 90 },
            ]);
          }
        } else if (e.key === "p") {
          setGameState("paused");
        }
      } else if (gameState === "menu" && e.key === "Enter") {
        startGame();
      } else if (gameState === "paused" && e.key === "p") {
        setGameState("playing");
      } else if (gameState === "gameOver" && e.key === "Enter") {
        startGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState, playerPosition, playerBullets, activePowerUp]);

  // Game loop with frame rate control
  useEffect(() => {
    if (gameState !== "playing") return;

    const movePlayer = () => {
      if (keysPressed.current["ArrowLeft"] && playerPosition > 5) {
        setPlayerPosition((pos) => pos - 1.5);
      }
      if (keysPressed.current["ArrowRight"] && playerPosition < 95) {
        setPlayerPosition((pos) => pos + 1.5);
      }
    };

    const moveBullets = () => {
      // Player bullets
      setPlayerBullets((bullets) =>
        bullets.map((b) => ({ ...b, y: b.y - 3 })).filter((b) => b.y > 5)
      );

      // Enemy bullets
      setEnemyBullets((bullets) =>
        bullets.map((b) => ({ ...b, y: b.y + 2 })).filter((b) => b.y < 95)
      );
    };

    const moveEnemies = () => {
      setEnemies((prevEnemies) => {
        if (prevEnemies.length === 0) return [];

        // Check if enemies need to change direction
        let changeDirection = false;
        let moveDown = false;
        const enemySpeed = prevEnemies[0].speed;

        // Find the leftmost and rightmost enemies to check boundaries
        const leftmostEnemy = Math.min(...prevEnemies.map((e) => e.x));
        const rightmostEnemy = Math.max(...prevEnemies.map((e) => e.x));

        if (
          (enemyDirection === "right" && rightmostEnemy > 90) ||
          (enemyDirection === "left" && leftmostEnemy < 10)
        ) {
          changeDirection = true;
          moveDown = true;
        }

        // Move enemies
        return prevEnemies.map((enemy) => {
          let newX = enemy.x;
          let newY = enemy.y;

          if (moveDown) {
            newY += 3; // Move down by 3%
          } else {
            newX += enemyDirection === "right" ? enemySpeed : -enemySpeed;
          }

          return { ...enemy, x: newX, y: newY };
        });
      });

      // If we need to change direction, do it after moving down
      if (
        enemies.some(
          (e) =>
            (enemyDirection === "right" && e.x > 90) ||
            (enemyDirection === "left" && e.x < 10)
        )
      ) {
        setEnemyDirection((dir) => (dir === "right" ? "left" : "right"));
      }
    };

    const enemyShooting = () => {
      if (enemies.length === 0) return;

      // Only allow 5 enemy bullets on screen at once
      if (enemyBullets.length >= 5) return;

      // Choose a random enemy to shoot
      const shooterIndex = Math.floor(Math.random() * enemies.length);
      const shooter = enemies[shooterIndex];

      setEnemyBullets((bullets) => [
        ...bullets,
        { id: Date.now(), x: shooter.x, y: shooter.y + 5 },
      ]);
    };

    const spawnPowerUp = () => {
      // 1% chance per frame to spawn a power-up
      if (Math.random() > 0.01) return;

      const powerUpTypes: PowerUpType[] = [
        "rapidFire",
        "shieldBoost",
        "freeze",
        "doublePoints",
        "lifeUp",
      ];

      const type =
        powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];

      setPowerUps((powerUps) => [
        ...powerUps,
        {
          id: Date.now(),
          x: 10 + Math.random() * 80,
          y: 10,
          type,
          speed: 0.5,
        },
      ]);
    };

    const movePowerUps = () => {
      setPowerUps((powerUps) =>
        powerUps
          .map((p) => ({ ...p, y: p.y + p.speed }))
          .filter((p) => p.y < 95)
      );
    };

    // Spawn UFO
    const spawnUfo = () => {
      if (ufo || Math.random() > 0.002) return;

      // Decide direction (left or right)
      const direction: Direction = Math.random() > 0.5 ? "right" : "left";

      setUfo({
        id: Date.now(),
        x: direction === "right" ? -5 : 105,
        y: 8,
        direction,
        speed: 0.7,
      });
    };

    // Move UFO
    const moveUfo = () => {
      if (!ufo) return;

      setUfo((prev) => {
        if (!prev) return null;

        const newX =
          prev.x + (prev.direction === "right" ? prev.speed : -prev.speed);

        // Remove if off-screen
        if (
          (prev.direction === "right" && newX > 105) ||
          (prev.direction === "left" && newX < -5)
        ) {
          return null;
        }

        return { ...prev, x: newX };
      });
    };

    // Update explosions
    const updateExplosions = () => {
      setExplosions((prev) =>
        prev
          .map((explosion) => ({
            ...explosion,
            particles: explosion.particles
              .map((p) => ({
                ...p,
                x: p.x + p.vx,
                y: p.y + p.vy,
                life: p.life - 1,
              }))
              .filter((p) => p.life > 0),
          }))
          .filter((explosion) => explosion.particles.length > 0)
      );
    };

    // Update score effects
    const updateScoreEffects = () => {
      setScoreEffects((prev) =>
        prev
          .map((effect) => ({
            ...effect,
            y: effect.y - 0.3,
            life: effect.life - 1,
          }))
          .filter((effect) => effect.life > 0)
      );
    };

    const checkCollisions = () => {
      // Player bullets hitting enemies
      setPlayerBullets((bullets) => {
        const remainingBullets = [...bullets];
        const hitEnemies = [...enemies];
        let scoreIncrease = 0;
        let powerUpSpawned = false;

        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i];
          let bulletHit = false;

          for (let j = hitEnemies.length - 1; j >= 0; j--) {
            const enemy = hitEnemies[j];

            // Simple collision detection
            const distance = Math.sqrt(
              Math.pow(bullet.x - enemy.x, 2) + Math.pow(bullet.y - enemy.y, 2)
            );

            if (distance < 5) {
              // Enemy hit
              if (enemy.health > 1) {
                // Enemy has multiple health
                hitEnemies[j] = { ...enemy, health: enemy.health - 1 };
              } else {
                // Enemy destroyed
                hitEnemies.splice(j, 1);
                scoreIncrease += enemy.value;

                // Create explosion
                const color =
                  enemy.type === "advanced"
                    ? "#f00"
                    : enemy.type === "medium"
                    ? "#ff0"
                    : "#f0f";
                createExplosion(enemy.x, enemy.y, color, enemy.value);

                // Chance to spawn power-up when enemy is destroyed
                if (!powerUpSpawned && Math.random() > 0.8) {
                  spawnPowerUp();
                  powerUpSpawned = true;
                }
              }

              bulletHit = true;
              remainingBullets.splice(i, 1);
              break;
            }
          }
        }

        if (scoreIncrease > 0) {
          const finalScore =
            activePowerUp === "doublePoints"
              ? scoreIncrease * 2
              : scoreIncrease;
          setScore((s) => s + finalScore);
        }

        setEnemies(hitEnemies);
        return remainingBullets;
      });

      // Player bullets hitting UFO
      if (ufo) {
        setPlayerBullets((bullets) => {
          const remainingBullets = [...bullets];

          for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];

            const distance = Math.sqrt(
              Math.pow(bullet.x - ufo.x, 2) + Math.pow(bullet.y - ufo.y, 2)
            );

            if (distance < 5) {
              // UFO hit
              setUfo(null);
              setScore((s) => s + 100);
              createExplosion(ufo.x, ufo.y, "#0ff", 100);
              remainingBullets.splice(i, 1);
              break;
            }
          }

          return remainingBullets;
        });
      }

      // Enemy bullets hitting player
      setEnemyBullets((bullets) => {
        const remainingBullets = [...bullets];

        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i];

          const distance = Math.sqrt(
            Math.pow(bullet.x - playerPosition, 2) + Math.pow(bullet.y - 90, 2)
          );

          if (distance < 5) {
            // Player hit
            setLives((l) => l - 1);
            createExplosion(playerPosition, 90, "#0ff");
            remainingBullets.splice(i, 1);
          }
        }

        return remainingBullets;
      });

      // Enemy bullets hitting shields
      setEnemyBullets((bullets) => {
        const remainingBullets = [...bullets];
        const updatedShields = [...shields];

        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i];
          let bulletHit = false;

          for (let j = 0; j < updatedShields.length; j++) {
            const shield = updatedShields[j];

            if (
              Math.abs(bullet.x - shield.position) < 5 &&
              bullet.y > 70 &&
              bullet.y < 75
            ) {
              // Shield hit
              updatedShields[j] = {
                ...shield,
                health: Math.max(0, shield.health - 10),
              };
              bulletHit = true;
              remainingBullets.splice(i, 1);
              break;
            }
          }
        }

        setShields(updatedShields);
        return remainingBullets;
      });

      // Player bullets hitting shields
      setPlayerBullets((bullets) => {
        const remainingBullets = [...bullets];
        const updatedShields = [...shields];

        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i];
          let bulletHit = false;

          for (let j = 0; j < updatedShields.length; j++) {
            const shield = updatedShields[j];

            if (
              Math.abs(bullet.x - shield.position) < 5 &&
              bullet.y < 75 &&
              bullet.y > 70
            ) {
              // Shield hit
              updatedShields[j] = {
                ...shield,
                health: Math.max(0, shield.health - 10),
              };
              bulletHit = true;
              remainingBullets.splice(i, 1);
              break;
            }
          }
        }

        setShields(updatedShields);
        return remainingBullets;
      });

      // Player collecting power-ups
      setPowerUps((powerUps) => {
        const remainingPowerUps = [...powerUps];

        for (let i = powerUps.length - 1; i >= 0; i--) {
          const powerUp = powerUps[i];

          const distance = Math.sqrt(
            Math.pow(powerUp.x - playerPosition, 2) +
              Math.pow(powerUp.y - 90, 2)
          );

          if (distance < 5) {
            // Power-up collected
            activatePowerUp(powerUp.type);
            createExplosion(powerUp.x, powerUp.y, "#0f0");
            remainingPowerUps.splice(i, 1);
          }
        }

        return remainingPowerUps;
      });

      // Check if enemies reached the bottom
      const enemyReachedBottom = enemies.some((e) => e.y > 80);
      if (enemyReachedBottom) {
        setLives(0);
      }
    };

    const checkGameState = () => {
      // Check for level complete
      if (enemies.length === 0) {
        setLevel((l) => l + 1);
        setPlayerBullets([]);
        setEnemyBullets([]);
        setShields(
          shields.map((s) => ({ ...s, health: Math.min(100, s.health + 30) }))
        );
        setUfo(null);
        initializeEnemies();
      }

      // Check for game over
      if (lives <= 0) {
        setGameState("gameOver");
      }
    };

    const gameLoop = (timestamp: number) => {
      // Frame rate control
      const deltaTime = timestamp - lastFrameTime.current;

      if (deltaTime > 1000 / frameRate) {
        movePlayer();
        moveBullets();
        moveEnemies();
        movePowerUps();
        moveUfo();
        updateExplosions();
        updateScoreEffects();

        // Enemy shooting with reduced frequency
        if (Math.random() > 0.98) {
          enemyShooting();
        }

        spawnUfo();

        checkCollisions();
        checkGameState();

        lastFrameTime.current = timestamp;
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [
    gameState,
    playerPosition,
    playerBullets,
    enemies,
    enemyDirection,
    enemyBullets,
    shields,
    lives,
    level,
    initializeEnemies,
    activePowerUp,
    powerUps,
    ufo,
  ]);

  // Activate power-up
  const activatePowerUp = (type: PowerUpType) => {
    setActivePowerUp(type);

    // Power-up effects
    switch (type) {
      case "rapidFire":
        setTimeout(() => setActivePowerUp(null), 10000);
        break;

      case "shieldBoost":
        setShields(
          shields.map((s) => ({ ...s, health: Math.min(100, s.health + 50) }))
        );
        setActivePowerUp(null);
        break;

      case "freeze":
        // Freeze enemies for 5 seconds
        setTimeout(() => setActivePowerUp(null), 5000);
        break;

      case "doublePoints":
        // Lasts until next hit
        break;

      case "lifeUp":
        setLives((l) => Math.min(5, l + 1));
        setActivePowerUp(null);
        break;

      default:
        setActivePowerUp(null);
    }
  };

  // Render game elements
  const renderEnemies = () => {
    return enemies.map((enemy) => (
      <div
        key={enemy.id}
        className={`enemy enemy-${enemy.type}`}
        style={{
          left: `${enemy.x}%`,
          top: `${enemy.y}%`,
          animation: activePowerUp === "freeze" ? "none" : undefined,
        }}
      ></div>
    ));
  };

  const renderBullets = () => {
    return (
      <>
        {playerBullets.map((bullet) => (
          <div
            key={bullet.id}
            className="bullet player-bullet"
            style={{
              left: `${bullet.x}%`,
              top: `${bullet.y}%`,
            }}
          />
        ))}
        {enemyBullets.map((bullet) => (
          <div
            key={bullet.id}
            className="bullet enemy-bullet"
            style={{
              left: `${bullet.x}%`,
              top: `${bullet.y}%`,
            }}
          />
        ))}
      </>
    );
  };

  const renderShields = () => {
    return shields.map((shield) => (
      <div
        key={shield.id}
        className="shield"
        style={{
          left: `${shield.position}%`,
          opacity: shield.health / 100,
          background: `linear-gradient(to right, #0f0 ${shield.health}%, #333 ${shield.health}%)`,
        }}
      />
    ));
  };

  const renderPowerUps = () => {
    return powerUps.map((powerUp) => (
      <div
        key={powerUp.id}
        className={`power-up power-up-${powerUp.type}`}
        style={{
          left: `${powerUp.x}%`,
          top: `${powerUp.y}%`,
        }}
      />
    ));
  };

  // Render UFO
  const renderUfo = () => {
    if (!ufo) return null;

    return (
      <div
        className="ufo"
        style={{
          left: `${ufo.x}%`,
          top: `${ufo.y}%`,
        }}
      />
    );
  };

  // Render explosions
  const renderExplosions = () => {
    return explosions.map((explosion) => (
      <div key={explosion.id}>
        {explosion.particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.life / 30,
            }}
          />
        ))}
      </div>
    ));
  };

  // Render score effects
  const renderScoreEffects = () => {
    return scoreEffects.map((effect) => (
      <div
        key={effect.id}
        className="score-effect"
        style={{
          left: `${effect.x}%`,
          top: `${effect.y}%`,
          opacity: effect.life / 60,
        }}
      >
        +{effect.value}
      </div>
    ));
  };

  const renderPowerUpIndicator = () => {
    if (!activePowerUp) return null;

    const powerUpInfo = {
      rapidFire: { name: "Rapid Fire", color: "#ff0" },
      shieldBoost: { name: "Shield Boost", color: "#0ff" },
      freeze: { name: "Enemy Freeze", color: "#0cf" },
      doublePoints: { name: "Double Points", color: "#f0f" },
      lifeUp: { name: "Extra Life", color: "#f00" },
    };

    const info = powerUpInfo[activePowerUp];

    return (
      <div
        className="power-up-indicator"
        style={{ backgroundColor: info.color }}
      >
        {info.name}
      </div>
    );
  };

  return (
    <div className="game-container">
      <div ref={gameRef} className={`game-screen ${gameState}`}>
        {/* Game UI */}
        <div className="game-ui">
          <div className="score">SCORE: {score}</div>
          <div className="lives">
            {Array.from({ length: lives }).map((_, i) => (
              <div key={i} className="life-icon">
                🛸
              </div>
            ))}
          </div>
          <div className="level">LEVEL: {level}</div>
          {renderPowerUpIndicator()}
        </div>

        {/* Game elements */}
        {renderShields()}
        {renderEnemies()}
        {renderBullets()}
        {renderPowerUps()}
        {renderUfo()}
        {renderExplosions()}
        {renderScoreEffects()}

        {/* Player */}
        <div className="player" style={{ left: `${playerPosition}%` }} />

        {/* Game state overlays */}
        {gameState === "menu" && (
          <div className="overlay menu-overlay">
            <h1>SPACE INVADERS REIMAGINED</h1>
            <p>Use ← → arrows to move, SPACE to fire</p>
            <p>Collect power-ups for special abilities</p>
            <button onClick={startGame}>START GAME</button>
            <p className="instructions">Press ENTER to start</p>
          </div>
        )}

        {gameState === "paused" && (
          <div className="overlay">
            <h2>GAME PAUSED</h2>
            <p>Press P to continue</p>
          </div>
        )}

        {gameState === "gameOver" && (
          <div className="overlay">
            <h2>GAME OVER</h2>
            <p>FINAL SCORE: {score}</p>
            <button onClick={startGame}>PLAY AGAIN</button>
            <p className="instructions">Press ENTER to restart</p>
          </div>
        )}
      </div>
    </div>
  );
}
