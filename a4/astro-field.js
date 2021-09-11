// Track a bunch of asteroids

class astroField {
	constructor() {
		this.asteroids = []
		this.averageVelocity = new Vector(0, 0)
		this.center = new Vector(0, 0)

		for (var i = 0; i < asteroidParticlesStartCount; i++) {
			this.addasteroid()
		}

	}

	// Create a asteroid at this position (or if none, )
	addasteroid(position, velocity) {
		if (!position)
			position = Vector.random([0,simulationWidth],[0,simulationHeight])
		if (!velocity)
			velocity = Vector.randomPolar(40)

		let aster = new asteroid(this, position, velocity)
		this.asteroids.push(aster)
	}


	update(t, dt) {


		// Update the flock data

		// Set the center to the average of all asteroids, for cohesion

		this.center = Vector.average(this.asteroids.map(b => b.position))


		// Set the average velocity (add them all up, divide by the size)
		this.averageVelocity = Vector.average(this.asteroids.map(b => b.velocity))



		// // The asteroids need their flock in order to calculate forces
		this.asteroids.forEach(b => b.calculateForces(t, dt))

		// // Update each asteroid
		this.asteroids.forEach(b => b.update(t, dt))
	}

	draw(p) {
		this.asteroids.forEach(asteroid => asteroid.draw(p))
	}

	debugDraw(p) {
		// field data
		p.noFill()
		p.stroke(0, 100, 40)
		p.circle(...this.center, 5)

		p.strokeWeight(5)
		this.averageVelocity.drawArrow({
			p:p,
			arrowSize: 14,
			color: [0, 100, 20, .3],
			multiple: 4,
			center: this.center
		})

		p.strokeWeight(1)
		this.asteroids.forEach(b => b.debugDraw(p))
	}

}
