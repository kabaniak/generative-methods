let meteorCount = 0
class Meteor {
	constructor(position) {
		this.idNumber = meteorCount++

		// generate its velocity up or down
		// generate the forward Go force (like thrust basically so it doesn't slow too much)
		this.position = position || new Vector(Math.random()*simulationWidth, Math.random()*simulationHeight)
		let upDown = Math.random()*40
		if (upDown > 20){
			var rand = Math.random()*30
			this.velocity = new Vector(rand, rand + 150)
			this.forwardGo = new Vector (rand, rand + 140)
		}
		else {
			var rand = Math.random()*-30
			this.velocity = new Vector(rand, rand - 150)
			this.forwardGo = new Vector (rand, rand - 140)
		}

		// sun pull is 0 by default
		this.sunPull = new Vector(0, 0)

		this.flameAnimation = 0

		this.trail = []

		// records if its hit the sun, and how long ago
		this.alive = true
		this.deadCount = 0
	}

	update(t, dt) {
		let angle = this.velocity.angle

		// if its not alive all we do is update how long its been dead
		if (!this.alive){
			this.deadCount ++
			return
		}


		this.flameAnimation += dt*2

		// adjust forward go every once in a while
		if (dt % 5 == 0)
			this.forwardGo = new Vector (Math.random()*150 - Math.random()*100, this.forwardGo[1])

		// determine what dist from sun is and update sunpull accordingly
		let sunG = SLIDERS.sunGravity.value() / 10
		let xDist = simulationWidth/2 - this.position[0]
		let yDist = simulationHeight/2 - this.position[1]
		let dist = Math.sqrt(xDist*xDist + yDist*yDist)
		if (dist <= 45){
			// its hit the sun and is now dead
			this.alive = false
			this.deadCount ++
		}
		else if( dist <= 200){
			// sun pull is active because its close enough
			this.sunPull = new Vector(sunG*(200-dist)/200 *(simulationWidth/2 - this.position[0]), 0)
		}
		else {
			// sun pull is no longer active
			this.sunPull = new Vector(0,0)
		}

		// its alive so change its velocity and position
		if (this.alive){
			this.velocity.addMultiples(this.sunPull, dt)
			this.velocity.addMultiples(this.forwardGo, dt)
			this.position.addMultiples(this.velocity, dt)

			this.position[0] = (this.position[0] + simulationWidth)%simulationWidth
			this.position[1] = (this.position[1] + simulationHeight)%simulationHeight

			this.velocity.mult(.99)
			this.velocity.clampMagnitude(10, 150)

			// Store a trail that is 80? long
			this.trail.push(this.position.slice(0))
			this.trail = this.trail.slice(this.trail.length - 120)
		}

	}

	draw(p) {

		// not alive, draw the little exploding chunk animation
		if (!this.alive){
			if (this.deadCount > 7)
				return
			p.push()
			p.translate(...this.position)
			let chunks = 12
			let dist = this.deadCount*5 + 5
			for(var i=0; i<chunks; i++){
				p.fill(0,0,30,(35 - dist)/30)
				p.ellipse(dist*Math.cos(Math.PI*2*i/chunks), dist*Math.sin(Math.PI*2*i/chunks), 4)
			}

			p.pop()
			return
		}

		p.push()
		p.translate(...this.position)
		p.rotate(this.velocity.angle)

		// draw the fire trail (although not scientifically accurate since no oxygen in space)
		let t = this.flameAnimation
		let flameCount = 7
		p.scale(4, 4*.4)
		for (var i = 0; i < flameCount; i++) {
			let pct = ((i + t*10)%flameCount)/flameCount
			let r = (Math.sin(pct*Math.PI))*(1-pct)
			p.fill(50 - pct*50, 100, 50)
			p.noStroke()
			p.ellipse(-pct*50, pct*Math.sin(i*3 + t), r*40, r*15)
		}

		// draw the meteor itself
		p.pop()
		p.push()
		p.translate(...this.position)
		p.rotate(this.velocity.angle)
		p.stroke(2, "black")
		p.fill(0, 0, 30)
		p.ellipse(0, 0, 20)

		p.pop()


	}

	debugDraw(p) {
		// no forces to draw if its dead
		if (!this.alive)
			return

		let forceDrawMultiple = .4
		if (this.sunPull[0]!= 0){
			this.sunPull.drawArrow({
				p: p,
				arrowSize: 6,
				center: this.position,
				multiple: forceDrawMultiple*3,
				color: [290,100,50]
			})
		}

		this.forwardGo.drawArrow({
			p: p,
			center: this.position,
			multiple: forceDrawMultiple,
			color: [0,0,90]
		})
	}
}
