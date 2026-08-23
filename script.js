// ===============================
// Toggle Dark Mode
// ===============================
function toggleDark() {
    document.body.classList.toggle("dark-mode");
}


// ===============================
// Event Listeners
// ===============================
document.getElementById("searchBtn")
.addEventListener("click", searchCountry);

document.getElementById("darkBtn")
.addEventListener("click", toggleDark);


document.getElementById("countryInput")
.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchCountry();
    }
});


// ===============================
// Search Country
// ===============================
async function searchCountry() {

    const country = document
        .getElementById("countryInput")
        .value.trim();

    const result = document.getElementById("result");


    if (!country) {
        result.innerHTML =
        "<p style='color:red;'>Please enter a country name.</p>";
        return;
    }


    result.innerHTML = "<p>Loading...</p>";


    try {

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
        );


        if (!response.ok) {
            throw new Error("Country not found");
        }


        const data = await response.json();

        const c = data[0];


        const name = c.name.common;
        const official = c.name.official;
        const capital = c.capital?.[0] || "N/A";
        const population = c.population.toLocaleString();
        const region = c.region;
        const languages = c.languages
            ? Object.values(c.languages).join(", ")
            : "N/A";

        const currency = c.currencies
            ? Object.values(c.currencies)
                .map(x => x.name)
                .join(", ")
            : "N/A";


        const flag = c.flags.png;


        result.innerHTML = `

        <h2>${name}</h2>

        <img src="${flag}" width="200">

        <p><b>Official Name:</b> ${official}</p>

        <p><b>Capital:</b> ${capital}</p>

        <p><b>Population:</b> ${population}</p>

        <p><b>Region:</b> ${region}</p>

        <p><b>Currency:</b> ${currency}</p>

        <p><b>Languages:</b> ${languages}</p>

        `;


    } catch(error) {

        result.innerHTML =
        `<p style="color:red;">
        ${error.message}
        </p>`;

    }

}
