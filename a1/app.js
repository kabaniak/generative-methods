
// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function(){
	console.log("Hello, webpage!")
});


function genFact() {
	console.log("New fact generated!")
	let el = document.getElementById("factBox");

	let num = Math.floor(Math.random() * factArray.length);;
	el.innerText = factArray[num];
}

function genImage() {
	console.log("New image generated!")
	let el = document.getElementById("landscape");

	let num = Math.floor(Math.random() * imgArray.length);;
	el.style.backgroundImage = "url(" + imgArray[num] + ")";
}

let factArray = [	"Aragorn's actor (Viggo Mortenson) broke two toes kicking a helmet in The Two Towers, in a clip that's actually in the film.",
									"In the scene where they're chasing the hobbits to Isengard, all three actors are injured. Aragorn had his broken toes, Legolas had a cracked rib, and Gimli had dislocated his knee!",
									"In the scene where Sam faces Shelob, a close up shot of his arm holding Sting is actually Peter Jackson's arm.",
									"Peter Jackson had severe arachnophobia - so he told the CGI artists to make Shelob his worse nightmare come to life.",
									"In order to get Sam to show the proper emotion in his wedding scene, Aragorn's actor kissed Pippin's behind the camera!",
									"Isengard was actually built as a scale model that was 60 ft across! A few of it's aerial scenes were physically filmed with a scope.",
									"All three of the films were shot simultaneously in the same year, then pickup shots were done a few years later as the movies premiered.",
									"Boromir refused to fly in helicopters to the sets, so cast would sometimes fly over mountains to look down and see the actor scaling the ground below!",
									"Over half of the Riders of Rohan were female professional horseback riders that got put in beards by the makeup team!",
									"The scene where Faramir is burned on a pyre was filmed using two identical wood piles (one on fire) and a glass pane, so that the horse wouldn't get spooked.",
									"The actor playing Aragorn learned how to speak the Elvish language in real life!",
									"The software that made the armies of Middle Earth possible is called Massive, created by Weta Digital. It was groundbreaking for the time!",
									"The elephant crash scene in Return of the King had to be re-done last minute because the camera angle obscured the moment of impact (way less cool)."];

let imgArray = ["https://i.pinimg.com/originals/da/f4/ce/daf4ce38fb99107f9493731f449d3521.jpg",
								"https://i.pinimg.com/originals/b7/a3/58/b7a3589ee663a399932797942af94a4b.jpg",
								"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f1e95ec9-87e5-4723-8ebb-e382369164a5/d6fbe46-83f1b5c3-7f48-4e1a-8a6a-5c79f16616fc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjFlOTVlYzktODdlNS00NzIzLThlYmItZTM4MjM2OTE2NGE1XC9kNmZiZTQ2LTgzZjFiNWMzLTdmNDgtNGUxYS04YTZhLTVjNzlmMTY2MTZmYy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.SHWXk5QWq5Q4OS1d9iIvmEhwGXoSvqBzqOJ7Lym0AkM",
								"https://cdna.artstation.com/p/assets/images/images/017/615/258/large/alexey-shugurov-pheodoro-bw.jpg?1556704988",
								"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3d5e25ce-abb2-4758-9485-83e13a39724b/d63kqrv-07b08f78-57d9-467b-85be-ade76d526f17.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvM2Q1ZTI1Y2UtYWJiMi00NzU4LTk0ODUtODNlMTNhMzk3MjRiXC9kNjNrcXJ2LTA3YjA4Zjc4LTU3ZDktNDY3Yi04NWJlLWFkZTc2ZDUyNmYxNy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.wR70BZEAj9pAw_47qPEFiN9CbZ522iO7t0hzaPGL3NY",
								"https://a.1stdibscdn.com/mark-thompson-paintings-revealed-wounds-black-white-atmospheric-landscape-painting-for-sale-picture-4/a_8173/a_25375631585330079744/revealed_wounds_master.jpg",
								"https://i.pinimg.com/originals/8d/c4/c5/8dc4c52a800377b83e0f3e59645361ee.jpg",
								"https://c4.wallpaperflare.com/wallpaper/482/317/123/fantasy-landscape-black-and-white-water-wallpaper-preview.jpg",
								"https://artlords-artwork.s3.amazonaws.com/uploads/image/27/display_bw_landscape.jpg",
								"https://i.pinimg.com/originals/bd/4e/8b/bd4e8bcacb3092b16a61c2060be1e20b.jpg",
								"https://i.pinimg.com/originals/0c/2d/20/0c2d20828f43fbbae51e9266a02e8241.jpg",
								"https://i.pinimg.com/originals/dd/2e/17/dd2e17ca274b8a118a63805f223048c4.jpg",
								"https://images.squarespace-cdn.com/content/v1/55a19ba7e4b0c654f385f79c/1446342037993-NPT9QI563Q5RIR6S1MVU/ke17ZwdGBToddI8pDm48kDu-OvKe9-yMBj32JSWknrt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UZNNUmsixw3l8iPy3vgDTPMwfMBbaTJA8uE3oWp8JUwqzkQXHaRS3Yhvu0vV6Jt1AA/Fantasy+-+Dark+Fantasy+World.jpg",
								"https://i.pinimg.com/originals/06/9c/bd/069cbdc3c503d3f04ded7f016663839d.jpg",
								"https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/fantasy-illustration-kseniya-kurbatova.jpg"]
