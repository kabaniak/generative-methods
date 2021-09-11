# Katrina Baniak - A4

**Particle 1: Asteroids**

Asteroids exist within an asteroid field, functioning much like the boids flock did. The UI controls for the asteroids are as follows:
* Buttons:
    * 'Asteroid' adds three asteroids to where the user clicks on the screen.
    * 'A Debug' draws the force arrows on all of the asteroids.
* Sliders:
    * 'astCohesion' controls the cohesion forces for the asteroid field, higher cohesion makes the asteroids come closer together.
    * 'astDrag' controls the drag forces, higher drag makes asteroids move less.
    * 'astWander' controls how much the separation forces, higher wander makes the asteroids spread out more.
Recommended settings for the asteroid field is low cohesion, medium drag, and high wander. This looks more like a real asteroid field!

**Particle 2: Meteors**

Three meteors are generated immediately at run time. Meteors move mainly vertically, randomly up or down with a velocity generated when they are created. When meteors pass close enough to the sun (located in the center of the screen), the sun's gravity acts on them. Sun gravitational forces pull meteors inward towards the sun. However, when a meteor comes too close to the sun it explodes into meteor fragments. The UI controls for the meteors are as follows:
* Buttons:
    * 'Meteors' adds a meteor to where the user clicks on the screen with a randomly generated velocity.
    * 'M Debug' draws the force arrows on all of the meteors. White is the 'forward go' force that propels the meteor through space, pink is the 'sun gravity' force that becomes active when close enough to the sun.
* Sliders:
    * 'sunGravity' controls the strength of the sun's gravitational pull, higher gravity will more dramatically pull meteors in towards the sun.

**Particle 3: Spacemen**

A space station is generated at a random position at run time and drifts through space across the canvas. Spacemen are little stick figure astronauts tethered to the space station. When the spacemen get too far from the space station, a pull back force activates to bring them in. The spacemen also have a human force that propels them in a randomly generated direction they're trying to go (because free will). The UI controls for the meteors are as follows:
* Buttons:
    * 'Space Man' adds a spaceman to where the user clicks on the screen. They have a randomly generated hue and a randomly generated human force.
    * 'SM Debug' draws the force arrows on all of the spacemen. White is the 'human' force that represents the spaceman's free will, pink is the 'pull back' force that becomes active when far enough from the space station
* Sliders:
    * None
