

let asteroidCount = 0


let asteroid = class {
	constructor(astField, position, velocity) {
		// record its asteroid field
		this.astField = astField

		// Each asteroid gets a unique number,
		//  useful for giving each one its own behavior or label
		this.idNumber = asteroidCount++

		// Catch errors in case I pass something silly as an argument
		if (!Array.isArray(position))
			throw("position needs to be an array, got: " + position)
		if (!Array.isArray(velocity))
			throw("velocity needs to be an array, got:  " + velocity)


		this.position = position
		this.velocity = velocity

		this.forces = {
			cohesion: new Vector(0, 0),
			alignment: new Vector(0, 0),
			separation: new Vector(0, 0),
			selfPropulsion: new Vector(0, 0),
		}

		// used for drawing the asteroid, making it look rocky
		this. sides = Math.random()*5 + 8

	}

	toString() {
		return `asteroid${this.idNumber} p:(${this.position.toFixed(2)})  v:(${this.velocity.toFixed(2)})`
	}

	calculateForces(t, dt) {


		// This force pulls the asteroid toward the center of the astField
		this.forces.cohesion
			.setToDifference(this.position, this.astField.center)
			.mult(-.04* SLIDERS.astCohesion.value())

		// The addition of all forces relative to other asteroids
		this.forces.separation.mult(0)
		this.astField.asteroids.forEach(asteroid => {
			if (asteroid !== this) {
				let offset = Vector.getDifference(this.position, asteroid.position)
				let d = offset.magnitude
				let range = 50

				if (d < range) {
					let pushStrength = -40*(range - d)/range
					offset.normalize().mult(pushStrength)
					this.forces.separation.add(offset)
				}
			}
		})

		// make it wander more based on slider
		this.forces.separation.mult(SLIDERS.astWander.value())


		// The asteroid gets a boost in the direction of the astFields average speed
		this.forces.alignment.copy(this.astField.averageVelocity).mult(.5)

		// It also gets a boost in its own direction
		this.forces.selfPropulsion.setToPolar(10, this.velocity.angle)
	}


	// dt: 	How much time has elapsed?
	// t: 	What is the current time
	update(t, dt) {
		dt = Math.min(1, dt) // Don't ever update more than 1 second at a time, things get too unstable


		// Position2 = Position1 + (Elapsed time)*Velocity
 		this.position.addMultiples(this.velocity, dt)

 		// Add up all the forces
 		// Velocity2 = Velocity1 + (Elapsed time)*Force
 		for (let forceKey in this.forces) {
 			let force = this.forces[forceKey]
 			this.velocity.addMultiples(force, dt)
 		}

 		// Clamp the maximum speed, to keep the asteroids from running too fast (or too slow)
		this.velocity.clampMagnitude(4, 100)

 		// Apply some drag.  This keeps them from getting a runaway effect
 		let drag = 1 - SLIDERS.astDrag.value()
 		this.velocity.mult(drag)

 		// Wrap around
 		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight

 	}

	debugDraw(p) {

		let forceDisplayMultiple = 1

		// Get a list of all force names, then
		// for each one, draw the force
		Object.keys(this.forces).map((forceKey, index) => {
			let force = this.forces[forceKey]
 			force.drawArrow({
 				p:p,
 				arrowSize: 6,
 				center: this.position,
 				multiple: forceDisplayMultiple,
 				color: [index*30 + 240, 100, 70, 1],
 			})
		})
	}


	draw(p) {
		let size = 10 	// How big is this asteroid?

		p.push()

		p.translate(...this.position)
		p.rotate(this.velocity.angle)

		// we draw three gray layers to make it look shaded
		// layer 0, darkest
		let degInc = Math.PI*2/this.sides;
		p.stroke(2, "black")
		p.fill(0,0,40)
		p.beginShape()
		// for loop makes it rocky
		for (var i = 0; i < this.sides; i++){
			p.vertex(size*Math.cos(degInc*i)- .8 * i^2, size*Math.sin(degInc*i))
		}
			p.vertex(size*Math.cos(degInc*0), size*Math.sin(degInc*0))
		p.endShape()

		// layer 1, medium gray, smaller
		p.noStroke()
		p.fill(0,0,45)
		p.beginShape()
		size = 8
		for (var i = 0; i < this.sides; i++){
			p.vertex(size*Math.cos(degInc*i)- .8 * i^2, size*Math.sin(degInc*i))
		}
			p.vertex(size*Math.cos(degInc*0), size*Math.sin(degInc*0))
		p.endShape()

		// layer 2, lightest gray, smallest
		p.noStroke()
		p.fill(0,0,50)
		p.beginShape()
		size = 5
		for (var i = 0; i < this.sides; i++){
			p.vertex(size*Math.cos(degInc*i)- .8 * i^2, size*Math.sin(degInc*i))
		}
			p.vertex(size*Math.cos(degInc*0), size*Math.sin(degInc*0))
		p.endShape()

		// return to the original drawing position
		p.pop()

	}
};
