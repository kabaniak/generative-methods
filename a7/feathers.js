

class Feathers {
	constructor(aof) {

		// all of my slider value fields
		this.aof = aof
		this.center = new Vector()
		this.stripe1 = 0
		this.stripe2 = 0
		this.strLen = 10
		this.height = 200
		this.bend = 70
		this.dense = 70
		this.thick = 40
		this.fluff = 30
		this.numFluffs = 5
		this.fluffVar = 5
	}


	update(t, dt) {
		//update vars with current value of aof
		let hue1 = this.aof.get("hue 1")
		let hue2 = this.aof.get("hue 2")
		let hei = this.aof.get("height")
		let den = this.aof.get("density")
		let b = this.aof.get("bend")
		let th = this.aof.get("width")
		let len = this.aof.get("stripe length")
		let flv = this.aof.get("fluff var")
		let flN = this.aof.get("fluff num")

		// Update fields with corresponding vals
		this.stripe1 = (360*hue1) % 360
		this.stripe2 = (360*hue2) % 360
		this.height = hei*220 + 80
		this.dense = den*110 + 40
		this.bend = (.5 - b) * 250
		this.thick = th * 70 + 20
		this.strLen = len * 20 + 1
		this.fluffVar = flv * 50 + 10
		this.numFluffs = flN * 30

	}

	draw(p) {
		p.push()

		// make center stick
		let pt0 = [0,0]
		let pt1 = [0, -this.height]
		let cp0 = [this.bend, -this.height / 3]
		let cp1 = [-this.bend, 2 * -this.height / 3]

		p.strokeWeight(5)
		p.stroke(0,0,100)
		p.noFill()
		p.bezier(...pt0, ...cp0, ...cp1, ...pt1)

		// next calculate bezier curve for the left side bristles
		let t1 = (.05 * this.dense) / this.dense
		let min = 1 - t1
		let xbeg = min*min*min*pt0[0] + 3*min*min*t1*cp0[0] + 3*min*t1*t1*cp1[0] + t1*t1*t1*pt1[0]
		let ybeg = min*min*min*pt0[1] + 3*min*min*t1*cp0[1] + 3*min*t1*t1*cp1[1] + t1*t1*t1*pt1[1]
		let p0 = [xbeg,ybeg]
		let p1 = [0, -this.height]
		let c0 = [this.bend-this.thick / 1.5, -this.height / 3 ]
		let c1 = [-this.bend-this.thick / 1.5, 2 * -this.height / 3]

		// draw the left side
		p.stroke(this.stripe1, 60, 80)
		p.strokeWeight(1)

		let count = 0
		let str1 = true
		for(let t = 0; t < this.dense - 8; t++){
			// determines when you need to switch stripe color
			if (count >= this.strLen){
				if(str1){
					p.stroke(this.stripe2, 60, 60)
					str1 = false
				}
				else{
					p.stroke(this.stripe1, 60, 80)
					str1 = true
				}
				count = 0
			}

			// calculate where we are in the bezier curve on stick
			// if at bottom of feather, change it a little so we have some plain stick part
			let par = t / this.dense
			if ( t < this.dense * .1 )
				par = (this.dense*.1) / this.dense
			let sub = 1 - par

			let x = sub*sub*sub*pt0[0] + 3*sub*sub*par*cp0[0] + 3*sub*par*par*cp1[0] + par*par*par*pt1[0]
			let y = sub*sub*sub*pt0[1] + 3*sub*sub*par*cp0[1] + 3*sub*par*par*cp1[1] + par*par*par*pt1[1]

			// calculate outside pt for bristle
			par = (t+8) / this.dense
			sub = 1 - par
			let x1 = sub*sub*sub*p0[0] + 3*sub*sub*par*c0[0] + 3*sub*par*par*c1[0] + par*par*par*p1[0]
			let y2 = sub*sub*sub*p0[1] + 3*sub*sub*par*c0[1] + 3*sub*par*par*c1[1] + par*par*par*p1[1]

			p.line(x,y, x1, y2)
			count++
		}

		// now we switch to the right side's bezier curve
		c0 = [this.bend+this.thick, -this.height / 3 ]
		c1 = [-this.bend+this.thick, 2 * -this.height / 3]

		p.stroke(this.stripe1, 60, 80)
		count = 0
		str1 = true
		for(let t = 0; t < this.dense - 8; t++){
			// stripe change calculations
			if (count >= this.strLen){
				if(str1){
					p.stroke(this.stripe2, 60, 60)
					str1 = false
				}
				else{
					p.stroke(this.stripe1, 60, 80)
					str1 = true
				}
				count = 0
			}

			// calculate inner stick point
			// again leave some blank stick space at the bottom
			let par = t / this.dense
			if ( t < this.dense * .1 )
				par = (this.dense*.1) / this.dense
			let sub = 1 - par

			let x = sub*sub*sub*pt0[0] + 3*sub*sub*par*cp0[0] + 3*sub*par*par*cp1[0] + par*par*par*pt1[0]
			let y = sub*sub*sub*pt0[1] + 3*sub*sub*par*cp0[1] + 3*sub*par*par*cp1[1] + par*par*par*pt1[1]

			// calculate the outer bristle
			par = (t+8) / this.dense
			sub = 1 - par
			let x1 = sub*sub*sub*p0[0] + 3*sub*sub*par*c0[0] + 3*sub*par*par*c1[0] + par*par*par*p1[0]
			let y2 = sub*sub*sub*p0[1] + 3*sub*sub*par*c0[1] + 3*sub*par*par*c1[1] + par*par*par*p1[1]

			p.line(x,y, x1, y2)
			count++
		}

		// draw poofy bottom
		p.stroke(0,0, 100, .7)

		// first find where they connect to stick
		t1 = (.07 * this.dense) / this.dense
		min = 1 - t1
		xbeg = min*min*min*pt0[0] + 3*min*min*t1*cp0[0] + 3*min*t1*t1*cp1[0] + t1*t1*t1*pt1[0]
		ybeg = min*min*min*pt0[1] + 3*min*min*t1*cp0[1] + 3*min*t1*t1*cp1[1] + t1*t1*t1*pt1[1]
		let base = [xbeg,ybeg]
		let numFluffs = this.numFluffs / 2

		// draw the individual fluffs
		for (let i = 0; i < numFluffs; i++){
			// calc length based on variation
			let fvar = this.fluffVar* (i%4) / 3
			let ang = (3* Math.PI / 7) * i / numFluffs + .2

			// left side
			let end = [xbeg + (fvar + this.fluff) * Math.cos(ang), ybeg - (20+fvar)*Math.sin(ang)]
			let cp = [xbeg + (fvar + this.fluff/2) * Math.cos(ang), ybeg - (30+fvar)*Math.sin(ang)]

			p.bezier(...base, ...cp, ...cp, ...end)

			// right side
			ang = (Math.PI / 3) * i / numFluffs +.2

			end = [xbeg - (fvar + this.fluff) * Math.cos(ang), ybeg - (20+fvar)*Math.sin(ang)]
			cp = [xbeg - (fvar+ this.fluff/2) * Math.cos(ang), ybeg - (30+fvar)*Math.sin(ang)]

			p.bezier(...base, ...cp, ...cp, ...end)
		}

		p.pop()
	}
}


// Static properties for this class
Feathers.landmarks = {
	"Candy Cane": [0.64,0.57,0.94,0.52,0.99,0.01,0.01,0.95,0.86],
	"Succulent": [0.23,0.18,0.30,0.93,0.18,0.26,0.05,0.03,0.54],
	"Monsters Inc.": [0.59,0.51,0.51,0.40,0.49,0.84,0.81,0.52,0.76],
	"GO NU": [1.00,0.88,0.81,0.45,0.75,0.75,0.33,0.32,0.40],
	"Cotton Candy": [0.05,0.97,0.26,0.96,0.87,0.63,0.00,1.00,1.00],
	"Something Blue": [0.34,0.17,0.18,0.36,0.44,0.57,0.00,0.20,0.51]
}
Feathers.labels = ["density", "height", "bend", "width", "hue 1", "hue 2", "stripe length", "fluff var", "fluff num"]
