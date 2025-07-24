# Space Invaders - React & TypeScript Edition

A modern remake of the timeless arcade classic, *Space Invaders*, built from the ground up using modern web technologies. This project demonstrates advanced React state management, performance optimization for games, and component-based architecture.

@create-next-app was used to bootstrap the application.

No BS here just HTML vanilla CSS and JavaScript working together to stress your GPU out with this years second most computationally expensive re-release of an 80s game

# Note: App has been deployed as a page in github pages: https://mikeydiserio.github.io/spatial-invaderz

## Features

* **Dynamic Difficulty**: The entire alien formation speeds up as you defeat more invaders, creating a tense and challenging end-game for each level.
* **Level Progression**: Successfully clear a wave of invaders to advance to the next level, where the enemies start with a higher base speed.
* **Randomized Enemy Firing**: Enemies fire back at random intervals, with a limit on the number of hostile projectiles on-screen at once to maintain balanced gameplay.
* **Bonus UFO**: The classic UFO will periodically fly across the top of the screen, offering a high point bonus if you can shoot it down.
* **Rich Visual Feedback**:
    * **Particle Explosions**: Destroying ships results in a satisfying particle explosion, with more prominent effects for the player and UFO.
    * **Floating Score Text**: When an enemy is destroyed, the points gained float up from its location and fade out.
* **Performance-Optimized Game Loop**: The game logic is decoupled from the render cycle using `requestAnimationFrame` and a time-based delta (`dt`) for smooth, consistent movement across all hardware.

## How to play
The controls are simple and intuitive, designed to replicate the classic arcade feel.

* **Move Left**: `←` (Left Arrow Key)
* **Move Right**: `→` (Right Arrow Key)
* **Fire Bullet**: `Spacebar`
* **Pause/Unpause Game**: `P`


## Running the Project Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/space-invaders-react.git](https://github.com/your-username/space-invaders-react.git)
    cd space-invaders-react
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## Future Enhancements

This project provides a solid foundation for many more features:

* **Power-Ups**: Introduce collectible power-ups dropped by the UFO or special enemies (e.g., rapid-fire, player shield, temporary freeze).
* **High Score Leaderboard**: Implement a persistent high score system using `localStorage` or a backend service.
* **Sound Effects & Music**: Add classic 8-bit sound effects for shooting, explosions, and enemy movement, along with background music.
* **Mobile & Touch Controls**: Add on-screen buttons and swipe controls to make the game playable on mobile devices.
* **More Enemy Variety**: Introduce new enemy types with different movement patterns or firing behaviors.

## Controls

- **Arrow Keys:** Move and rotate your ship
- **Spacebar:** Shoot bullets
- **R:** Restart after Game Over

## Project Structure
```
/src
|-- /app
|   |-- page.tsx             # Main React component for the game
|   |-- types.ts             # All TypeScript type and interface definitions
|-- /reducers
|   |-- reducers.tsx         # The core game logic reducer
|-- README.md                # This file
```
## License

MIT

---

Made with ❤️  by mikey who was procrastinating actual useful development in order to make this a thing.
