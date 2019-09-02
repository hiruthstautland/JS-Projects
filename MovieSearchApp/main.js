"use strict";

const form = document.querySelector("form");
const input = document.querySelector("#searchTerm");
const API_URL = "http://www.omdbapi.com/?type=movie&s=";
const API_KEY = "f17e933c";

const resultsSection = document.querySelector("#results");
const watchLaterSection = document.querySelector("#watchLater");

form.addEventListener("submit", formSubmitted);
async function formSubmitted(e) {
	e.preventDefault();
	const searchTerm = input.value;
	try {
		const results = await getResults(searchTerm);
		showResults(results);
	} catch (error) {
		showError(error);
	}
}
function showError() {
	resultsSection.innerHTML = `<div class="alert alert-danger m-2" role="alert">
    <h4 class="alert-heading">Search unsuccessful</h4>
    <p>Aww yeah, you successfully read this important alert message.</p>
    <hr>
    <ul class="mb-0">
    TIPS
        <li>Check out spelling</li>
        <li>Search for shorter movie title</li>
    </ul>
  </div>`;
}

async function getResults(searchTerm) {
	const url = `${API_URL}${searchTerm}&apikey=${API_KEY}`;
	const response = await fetch(url);
	const data = await response.json();
	return data.Search;
}
function showResults(res) {
	resultsSection.innerHTML = res.map((movie) => {
		return getMovieTemplate(movie, 4, true);
	});
	const watchLaterButtons = document.querySelectorAll(".watch-later-btn");
	watchLaterButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const movie = res.find((movie) => movie.imdbID === btn.dataset.id);
			console.log(movie.Title);
			watchLaterSection.innerHTML = watchLaterSection.innerHTML + getMovieTemplate(movie, 5, false);
			movie.Title;
		});
	});
}

function getMovieTemplate(movie, cols, button = true) {
	return `<div class="card col-${cols} m-2">
    <img class="card-img-top m-1" onerror='this.src="/images/No-Photo-Available.jpg"' src="${movie.Poster}" alt="${movie.Title}">
    <div class="card-body">
        <h5 class="card-title"><b>${movie.Title}</b></h5>
        <p class="card-text">${movie.Year}</p>
        <div class="btn-container flex">
             <a 
                href="https://www.imdb.com/title/${movie.imdbID}/?ref_=fn_al_tt_4"
                target="_blank"
                class="btn btn-sm btn-primary flaot-right justify-content-start"
                >
                Go somewhere
            </a>
            ${button
				? `<button 
                        class="btn btn-success btn-sm watch-later-btn justify-content-end" 
                        type="submit"
                        data-id="${movie.imdbID}"
                    >
                    Watch Later </button>`
				: ""}
        </div>
    </div>
  </div>`;
}
