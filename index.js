"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
let joke = document.getElementById("joke");
let reportAcudits = [];
function getDadJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://icanhazdadjoke.com/", {
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) {
                throw new Error("Error API");
            }
            const data = yield response.json(); // Store the parsed JSON data
            //   console.log(data);  // Access the JSON data outside of fetch
            return data; // You can return the data from this function if needed
        }
        catch (error) {
            console.error(error); // Handle errors here
        }
    });
}
let updateJoke = () => {
    // Handle checked button
    let selectedButton = document.querySelector('.btn-check:checked'); // queryselector returns Element, that has no .value
    if (selectedButton) {
        let score = parseInt(selectedButton === null || selectedButton === void 0 ? void 0 : selectedButton.value);
        reportAcudits.push({
            joke: (joke === null || joke === void 0 ? void 0 : joke.innerText) || "",
            score: score,
            date: new Date().toISOString()
        });
        console.log(reportAcudits);
        selectedButton.checked = false;
    }
    showJoke();
};
// Change Joke
function showJoke() {
    getDadJoke().then(data => {
        if (joke !== null) {
            joke.innerText = data.joke;
        }
        else {
            console.error("Element not found");
        }
    });
}
showJoke();
(_a = document.getElementById('jokeButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', updateJoke);
