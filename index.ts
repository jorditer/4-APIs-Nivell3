// api tienes que poner ubicacion, 

let joke: HTMLElement | null = document.getElementById("joke");



type Feedback = {
	joke: string;
	score: 1 | 2 | 3;
	date: string;
}

let reportAcudits: Feedback[] = [];

async function getDadJoke() {
	try {
	  const response = await fetch("https://icanhazdadjoke.com/", { 
		headers: { 'Accept': 'application/json' }
	  });
	  
	  if (!response.ok) {
		throw new Error("Error API");
	  }
	  
	  const data = await response.json();  // Store the parsed JSON data
	//   console.log(data);  // Access the JSON data outside of fetch
	  return data;  // You can return the data from this function if needed
	  
	} catch (error) {
	  console.error(error);  // Handle errors here
	}
}
  
let updateJoke = () => {
	// Handle checked button
	let selectedButton = document.querySelector('.btn-check:checked') as HTMLInputElement; // queryselector returns Element, that has no .value
	if (selectedButton) {
		let score = parseInt(selectedButton?.value);
		reportAcudits.push({
			joke: joke?.innerText || "",
			score: score as Feedback['score'],
			date: new Date().toISOString()
		})
		console.log(reportAcudits);
		selectedButton.checked = false;
	}
	showJoke();
}
// Change Joke
function showJoke() {
	getDadJoke().then(data => {
	if (joke !== null) {
		joke.innerText = data.joke;
	} else {
		console.error("Element not found");
	}
	});
}
showJoke();
document.getElementById('jokeButton')?.addEventListener('click', updateJoke); 
