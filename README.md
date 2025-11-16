# Space Invaders - React & TypeScript Edition
I've remade space invaders as a web app as a means of testing my own skills and jsut seeing what was possible when using JS to build games.

No BS here just HTML vanilla CSS and JavaScript working together to stress your GPU out with this years second most computationally expensive re-release of an 80s game

# Note: App has been deployed as a page in github pages: https://mikeydiserio.github.io/spatial-invaderz

## Features
- Game plays just as you would expect for the most part. There are no levels though, only a single iteration that you can play through. 

- Shields work but you cant shooty through them like you do in the actual game, that would involve re doing the entire shield code and I ceebs doing that.

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

Do whatever you want with this 🎉

---

Made with ❤️  by mikey who was procrastinating actual useful development in order to make this a thing.
