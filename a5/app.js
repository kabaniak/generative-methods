


// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#app",
		template: `<div id="app">
			<chat-widget :messages="messages" />

			<p> You're carrying: {{bot.luggageAmount}} bags</p>

			<p>You have a flight booked to: {{bot.currentFlight}}</p>

			<div id="controls">
				<div>
					<input ref="input" v-model="currentInput" @keyup.enter="enterInput">
					<button @click="enterInput">↩️</button>
				</div>
				<div>
					<button @click="handleInput('I lost my luggage')">Find Luggage</button>
					<button @click="handleInput('I would like to complain')">Generic Complaint</button>
					<button @click="handleInput('Change my flight')">Change Flight</button>

					<button @click="handleInput('Yes')">Yes</button>
					<button @click="handleInput('No')">No</button>
				</div>


			</div>
		</div>`,

		watch: {
			messages() {
				// console.log("messages", this.messages)
			}
		},

		methods: {

			postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
			},

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""


				this.handleInput(text)

			},

			handleInput(text) {
				// Does bot things
				this.postToChat(text, "😐", true)

				// Add to the messages in chat

				// Bot does something
				let output = this.bot.respondTo(text)

				setTimeout(() => {
					this.postToChat(output, "👩‍✈️")

				}, Math.random()*100 + 400)

			}
		},

		mounted() {

			console.log("Vue app is all set up....")
			setInterval(() => {


			}, 1000)

			this.bot.post = (text) =>  {
				// this is now the vue object
				this.postToChat(text, "👩‍✈️")
			}

		},


		data() {
			return {
				// Store the bot
				bot: new AirlineBot(),

				// And the message
				messages: [],

				// And the current thing in the input
				currentInput: ""
			}
		}
	})
})
