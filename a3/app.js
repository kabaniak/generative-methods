
// Outermost scope,
// You can access these variables from *anywhere*, in fxns, or in html
let myP5 = undefined
let mode = "STARS"
let mousePositions = []
let currHue = 120 //current hue value on the slider
let beenNeon = 0 //keeps track of how long neon tool has been active

function clearCanvas() {
	myP5.background("black")
	console.log("Time for a new masterpiece!")
}

document.addEventListener("DOMContentLoaded", function(){
	console.log("Drawing time!")

	// Add a processing instance


	// Create the processing instance, and store it in myP5,
	// where we can access it anywhere in the code
	let element = document.getElementById("main")
	myP5 = new p5(



		// Run after processing is initialized
		function(p) {



			p.setup = () => {

				console.log("Do setup")

				p.createCanvas(300, 300);
				p.colorMode(p.HSL);

				// Hue, Sat, Light
				// (0-360,0-100,0-100)
				p.background("black")
				p.blendMode(p.BLEND)


			}

			p.mouseDragged = () => {
				let t = p.millis()*.001


				// Save this current mouse position in an array
				// .... but what will you do with an array of vectors?
				mousePositions.push([p.mouseX, p.mouseY])

				// update current hue value
				var slider = document.getElementById("colorRange");
				slider.oninput = function() {
  				currHue = this.value;
				}

				switch(mode) {

					case "FIREWORK":
						// neon tool no longer active
						beenNeon = 0

						let pt0 = [p.mouseX, p.mouseY]
						//select hue of this firework burst (randomized a little)
						let hue = (parseInt(currHue,10) + Math.random()*40 - Math.random()*40)%360

						// don't constantly draw fireworks so it's not cluttered
						if ((mousePositions.length) % 9 === 0) {
							let size = Math.random()*30 + 10
							// draw each of the little lines from the center
							for (var i = 0; i < 15; i++) {
								// find pt1s in a circle around the mouse
								let pt1 = vector.getAddPolar(pt0, size, i*15)

								let d = vector.getSub(pt1, pt0)
								let mag = vector.magnitude(d)
								let n = [-d[1], d[0]]

								let cp0 = pt0.slice(0)
								let cp1 = pt1.slice(0)
								cp0[1] -= mag
								cp1[1] -= mag

								//move the control points up so the curves are nicer
								cp0[1] += size/2.2
								cp1[1] += size/2.2

								p.noFill()

								p.strokeWeight(1)
								p.stroke(hue, 100, 70)
								p.bezier(...pt0, ...cp0, ...cp1, ...pt1)
							}
						}
						break;

					case "SPARKLES":
						// neon tool no longer in use
						beenNeon = 0
						let v = [p.mouseX, p.mouseY]

						for(var i = 0; i<5; i++){
							// randomize position, size, hue, and light of particle
							let xOff = Math.random()*60 - Math.random()*60
							let yOff = Math.random()*60 - Math.random()*60
							let size = Math.random()*6
							let hue = (parseInt(currHue,10) + Math.random()*40 - Math.random()*40)%360
							let light = 70 + Math.random()*20

							// draw the glowy circles
							p.noStroke()
							p.fill(hue, 100, light + 10, .05)
							p.circle(v[0] + xOff, v[1] + yOff, size*3.5)
							p.circle(v[0] + xOff, v[1] + yOff, size*2.5)
							p.circle(v[0] + xOff, v[1] + yOff, size*2)

							// draw the inner circle (colored)
							p.fill(hue, 100, light, 1)
							p.circle(v[0] + xOff, v[1] + yOff, size)
						}
						break;

					case "STARS":
						// neon tool no longer active
						beenNeon = 0
						let vpt = [p.mouseX, p.mouseY]

						// don't constantly draw stars (avoids clutter)
						if ((mousePositions.length) % 6 === 0) {
							p.noStroke() //no outline, for reasons you will see later

							//draw three stars
							for(var j = 0; j<3; j++){
								// randomize hue and position
								let hue = (parseInt(currHue,10) + Math.random()*40 - Math.random()*40)%360
								let x = Math.random()*40 - Math.random()*40 + vpt[0]
								let y = Math.random()*40 - Math.random()*40 + vpt[1]

								//draw a big white star
								p.fill(100, 100, 100)
								p.beginShape()
								let r = Math.random()*8 + 3 // randomize size

								//draw a star (iterates over the points)
								for(var i = 0; i<10; i++){
									// outer circle points
									if (i%2 == 0){
										let ang = Math.PI * 2 * i / 5 + j*t*3
										p.vertex(x + r*Math.cos(ang), y + r*Math.sin(ang));
									} // inner circle
									else {
										let ang = Math.PI * 2 * i / 5 + Math.PI * 2 / 10 + j*t*3
										p.vertex(x + r*Math.cos(ang)/2, y + r*Math.sin(ang)/2)
									}
								}
								p.endShape()

								// now draw a smaller, colored star overtop the white one
								// white star will look like an outline
								p.fill(hue, 70, 60)
								p.beginShape()
								r -=3 // radius shrinks, outline will be 3px
								for(var i = 0; i<10; i++){
									// outercircle
									if (i%2 == 0){
										let ang = Math.PI * 2 * i / 5 + j*t*3
										p.vertex(x + r*Math.cos(ang), y + r*Math.sin(ang));
									} // inner circle
									else {
										let ang = Math.PI * 2 * i / 5 + Math.PI * 2 / 10 + j*t*3
										p.vertex(x + r*Math.cos(ang)/2, y + r*Math.sin(ang)/2)
									}
								}
								p.endShape()
							}
						}
						break;

					case "NEON":
						beenNeon++ //everytime case is neon, increase time tool been active

						// check to make sure been active long enough to draw yet
						if (mousePositions.length<=3 || beenNeon <=3)
							break

						// the two points to draw the line are current and three before
						// this makes line a little smoother
						let point1 = mousePositions[mousePositions.length - 1]
						let point0 = mousePositions[mousePositions.length - 4]

						let d = vector.getSub(point0, point1)
						let dMag = vector.magnitude(d)

						p.loadPixels
						let c = p.get(point0[0],point0[1])

						// if not beginning of the neon line
						// and pixel color of prev point isn't white
						// then we need to do some fiddling so we don't draw white outline over our line
						if (beenNeon!=4 & c != [255,255,255]){

							// where should we start white outline so we don't draw over old line
							let perc = 3/dMag
							point0[0]-=perc*d[0]
							point0[1]-=perc*d[1]
							p.strokeWeight(10)
							p.stroke(0,0,100)
							p.line(...point0, ...point1)

							// draw black line further back so it makes line look more cohesive
							perc = 5/dMag
							point0[0]+=perc*d[0]
							point0[1]+=perc*d[1]
							p.strokeWeight(5)
							p.stroke(0,0,0)
							p.line(...point0, ...point1)
						}
						else{
							// otherwise no fiddling needed
							// draw white line like normal
							p.strokeWeight(10)
							p.stroke(0,0,100)
							p.line(...point0, ...point1)

							// use difference mode to draw the black line inside
							p.blendMode(p.DIFFERENCE)
							p.strokeWeight(5)
							p.stroke(0,0,100)
							p.line(...point0, ...point1)

							p.blendMode(p.BLEND) // Switch back to blend!!
						}

						break

					default:
						console.warn("UNKNOWN TOOL:" + mode)
				}



			}

			p.mouseReleased = () => {
				// updates been neon if you release the mouseX
				// this makes it so the line doesn't connect when mouse is picked up
				// can do multiple separate neon lines
				beenNeon = 0
			}

			p.draw = () => {
				// Not updating the background
				let t = p.millis()*.001

				// Update the tool label
				let el = document.getElementById("tool")
				el.innerHTML = "Current Tool: "+mode


			}
		},

		// A place to put the canvas
		element);
})
