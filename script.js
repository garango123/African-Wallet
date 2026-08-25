// Store countries data
let countries = [];


// Load countries.json when website opens
fetch("countries.json")
.then(response => response.json())
.then(data => {
    countries = data;
})
.catch(error => {
    console.log("Error loading countries:", error);
});


// Toggle Dark Mode
function toggleDark() {
    document.body.classList.toggle("dark-mode");
}


// Buttons
document.getElementById("searchBtn")
.addEventListener("click", searchCountry);


document.getElementById("darkBtn")
.addEventListener("click", toggleDark);


// Press Enter to search
document.getElementById("countryInput")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        searchCountry();
    }

});


// Search Country Function
function searchCountry(){

    const countryInput = document.getElementById("countryInput");

    const result = document.getElementById("result");


    const searchValue = countryInput.value.trim();


    if(searchValue === ""){

        result.innerHTML =
        "<p style='color:red'>Enter country name</p>";

        return;
    }


    result.innerHTML = "Loading...";


    const country = countries.find(c =>
        c.name.trim().toLowerCase() === searchValue.toLowerCase()
    );


    if(!country){

        result.innerHTML =
        "<p style='color:red'>Country not found</p>";

        return;

    }


    result.innerHTML = `

    <h2>${country.name}</h2>


    <img src="${country.flag}" width="200">


    <p><b>Capital:</b> ${country.capital}</p>

    <p><b>Continent:</b> ${country.continent}</p>

    <p><b>Region:</b> ${country.region}</p>

    <p><b>Hemisphere:</b> ${country.hemisphere}</p>

    <p><b>Currency:</b> ${country.currency}</p>

    <p><b>Languages:</b> ${country.languages}</p>

    <p><b>Population:</b> ${country.population}</p>

    <p><b>President:</b> ${country.president}</p>

    <p><b>Literacy Rate:</b> ${country.literacyRate}</p>

    <p><b>Economy:</b> ${country.economy}</p>

    <p><b>Major Ethnic Groups:</b> ${country.majorEthnicGroups}</p>


    <h3>Coat of Arms</h3>

    <img src="${country.coatOfArms}" width="150">

    `;

}


// Welcome Screen Button
function startExploring(){

    document.querySelector(".welcome").style.display = "none";

    document.querySelector(".country-container").style.display = "block";

}
