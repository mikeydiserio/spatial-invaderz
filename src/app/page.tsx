"use client";

import React, { useCallback, useEffect, useReducer, useRef } from "react";
import {
  Bullet,
  Enemy,
  Explosion,
  PowerUp,
  ScoreEffect,
  Shield,
  UFO,
} from "./types";

import { gameReducer, initialState } from "../reducer/reducer";

const MemoizedScoreEffect = React.memo(
  ({ effect }: { effect: ScoreEffect }) => (
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
  )
);

const MemoizedEnemy = React.memo(
  ({ enemy, isFrozen }: { enemy: Enemy; isFrozen: boolean }) => (
    <div
      className={`enemy enemy-${enemy.type}`}
      style={{
        left: `${enemy.x}%`,
        top: `${enemy.y}%`,
        animation: isFrozen ? "none" : "",
      }}
    >
      {/* <img alt="enemy-sprite" src={require("../icons/invader.svg")} /> */}
      {/* {getEnemy(enemy.type)} */}
    </div>
  )
);

const MemoizedBullet = React.memo(
  ({ bullet, type }: { bullet: Bullet; type: "player" | "enemy" }) => (
    <div
      className={`bullet ${type}-bullet`}
      style={{ left: `${bullet.x}%`, top: `${bullet.y}%` }}
    />
  )
);

const MemoizedShield = React.memo(({ shield }: { shield: Shield }) => (
  <div
    className="shield"
    style={{
      left: `${shield.position}%`,
      opacity: shield.health / 100,
    }}
  />
));

const MemoizedPowerUp = React.memo(({ powerUp }: { powerUp: PowerUp }) => (
  <div
    className={`power-up power-up-${powerUp.type}`}
    style={{ left: `${powerUp.x}%`, top: `${powerUp.y}%` }}
  />
));

const MemoizedUFO = React.memo(({ ufo }: { ufo: UFO }) => (
  <div className="ufo" style={{ left: `${ufo.x}%`, top: `${ufo.y}%` }} />
));

const MemoizedExplosion = React.memo(
  ({ explosion }: { explosion: Explosion }) => (
    <>
      {explosion.particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.life / 30,
          }}
        />
      ))}
    </>
  )
);
// SpaceInvaders.tsx

export default function SpaceInvaders() {
  // ... state and reducer ...
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const {
    gameState,
    score,
    lives,
    level,
    playerPosition,
    playerBullets,
    enemies,
    enemyBullets,
    shields,
    powerUps,
    ufo,
    explosions,
    scoreEffects,
    activePowerUp,
  } = state;

  const gameLoopRef = useRef<number>(0);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Add a ref to track the time of the last frame
  const lastFrameTimeRef = useRef<number>(0);

  // --- Main Game Loop ---
  const gameLoop = useCallback(() => {
    // Calculate delta time
    const now = performance.now();
    console.log("now", now);
    // Set a default deltaTime on the first frame to avoid a NaN spike
    const deltaTime = (now - (lastFrameTimeRef.current || now)) / 1000;
    lastFrameTimeRef.current = now;

    // Pass deltaTime in the action's payload
    dispatch({
      type: "GAME_TICK",
      payload: { keysPressed: keysPressed.current, deltaTime },
    });
    console.log("game tick", gameLoopRef.current);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, []); // Empty dependency array remains

  useEffect(() => {
    if (gameState === "playing") {
      // Reset last frame time when the game starts/resumes
      lastFrameTimeRef.current = performance.now();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, gameLoop]);

  // --- Keyboard Event Handlers ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
      if (e.key === " ") {
        e.preventDefault();
        dispatch({ type: "FIRE_BULLET" });
      }
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        dispatch({ type: "PAUSE_UNPAUSE" });
      }
      if (e.key === "Enter") {
        if (gameState === "menu" || gameState === "gameOver") {
          dispatch({ type: "START_GAME" });
        }
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
  }, [gameState]); // Dependency only on gameState to handle 'Enter' key contextually

  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, gameLoop]);

  return (
    <div className="game-container">
      <div className={`game-screen ${gameState}`}>
        {/* UI */}
        <div className="game-ui">
          <div className="score">SCORE: {score}</div>
          {/* <div className="lives">
            {Array.from({ length: lives }).map((_, i) => (
              <div key={i} className="life-icon">
                🛸
              </div>
            ))}
          </div> */}
          <div className="level">LEVEL: {level}</div>
        </div>
        {/* Game Elements using Memoized Components */}
        {shields.map(
          (shield) =>
            shield.health > 0 && (
              <MemoizedShield key={shield.id} shield={shield} />
            )
        )}
        {enemies.map((enemy) => (
          <MemoizedEnemy
            key={enemy.id}
            enemy={enemy}
            isFrozen={activePowerUp === "freeze"}
          ></MemoizedEnemy>
        ))}
        {playerBullets.map((bullet) => (
          <MemoizedBullet key={bullet.id} bullet={bullet} type="player" />
        ))}
        {enemyBullets.map((bullet) => (
          <MemoizedBullet key={bullet.id} bullet={bullet} type="enemy" />
        ))}
        {powerUps.map((powerUp) => (
          <MemoizedPowerUp key={powerUp.id} powerUp={powerUp} />
        ))}
        {ufo && <MemoizedUFO ufo={ufo} />}
        {explosions.map((exp) => (
          <MemoizedExplosion key={exp.id} explosion={exp} />
        ))}
        {scoreEffects.map((effect) => (
          <MemoizedScoreEffect key={effect.id} effect={effect} />
        ))}
        {/* Player */}
        <div className="player " style={{ left: `${playerPosition}%` }} />
        {gameState === "menu" && (
          <div className="overlay menu-overlay">
            <h1>SPACE INVADERS REIMAGINED</h1>
            <p>Use ← → arrows to move, SPACE to fire</p>
            <button onClick={() => dispatch({ type: "START_GAME" })}>
              START GAME
            </button>
          </div>
        )}
        {gameState === "paused" && (
          <div className="overlay">
            <h2>GAME PAUSED</h2>
          </div>
        )}
        {gameState === "gameOver" && (
          <div className="overlay">
            <h2>GAME OVER</h2>
            <p>FINAL SCORE: {score}</p>
            <button onClick={() => dispatch({ type: "START_GAME" })}>
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
