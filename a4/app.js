

// Outermost scope,
// You can access these variables from *anywhere*, in fxns, or in html

// These get created when P5 is initialized
let SLIDERS = {

}

let FLAGS = {
	drawAstDebug: false,
	drawMeteorDebug: false,
	drawSpaceManDebug: false,
}


let drawMode = "asteroid"

// Pause button, also pause on spacebar
let paused = false
document.onkeyup = function(e){
    if(e.keyCode == 32){
        paused = !paused
    }
}



// Store our two Processing instances in the global scope
// so we can refer to them seperately when we want
let mainP5 = undefined
let lightmap = undefined


let simulationWidth = 600
let simulationHeight = 360


// an object to hold asteroids and the field
const asteroidParticlesStartCount = 0
let astField = new astroField()

//meteor holder
const meteorStartCount = 3
let meteors = []
for (var i = 0; i < meteorStartCount; i++) {
	meteors.push(new Meteor())
}

// space man holder
let spaceMen = []

// satellite holder, only one for how it is now
let satellites =[]
satellites.push(new Satellite())

// Moving noise into the global scope so its not attached to P5
let noise = function() {
	console.warn("Noise not yet initialized")
}



// Create a p5 slider, but ALSO, label it and append it to the controls object
function createSlider({label, min,max, defaultValue, step=1}) {
	SLIDERS[label] = mainP5.createSlider(min, max, defaultValue, step)

	let controls = document.getElementById("controls")
	let holder = document.createElement("div");
	holder.className = "slider"
	holder.innerHTML = label

	// Add things to the DOM
	controls.append(holder)
	holder.append(SLIDERS[label].elt)
}

// random point returns a point somewhere in this processing object
function randomPoint(p) {
	return [(Math.random())*p.width, (Math.random())*p.height]
}



// Do setup
document.addEventListener("DOMContentLoaded", function(){
	console.log("Steering")



	// Create the processing instances, and store it in mainP5 and lightmapP5,
	// where we can access it anywhere in the code

	// Having two *separate canvases means we can draw into one and use it in the other

	// Create a new lightmap
	// It holds a red, green and blue channel.  You can draw into it
	lightmap = new Lightmap({
		fadeSpeed: 10, // 0: no fading, 100 instant fade
		drawChannels: function() {

			// asteroids are drawn to the lightmap
			astField.asteroids.forEach(asteroid => lightmap.drawBlurryLight({
				pt: asteroid.position,
				channels: [255, 0, 0],
				intensity: .4,
				size: 1.2
			}))

		}
	})


	mainP5 = new p5(

		// Run after processing is initialized
		function(p) {

			// Set the noise function to P5's noise
			noise = p.noise

			p.setup = () => {

				// Basic setup tasks
				p.createCanvas(simulationWidth, simulationHeight);
				p.colorMode(p.HSL);
				p.background("white")

				// CREATE SLIDERS!!
				createSlider({label:"astCohesion", min:1, max: 150, defaultValue: 5})
				createSlider({label:"astDrag", min:.001, max: .1, defaultValue: .054, step: .001})
				createSlider({label:"astWander", min:0, max: 6, defaultValue: 4, step: .2})
				createSlider({label:"sunGravity", min:0, max: 50, defaultValue: 12})

			}

			p.mouseClicked = () => {
				let t = p.millis()*.001

				// Processing likes to greedily respond to *all* mouse events,
				// even when outside the canvas
				// This code checks to see if we're *actually* in the P5 window before responding
				// Use this code if you implement dragging, too
				// From https://stackoverflow.com/questions/36767196/check-if-mouse-is-inside-div

				if (p.canvas.parentNode.querySelector(":hover") == p.canvas) {
					//Mouse is inside element

					let mousePos = new Vector(p.mouseX, p.mouseY)


					switch(drawMode) {
						// add three asteroids
						case "asteroid":
							astField.addasteroid(mousePos)
							astField.addasteroid(new Vector(p.mouseX + 30, p.mouseY))
							astField.addasteroid(new Vector(p.mouseX, p.mouseY + 30))
							break;
						case "meteor":
							meteors.push(new Meteor(mousePos))
							break;
						case "spaceMan":
							spaceMen.push(new SpaceMan(mousePos, satellites[0])) // space man added to satellite 0
					}
				}
			}


			p.draw = () => {
				p.background(0,0,0) // black background

				// draw the sun
				p.noStroke()
				p.fill(50, 97, 81, .1)
				p.ellipse(simulationWidth/2, simulationHeight/2, 130)
				p.ellipse(simulationWidth/2, simulationHeight/2, 110)

				p.fill(50, 97, 61)
				p.ellipse(simulationWidth/2, simulationHeight/2, 90)

				// Not updating the background
				let t = p.millis()*.001
				let dt = p.deltaTime*.001

				// UPDATE!
				if (!paused) {
					astField.update(t, dt)
					meteors.forEach(pt => pt.update(t, dt))
					satellites[0].update(t, dt) // satellite isn't a particle but still has to move
					spaceMen.forEach(pt => pt.update(t, dt))
				}

				// Draw asteroids!
				astField.draw(p)
				if (FLAGS.drawAstDebug) {
					astField.debugDraw(p)
				}

				// draw the meteors!
				meteors.forEach(meteor => meteor.draw(p, t))
				if (FLAGS.drawMeteorDebug) {
					meteors.forEach(meteor => meteor.debugDraw(p))
				}

				// draw the satellite!
				satellites[0].draw(p)
				// and its astronauts
				spaceMen.forEach(spaceMan => spaceMan.draw(p, t))
				if (FLAGS.drawSpaceManDebug) {
					spaceMen.forEach(spaceMan => spaceMan.debugDraw(p))
				}

			}
		},

	// A place to put the canvas
	document.getElementById("main"));
})
