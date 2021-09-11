let satCount = 0
class Satellite {
	constructor(position) {
		this.idNumber = satCount++

		// position and velocity are kinda random
		// no forces, but we want it to move so it has a velocity
		this.position = position || new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		this.velocity = new Vector(Math.random()*30+60, Math.random()*30+60)

		// keeps track of angle to make it spin!
		this.angle = Math.random()*Math.PI*2
	}

	update(t, dt) {
		this.position.addMultiples(this.velocity, dt)

		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight

		// increading the divided number makes it spin slower
		this.angle = this.angle + Math.PI/110

	}

	draw(p) {

		p.push()
		p.translate(...this.position)
		p.rotate(this.angle)

		// draw the main satellite body
		p.noStroke()
		p.fill(0, 0, 40)
		p.beginShape()

		p.vertex(-30, 5)
		p.vertex(30, 5)
		p.vertex(30, -5)
		p.vertex(-30, -5)
		p.endShape()

		// draw the lighter gray pieces
		// makes it look like a satellite
		p.fill(0,0,70)
		p.beginShape()
		p.vertex(-17, 15)
		p.vertex(-13, 15)
		p.vertex(-13, -15)
		p.vertex(-17, -15)
		p.endShape()

		p.beginShape()
		p.vertex(-24, 15)
		p.vertex(-20, 15)
		p.vertex(-20, -15)
		p.vertex(-24, -15)
		p.endShape()

		p.beginShape()
		p.vertex(17, 15)
		p.vertex(13, 15)
		p.vertex(13, -15)
		p.vertex(17, -15)
		p.endShape()

		p.beginShape()
		p.vertex(24, 15)
		p.vertex(20, 15)
		p.vertex(20, -15)
		p.vertex(24, -15)
		p.endShape()

		p.pop()


	}
}
