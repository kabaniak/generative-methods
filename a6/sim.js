


// let emoji = "🌷 🐑 🌲 🌳 🌴 🐟 🐠 🐡 🌱 🦞 🐙 🦀 🦐 🐄".split(" ")
let emoji = "🌷 🐑 🌲".split(" ")

let simCount = 0
class Simulation {
	// Some number of grids
	constructor(mode) {
		// Mode can control various factors about the simulation

		this.mode = mode
		this.idNumber = simCount++
		this.noiseSeed = this.idNumber
		this.stepCount = 0

		// Set my size
		this.w = 40
		this.h = 18
		// But smaller if in emoji mode
		if (mode == "emoji") {
			this.w = 20
			this.h = 10
		}


		this.isWrapped = true
		this.isPaused = true
		this.selectedCell = undefined

		this.noiseScale = .3

		this.gameOfLifeGrid = new Grid(this.w, this.h, this.isWrapped)

		// You can make additional grids, too
		this.heightMap = new Grid(this.w, this.h, this.isWrapped)
		this.emojiGrid = new Grid(this.w, this.h, this.isWrapped)

		// Tuning values for the continuous simulation
		this.backgroundRadiation = 1
		this.lifeThreshold = 1

		this.randomize()

	}

	randomize() {
		console.log("set to a random layout")
		this.noiseSeed += 10

		if (this.mode === "Auto-Recruit")
			this.gameOfLifeGrid.setAll((x, y) => Math.random() > 0.05 ? 0 : 10)
		if (this.mode === "Convincing")
			this.gameOfLifeGrid.setAll((x, y) => Math.random() > 0.05 ? 0 : 10)
		if (this.mode === "Two Beliefs")
			this.gameOfLifeGrid.setAll((x, y) => Math.random() > 0.05 ? 0 : (Math.random() > .5 ? -10 : 10))
		if (this.mode === "Deprogramming")
			this.gameOfLifeGrid.setAll((x, y) => Math.random() > 0.05 ? 0 : (Math.random() > .7 ? -2 : 10))


		// Add some random emoji
		this.emojiGrid.setAll((x,y) => Math.random()>.9?getRandom(emoji):"")
	}

	step() {
		this.stepCount++

		// Make one step
		// Set all the next steps, then swap the buffers

		this.gameOfLifeGrid.setNext((x, y, currentValue) => {
			let neighbors = this.getNeighborPositions(x, y, true)
			let n0 = this.gameOfLifeGrid.get(x + 1, y)
			let n1 = this.gameOfLifeGrid.get(x - 1, y)
			let n2 = this.gameOfLifeGrid.get(x, y + 1)
			let n3 = this.gameOfLifeGrid.get(x, y - 1)
			let count = n0 + n1 + n2 + n3

			switch (this.mode) {

				case "Auto-Recruit": {
					//if not already a true believer, convince me a little
					if(currentValue != 10)
						if(count>0)
							return currentValue + 1
					return currentValue
				}

				case "Convincing": {
					if(currentValue != 10)
						if(count>0)
							// the more convinced its neighbors are, the more likely it will be convinced
							if (Math.random() < count / 40)
								return currentValue + 1
					return currentValue
				}

				case "Two Beliefs": {
					// if not a true believer
					if (currentValue == -10 || currentValue == 10)
						return currentValue
					if(count == 0){
						// nothing to convert me
						if (n0 == 0 && n1 == 0 && n2 == 0 && n3 == 0)
							return currentValue
						// ensures no weird deadlocks when opposite true believers surrounding
						return Math.random() > .5 ? currentValue + 1 : currentValue - 1
					}
					if(count>0)
						// the more convinced its neighbors are, the more likely it will be convinced
						if (Math.random() < count / 40)
							return currentValue + 1
					if(count!= 0) {
						// convince the opposite way
						let temp = count*-1
						if (Math.random() < temp / 40)
							return currentValue - 1
					}
					return currentValue
				}

				case "Deprogramming": {
					if (currentValue == -2)
						return currentValue
					// Deprogramming if one of your neighbors is a deprogrammer
					if (n0 == -2 || n1 == -2 || n2 == -2 || n3 == -2){
						// true believer, only tiny chance of deprogramming
						if (currentValue == 10)
							return Math.random() < .025 ? currentValue - 1 : currentValue
						// tiny chance it will also become a deprogrammer
						if(Math.random() < .05)
							return -2
						return 0
					}
					if (currentValue == 10)
						return currentValue
					if(count>0)
						// the more convinced its neighbors are, the more likely it will be convinced
						if (Math.random() < count / 40)
							return currentValue + 1
					return currentValue
				}


				default: {
					if (x == 0 && y == 0)
						console.warn("unknown mode:", this.mode)
					// Just copy the current values
					return currentValue
				}

			}
		})

		// Show the whole grid for debugging
		// this.gameOfLifeGrid.debugPrintGrid()

		// Swap the new value buffer into the current value buffer
		this.gameOfLifeGrid.swap()
	}



	//==============
	// Draw a cell.  Add emoji or color it


	drawCell(p, x, y, cellX, cellY, cellW, cellH) {
		if (this.selectedCell && this.selectedCell[0] === x && this.selectedCell[1] === y) {
			p.strokeWeight(2)
			p.stroke("red")
		}
		else  {
			p.strokeWeight(1)
			p.stroke(0, 0, 0, .2)
		}

		let val = this.gameOfLifeGrid.get(x, y)
		let sat = 70
		let color = [0, 0, 100]
    switch (val) {
      // white (neutral)
      case 0: {
        color = [0, sat, 100]
        break
      }
      // light red
      case 1: {
        color = [0, sat, 90]
        break
      }
      // light red
      case 2: {
        color = [0, sat, 85]
        break
      }
      // light red
      case 3: {
        color = [0, sat, 75]
        break
      }
      // light red
      case 4: {
        color = [0, sat,70]
        break
      }
			// light red
			case 5: {
        color = [0, sat, 65]
        break
      }
      // mid red
      case 6: {
        color = [0, sat, 60]
        break
      }
      // med red
      case 7: {
        color = [0, sat, 55]
        break
      }
      // dark red
      case 8: {
        color = [0, sat, 50]
        break
      }
      // dark red
      case 9: {
        color = [0, sat, 45]
        break
      }
			// darkest red
			case 10: {
        color = [0, sat, 40]
        break
      }
      //light yellow
      case -1: {
        color = [50, sat, 90]
        break
      }
      //light yellow
      case -2: {
        color = [50, sat, 86]
        break
      }
      //light yellow
      case -3: {
        color = [50, sat, 83]
        break
      }
      //light yellow
      case -4: {
        color = [50, sat,80]
        break
      }
			//light yellow
			case -5: {
        color = [50, sat, 75]
        break
      }
      //mid yellow
      case -6: {
        color = [50, sat, 70]
        break
      }
      // med yellow
      case -7: {
        color = [50, sat, 65]
        break
      }
      // dark yellow
      case -8: {
        color = [50, sat, 60]
        break
      }
      // dark yellow
      case -9: {
        color = [50, sat, 55]
        break
      }
			// darkest yellow
			case -10: {
        color = [50, sat, 50]
        break
      }
      default: {
        console.warn("unknown type:", val)
      }
    }

		p.fill(...color, 1)
		p.rect(cellX, cellY, cellW, cellH)

		if (this.mode === "emoji") {
			let em = this.emojiGrid.get(x, y)
			p.text(em, cellX, cellY + cellH)
		}


	}

	//=====================================================
	// Mouse interactions

	select(x, y) {
		this.selectedCell = [x, y]
	}

	click(x, y) {
		this.gameOfLifeGrid.set(x, y, 1)
	}



	//=====================================================
	// Utility functions


	getNeighborPositions(x1, y1, wrap) {
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + this.w)%this.w
			x2 = (x2 + this.w)%this.w
			y0 = (y0 + this.h)%this.h
			y2 = (y2 + this.h)%this.h
		}

		return [[x0,y0],[x1,y0],[x2,y0],[x2,y1],[x2,y2],[x1,y2],[x0,y2],[x0,y1]]
	}


}
