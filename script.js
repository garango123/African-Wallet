// Toggle Dark Mode
function toggleDark() {
    document.body.classList.toggle("dark-mode");
}


// Buttons
document.getElementById("searchBtn")
.addEventListener("click", searchCountry);

document.getElementById("darkBtn")
.addEventListener("click", toggleDark);


document.getElementById("countryInput")
.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchCountry();
    }
});


// Search Country
async function searchCountry(){

    const countryInput = document
    .getElementById("countryInput")
    .value
    .trim();


    const result = document.getElementById("result");


    if(!countryInput){
        result.innerHTML =
        "<p style='color:red'>Enter country name</p>";
        return;
    }


    result.innerHTML = "Loading...";


    try {

        const response = await fetch("countries.json");


        const countries = await response.json();


        const country = countries.find(
            c => c.name.toLowerCase() === countryInput.toLowerCase()
        );


        if(!country){
            throw new Error("Country not found");
        }


        result.innerHTML = `

        <h2>${country.name}</h2>

        <img src="${country.flag}" width="200">


        <p><b>Continent:</b> ${country.continent}</p>

        <p><b>Region:</b> ${country.region}</p>

        <p><b>Hemisphere:</b> ${country.hemisphere}</p>

        <p><b>Currency:</b> ${country.currency}</p>

        <p><b>Languages:</b> ${country.languages}</p>

        <p><b>Population:</b> ${country.population}</p>

        <p><b>Current President:</b> ${country.president}</p>


        <h3>Coat of Arms</h3>

        <img src="${country.coatOfArms}" width="150">

        `;


    } catch(error){

        result.innerHTML =
        `<p style="color:red">${error.message}</p>`;

    }

}
