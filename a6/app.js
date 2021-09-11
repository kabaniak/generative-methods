
let paused = false
document.addEventListener('keyup', function(e){
	if(e.keyCode == 32){
		paused = !paused
	}
	if(e.keyCode == 78){
		sim.step()
	}
});


// let simplex = new SimplexNoise()
// function noise() {
// 	if (arguments.length === 1)
// 		return simplex.noise2D(arguments[0])
// 	if (arguments.length === 2)
// 		return simplex.noise2D(arguments[0], arguments[1])
// 	if (arguments.length === 3)
// 		return simplex.noise3D(arguments[0], arguments[1], arguments[2])

// }


let noise = new p5().noise
console.log(noise)
let sim = new Simulation()

document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">
			<p>These simulations involves simulating the effect of true believers on recruiting neutral citizens to their cults, via gradually converting
			their beliefs. The red cells represent cult members - the darker the red the more fervent the beliefs. The longer a cell is exposed to cult beliefs,
			the more fervent theirs will become.</p>

			<p> First, I made a mode where the only "convincing" cell is a cult cell. Coming in contact with a cult cell automatically
			starts to convince you to join the cult. With nothing to convince cells otherwise, all cells will end up joining the cult.</p>
			<simulation mode="Auto-Recruit"/>

			<p> Next, I accounted for the fervor of your neighbors' beliefs. The more convinced your neighbors are, the more likely that they will be
			able to convince you to believe. This slows the spread of the cult's beliefs, but eventually all cells will still end up joining the cult.</p>
			<simulation mode="Convincing"/>

			<p> Next, we introduce an element of discourse where there's an opposing view that can also convince cells in the opposite direction. The
			only cells that still can't be convinced are true believers - cells that have been entirely convinced one way or the other. As a result, the
			map stabilizes when every cell has become a true believer in one view point.</p>
			<simulation mode="Two Beliefs"/>

			<p> Finally, we introduce deprogrammers (pale yellow). When deprogrammers are next to a partially convinced cell, that cell is automatically reset to neutral.
			There is also a chance that the cell will become a deprogrammer as well. This mode also introduces the ability to deprogram true believers, an
			incredibly difficult but feasible task. As a result, rather than stabilizing as a cult, this simulation will eventually stabilize to all deprogrammers.</p>
			<simulation mode="Deprogramming"/>

			<p> These simulations show that the key to curbing cult recruitment lies with true believers. If we are unable to convince true believers, their beliefs
			will continue to spread unchecked. If true believers can be convinced, the cult will gradually die out.</p>

		</div>`,

	})
})
