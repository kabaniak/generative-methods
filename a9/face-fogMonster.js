
// Creepy fog monster mask

masks.fogMonster = function( p, t) {
	let back = SLIDER.Background * 60
	p.background(back)

	back = SLIDER.Background * 40 + 70
	p.fill(back, .03)
	p.noStroke()

	let cent = face.center

	// draw halo effect behind center of face
	for(let i = 0; i<30; i++){
		p.ellipse(cent.coords[0], cent.coords[1] + 50, i*15 + 10)
	}

	// faceShade is base middle color for all
	let faceShade = SLIDER.FaceShade * 50 + 20
	face.sideOrder.forEach(side => {

		p.noFill()
		p.noStroke()

		// outline of one side of the face
		let outlinePoints = side.faceRings[0].concat(face.centerLine.slice().reverse()).slice(0, 20)

		//draw misty face background (same shade as outer face ring (the lightest one))
		for(let i = 0; i<10; i++){
			p.fill(faceShade + 10, .15 - i*.01)
			let tempPoints = outlinePoints.map((pt,index) => {
				let pt2 = new Vector()
				pt2.setToLerp(face.center, pt, 1 + .03*i)
				return pt2
			})
			drawContour(p, tempPoints)
		}

		// draw face rings, outside one is lightest
		for(let i = 0; i<3; i++){
			p.fill(faceShade + 10- i*5, .4)
			let outlinePoints = side.faceRings[i].concat(face.centerLine.slice().reverse())
			drawContour(p, outlinePoints)
		}

		// draw the eye rings
		// outer is the faceShade
		// deepSet determines how high the contrast is (makes inner much darker)
		let deepSet = SLIDER.DeepEyes * 10
		for(let i = 0; i<4; i++){
			p.fill(faceShade  - i*deepSet)
			drawContour(p, side.eyeRings[i])
		}

		// draws the pupil
		// glowy effect w the opacity
		for(let i = 0; i<5; i++){
			p.fill(80 + 5*i, .4)
			side.eye.draw(p, 12 - 2*i)
		}

	})

	// draw the outside line on the mouth (lighter than the inner mouth)
	p.fill(faceShade - 15)
	let outlinePoints = face.mouth[2]
	drawContour(p, outlinePoints)

	// the inner mouth color (darkest usually)
	p.fill(15)
	outlinePoints = face.mouth[3]
	drawContour(p, outlinePoints)

	// drawing the teeth
	p.fill(100)
	outlinePoints = face.mouth[2].slice(2,9)
	let teeth = SLIDER.TeethLength * 36
	// if slider is low enough, draw no teeth
	if(teeth >= 3){
		// draw the upper teeth
		for(let i = 0; i<outlinePoints.length; i++){
			p.beginShape()
			p.vertex(outlinePoints[i].coords[0] - 2, outlinePoints[i].coords[1])
			p.vertex(outlinePoints[i].coords[0] - 1, outlinePoints[i].coords[1] - 2)
			p.vertex(outlinePoints[i].coords[0] + 1, outlinePoints[i].coords[1] - 2)
			p.vertex(outlinePoints[i].coords[0] + 2, outlinePoints[i].coords[1])
			p.vertex(outlinePoints[i].coords[0] , outlinePoints[i].coords[1] + teeth)
			p.endShape()
		}
		// draw the lower teeth
		outlinePoints = face.mouth[2].slice(12,face.mouth[1].length - 1)
		for(let i = 0; i<outlinePoints.length; i++){
			p.beginShape()
			p.vertex(outlinePoints[i].coords[0] - 2, outlinePoints[i].coords[1])
			p.vertex(outlinePoints[i].coords[0] - 1, outlinePoints[i].coords[1] + 2)
			p.vertex(outlinePoints[i].coords[0] + 1, outlinePoints[i].coords[1] + 2)
			p.vertex(outlinePoints[i].coords[0] + 2, outlinePoints[i].coords[1])
			p.vertex(outlinePoints[i].coords[0] , outlinePoints[i].coords[1] - teeth)
			p.endShape()
		}
	}

	//hands
	// points in the palm
	let nums = [0, 1, 2, 5, 9, 13, 17]

	// for each hand
	for(let i = 0; i< 2; i++){
		// make the outline of the palm
		outlinePoints = hand[i].points.slice(0,2);
		outlinePoints = outlinePoints.concat(hand[i].points[5])
		outlinePoints = outlinePoints.concat(hand[i].points[9])
		outlinePoints = outlinePoints.concat(hand[i].points[13])
		outlinePoints = outlinePoints.concat(hand[i].points[17])
		outlinePoints = outlinePoints.concat(hand[i].points[0])

		// misty edges for palm of hand
		for( let j = 0; j < 10; j++){
			let tempPts = outlinePoints.map((pt, index) => {
				let pt2 = new Vector()
				pt2.setToLerp(hand[i].center, pt, 1 + .03*j)
				pt2[0] *= 1.2
				return pt2
			})

			p.fill(faceShade, .08)
			p.noStroke()
			drawContour(p, tempPts)
		}


		// draw the inner palm
		p.fill(faceShade, .1)
		p.noStroke()
		drawContour(p, outlinePoints)


		p.fill(faceShade, .2)
		// draw the fingers
		// for each finger
		for(let j = 0; j< hand[i].fingers.length; j++){
			// line through center will be more solid
			p.stroke(faceShade, .7)
			p.strokeWeight(3)

			// draw fuzzy edges for the fingers
			for(let wid = 0; wid< 8; wid++){
				for(let w = 0; w<hand[i].fingers[j].length - 1; w++){
					p.line(hand[i].fingers[j][w].coords[0], hand[i].fingers[j][w].coords[1], hand[i].fingers[j][w+1].coords[0], hand[i].fingers[j][w+1].coords[1])
					//p.ellipse(hand[i].fingers[j][w].coords[0], hand[i].fingers[j][w].coords[1], 2, 10)
				}
				// increase the stroke weight (fuzzy edge)
				p.stroke(faceShade, .1)
				p.strokeWeight(wid*3+2)
			}

			// draw more solid line from base of finger to wrist too
			p.stroke(faceShade, .7)
			p.strokeWeight(3)
			p.line(hand[i].fingers[j][0].coords[0], hand[i].fingers[j][0].coords[1], hand[i].wrist.coords[0], hand[i].wrist.coords[1])

		}

		//draw claws
		p.fill(100)
		p.noStroke()
		let clawLen = SLIDER.ClawLength * 80 + 20
		for(let j = 0; j< hand[i].fingers.length; j++){
			let tip = hand[i].fingers[j][3]
			let last = hand[i].fingers[j][2]

			let ang = tip.angleTo(last)

			// make new tip an extension of the last line
			let newT = [tip.coords[0] +Math.cos(ang)*clawLen, tip.coords[1] + Math.sin(ang)*clawLen]

			tip = tip.coords
			// if nails are facing up
			if((tip[1] - newT[1]) > 0){
				p.beginShape()
				p.vertex(tip[0] - 4, tip[1])
				p.vertex(tip[0] - 2, tip[1] + 2)
				p.vertex(tip[0] + 2, tip[1] + 2)
				p.vertex(tip[0] + 4, tip[1])
				p.vertex(newT[0] , newT[1] )
				p.endShape()
			} // if nails are facing down
			else {
				p.beginShape()
				p.vertex(tip[0] - 4, tip[1])
				p.vertex(tip[0] - 2, tip[1] - 2)
				p.vertex(tip[0] + 2, tip[1] - 2)
				p.vertex(tip[0] + 4, tip[1])
				p.vertex(newT[0] , newT[1] )
				p.endShape()
			}

		}
	}
}
