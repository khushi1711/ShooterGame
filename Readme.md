
# Shooters

Our savior, Sentinel Seahorse, is on a voyage to outer space. During his journey, he comes across alien fish monsters approaching our beloved Earth to attack. Sentinel Seahorse is all set to take a battle against them. Help him by guiding him in this battle and protecting our Earth. 

## Rules

- Game time limit is 60s, ie. 1min
- You need to score at least 300 points to win the game
- You will provide with 20 ammo initially.
  - Every 300ms 1 ammo is refilled
  - Maximum ammo capacity is 50.
  - Each ammo has 1 live point
- There are 4 types of alien Fish Monsters
  - Angler: It has 2 live points and gives 2 score points
  - Big Angler: It has 3 live points and gives 3 score points
  - Drone: It has 3 live points and gives 3 score points
  - Lucky: It has 3 live points and gives 15 score points
- Collision with alien Fish Monster decreases score by 1 point except for Lucky FIsh Monster.
- Collision with Lucky Fish Monster (shinny body), power ups the Sentinel Seahorse.
- In powered up mode ammo fills faster than normal mode and max ammo capacity increases.
- Power up mode lasts for 8 seconds.

## For Developers

Build using vanilla javascript. Bundled using webpack.

### Code structure

- src/ : It contains all the required script files.
- server.js : It hosts prod build file to localhost.
- webpack.\*.js : It contains the bundling rules for each environment
- src/index.js - It is the main runner fucntion.
- src/index.html - It is contains the html structure of the webpage
- src/styles/styles.css - It contains the styles.

### Game Components

- Game - It controls and updates game.
  - It has 6 methods:
    - update: Updates all the game components
    - draw: Draws all the game components
- Player
  - It has 5 methods:
    - updatePosition: Updates the position and state of the player
    - draw: Draws the player in th canva
    - shootTop: Shoots the projectile, handles the all the projectiles states and ammo states
    - shootDown: Same as shootTop, it should only be called on power up state of the player
    - enterPowerUp: Updates the power up state of the player
- Enemy
  - It is the base class for all the alien Fish Monsters
  - update: Updates the state and position
  - draw: Draws the component in the canva
    - Angler
    - BigAngler
    - Drone
    - Lucky
- InputHandler - Handles keyboard input
- Particles - Handles the falling particles of enemy
  - It has 2 methods:
    - update: Updates the particle's speed, position, rotation and state
    - draw: Draws the particle in the canva
- Projectile - It resembles the shooting bullet of the player
  - It has 2 methods
    - update: Updates the projecticle's speed, position and state
    - draw: Draws the projecticle in the canva
  - A new projectile instance is pushed to projectiles array property of player
- Sound - Handles Sound on interaction
  - It has 5 methods:
    - powerUp - sound for power up
    - powerDown - sound for power down
    - explosion - sound on enermy kill
    - shot - sound on projectile fire
    - hit - sound on projectiile hit
- Layer - Handles the a layer
  - It has 2 methods:
    - update - updates the property of layer
    - draw - draws the layer
  - There are 4 layers which makes the complete background
- Background - Handles the all the layers and provides the background
  - It has 2 methods:
    - update: Updates the state of each layer
    - draw: Draws the background using layers
  - It uses an array to store all the different layers
- Ui - Handles the messages
  - It has 1 method
    - draw - Draws the message in the canva element

**Note:** All draw function takes input context. This context refers to the canva 2D context.

`draw(context) `

### New Ideas

- Add level up in the game, making it difficult with each level
- Bring new enemy, feature, interaction.
- Style the webpage
- Maintain global highscore

### Dev Guide

- Please add a descriptive commit message
  - add(feat): your message
  - fix(bug/issue): your message
  - update(feat): your message
- Please a separate branch for each new changes, with well descriptive branch name
  - Use snake case naming for branch
- Use standard code style
