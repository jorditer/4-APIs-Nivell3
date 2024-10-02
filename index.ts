let joke: HTMLElement | null = document.getElementById("joke");

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
  
// You can call the function and use the returned data
let updateJoke = () => {
	getDadJoke().then(data => {
	// console.log('Joke:', data.joke);  // Access the data outside the function
	if (joke !== null) {
		joke.innerText = data.joke;
	} else {
		console.error("Element not found");
	}
	});
}
updateJoke();
document.getElementById('jokeButton')?.addEventListener('click', updateJoke); 
