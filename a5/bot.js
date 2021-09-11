class AirlineBot {
 constructor() {
   // keeps track of luggage and current flight to display
		this.luggageAmount = 0
    this.currentFlight = "-"
    this.newFlight = ""

		this.grammar = tracery.createGrammar(airlineGrammar)
		this.grammar.addModifiers(baseEngModifiers)

    // keeps track of last input for finite state machine function
    this.last = ""
	}

	respondTo(s) {
    // make it lowrcase
    let newS = s.toLowerCase()

    // if last was I want to complain, this is response no matter what comes next
    if (this.last.includes("complain")) {
      this.last = ""
      this.post("So sorry to hear that! Let me see what I can do.")
      this.post(this.grammar.flatten("Alrighty then #nickname#, I checked with my manager and I can give you #reward#."))
      return this.grammar.flatten("Have a SUPER rest of your day! And be sure to fly #airline# again!")
    }

    // if responds yes to claiming luggage
    if(newS.includes("yes")&&this.last=="luggage") {
      this.last = ""
      this.luggageAmount++
      this.post(this.grammar.flatten("Alrighty then #nickname#, I'll add it to your things.") )
      return this.grammar.flatten("Have a SUPER flight with #airline#!")
    }
    // if responds no to claiming luggage
    if(newS.includes("no")&&this.last=="luggage"){
      this.last = ""
      return this.grammar.flatten("That's too bad #nickname#, but have a SUPER rest of your day!")
    }

    //if responds yes to changing flight
    if(newS.includes("yes")&&this.last=="change") {
      this.last = ""
      this.currentFlight = this.newFlight
      this.newFlight = ""
      this.post(this.grammar.flatten("Alrighty then #nickname#, I'll book it for you."))

      // pause to book
      let interval = setInterval(() => {
			}, 1000)

      return this.grammar.flatten("All booked! And looks like it leaves #times#. Have a SUPER trip and be sure to fly #airline# again!")
    }
    // if responds no to changing flight
    if(newS.includes("no")&&this.last=="change"){
      this.last = ""
      this.newFlight = ""
      return this.grammar.flatten("That's too bad #nickname#, but have a SUPER rest of your day!")
    }

    // if asks about luggage
		if (newS.includes("luggage")) {
      this.last = "luggage"
      this.post("Let me see what we have under the counter.")

      // pause to check under counter
      let interval = setInterval(() => {
			}, 1000)

			return this.grammar.flatten("Alrighty then #nickname#, we have exactly #number# #size#, #luggageAdj#, #color# #lugType#. One of those what you're looking for?")
		}

    // if wants to complain
    if (newS.includes("complain")) {
      this.last = "complain"
      return this.grammar.flatten("Oh no! What about, #nickname#?")
    }

    // if wants to change its flight
    if(newS.includes("change")) {
      this.post(this.grammar.flatten("Alrighty then #nickname#, let me see what I can do."))

      // pause to check flights
      let interval = setInterval(() => {
			}, 1000)

      this.newFlight = this.grammar.flatten("#loc#")
      this.last = "change"
      this.post(this.grammar.flatten("I see that we have one flight available to "+ this.newFlight +", known for its #landscapeComplex#."))
      return "Would you like to book the flight?"
    }

    // otherwise it doesn't know what you want
    this.last =""
    return this.grammar.flatten("Sorry #nickname#, I'm not sure what you mean. But be sure to fly #airline# again!")
	}
}
