"use client";
import styled from "styled-components";
import { Particle } from "./types";
// --- Styled Components ---

// This replaces the need for an external CSS file for this component.
// Basic styling is assumed from the original class names.

export const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  font-family: "Courier New", Courier, monospace;
`;

export const GameScreen = styled.div`
  position: relative;
  width: 80vw;
  height: 90vh;
  max-width: 1000px;
  background-color: #111;
  border: 2px solid #333;
  overflow: hidden;
`;

export const GameUI = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  font-size: 1.5rem;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 200;

  h1 {
    font-size: 3rem;
    color: #0f0;
  }

  h2 {
    font-size: 2.5rem;
  }

  button {
    font-size: 1.5rem;
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #0f0;
    border: none;
    color: #000;
    cursor: pointer;
  }
`;

export const PlayerElement = styled.div.attrs<{ x: number }>((props) => ({
  style: {
    left: `${props.x}%`,
  },
}))`
  position: absolute;
  bottom: 5%;
  width: 40px;
  height: 20px;
  background-color: #0f0; /* Green player ship */
  transform: translateX(-50%);
`;

export const EnemyContainer = styled.div.attrs<{ x: number; y: number }>(
  (props) => ({
    style: {
      left: `${props.x}%`,
      top: `${props.y}%`,
    },
  })
)<{ isFrozen: boolean }>`
  position: absolute;
  width: 30px;
  height: 20px;
  background-color: #f0f; /* Basic enemy color */
  transform: translate(-50%, -50%);

  /* Logic moved from style tag */
  animation: ${(props) => (props.isFrozen ? "none" : "initial")};
`;

export const BulletElement = styled.div.attrs<{ x: number; y: number }>(
  (props) => ({
    style: {
      left: `${props.x}%`,
      top: `${props.y}%`,
    },
  })
)<{ bulletType: "player" | "enemy" }>`
  position: absolute;
  width: 4px;
  height: 12px;
  transform: translateX(-50%);

  /* Logic moved from className */
  background-color: ${(props) =>
    props.bulletType === "player" ? "#0ff" : "#f00"};
`;

export const ShieldElement = styled.div.attrs<{
  position: number;
  health: number;
}>((props) => ({
  style: {
    left: `${props.position}%`,
    opacity: props.health / 100,
  },
}))`
  position: absolute;
  bottom: 20%;
  width: 80px;
  height: 40px;
  background-color: #0f0;
  transform: translateX(-50%);
`;

export const ParticleElement = styled.div.attrs<{ p: Particle }>((props) => ({
  style: {
    left: `${props.p.x}%`,
    top: `${props.p.y}%`,
    width: `${props.p.size}px`,
    height: `${props.p.size}px`,
    backgroundColor: props.p.color,
    opacity: props.p.life / 30,
  },
}))`
  position: absolute;
  border-radius: 50%;
`;
