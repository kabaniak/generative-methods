let manCount = 0
class SpaceMan {
	constructor(position, spaceStation) {
		this.idNumber = manCount++

		// keep track of the space station its connected to
		this.home = spaceStation

		this.position = position || new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		// generate its start velocity
		let upDown = Math.random()*40
		if (upDown > 20){
			var rand = Math.random()*30
			this.velocity = new Vector(rand, rand + 90)
		}
		else {
			var rand = Math.random()*-30
			this.velocity = new Vector(rand, rand - 90)
		}

		// activates when its too far from the space station
		this.pullBack = new Vector(0,0)

		// space men are gonna spin
		this.angle = Math.random()*Math.PI*2

		// generate their stickman color
		this.hue = Math.random()*360

		// generate its individual human force - aka the free will force
		this.humanForce = new Vector(Math.random()*40 - Math.random()*40, Math.random()*40 - Math.random()*40)
	}

	update(t, dt) {
		let angle = this.velocity.angle

		// calculate the distance it is from its space station
		let xDist = this.home.position[0] - this.position[0]
		let yDist = this.home.position[1] - this.position[1]
		let dist = Math.sqrt(xDist*xDist + yDist*yDist)
		// if its far enough
		if (dist >= 150){
			// set the pullBack force to bring it back towards the space station
			this.pullBack = new Vector((this.home.position[0] - this.position[0]), (this.home.position[1] - this.position[1]))
		}
		else {
			// pull back force isn't active
			this.pullBack = new Vector(0,0)
		}

		// velocity will be combo of human force and the pull back
		this.velocity.addMultiples(this.humanForce, dt)
		this.velocity.addMultiples(this.pullBack, dt)
		this.position.addMultiples(this.velocity, dt)

		this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
		this.position[1] = (this.position[1] + simulationHeight)%simulationHeight

		this.velocity.mult(.99)
		this.velocity.clampMagnitude(10, 150)

		// rotate it!
		this.angle = this.angle + Math.PI/100

	}

	draw(p) {

		// draw its tether to the space station
		p.stroke("white")
		p.strokeWeight(2)
		p.line(this.home.position[0], this.home.position[1], this.position[0], this.position[1])

		p.push()
		p.translate(...this.position)
		p.rotate(this.angle)

		// head
		p.noStroke()
		p.fill(this.hue, 80, 70)
		p.ellipse(0,5,10)

		// body
		p.beginShape()
		p.vertex(-2,4)
		p.vertex(2,4)
		p.vertex(2,-12)
		p.vertex(-2,-12)
		p.endShape()

		// arm
		p.beginShape()
		p.vertex(-2,2)
		p.vertex(-8,-8)
		p.vertex(-6,-10)
		p.vertex(-2,-4)
		p.endShape()

		// arm
		p.beginShape()
		p.vertex(2,2)
		p.vertex(8,-8)
		p.vertex(6,-10)
		p.vertex(2,-4)
		p.endShape()

		//leg
		p.beginShape()
		p.vertex(-2,-11)
		p.vertex(-6,-22)
		p.vertex(-4,-24)
		p.vertex(0,-13)
		p.endShape()

		// leg
		p.beginShape()
		p.vertex(2,-11)
		p.vertex(6,-22)
		p.vertex(4,-24)
		p.vertex(0,-13)
		p.endShape()

		p.pop()


	}

	debugDraw(p) {

		let forceDrawMultiple = .4
		if (this.pullBack[0]!= 0){
			this.pullBack.drawArrow({
				p: p,
				arrowSize: 6,
				center: this.position,
				multiple: forceDrawMultiple,
				color: [290,100,50]
			})
		}

		this.humanForce.drawArrow({
			p: p,
			center: this.position,
			multiple: forceDrawMultiple*5,
			color: [0,0,90]
		})
	}
}
