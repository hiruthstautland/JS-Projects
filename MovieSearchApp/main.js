"use strict";

const form = document.querySelector("form");
const input = document.querySelector("#searchTerm");
const API_URL = "http://www.omdbapi.com/?type=movie&s=";
const API_KEY = "f17e933c";

const resultsSection = document.querySelector("#results");

form.addEventListener("submit", formSubmitted);
function formSubmitted(e) {
	e.preventDefault();
	const searchTerm = input.value;
	getResults(searchTerm).then(showResults);
}

function getResults(searchTerm) {
	const url = `${API_URL}${searchTerm}&apikey=${API_KEY}`;
	return fetch(url).then((resp) => resp.json()).then((data) => data.Search).catch((error) => console.log(error));
}
function showResults(res) {
	resultsSection.innerHTML = res.reduce((displayResults, movie) => {
		return (
			displayResults +
			`<div class="card column m-1">
            <img class="card-img-top" onerror='this.src="/images/No-Photo-Available.jpg"' src="${movie.Poster}" alt="${movie.Title}">
            <div class="card-body">
              <h5 class="card-title"><b>${movie.Title}</b></h5>
              <p class="card-text">${movie.Year}</p>
              <a href="https://www.imdb.com/title/${movie.imdbID}/?ref_=fn_al_tt_4" target="_blank" class="btn btn-danger">Go somewhere</a>
            </div>
          </div>`
		);
	}, "");
}
