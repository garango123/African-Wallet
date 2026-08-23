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
// Search Country (REST Countries v5)
// ===============================
async function searchCountry() {

    const country = document
        .getElementById("countryInput")
        .value
        .trim();

    const result = document.getElementById("result");


    if (!country) {
        result.innerHTML =
        "<p style='color:red;'>Please enter a country name.</p>";
        return;
    }


    result.innerHTML = "<p>Loading...</p>";


    try {

        const response = await fetch(
            `https://api.restcountries.com/countries/v5/name?q=${encodeURIComponent(country)}`,
            {
                headers: {
                    "Authorization": "Bearer rc_live_demo"
                }
            }
        );


        if (!response.ok) {
            throw new Error("Country not found");
        }


        const data = await response.json();


        const c = data.data.objects[0];


        const name = c.names?.common || "N/A";
        const official = c.names?.official || "N/A";
        const capital = c.capitals?.[0] || "N/A";

        const population = c.population
            ? c.population.toLocaleString()
            : "N/A";

        const region = c.region || "N/A";


        const languages = c.languages
            ? Object.values(c.languages).join(", ")
            : "N/A";


        const currency = c.currencies?.[0]?.name || "N/A";


        const flag = c.flag?.png || "";


        result.innerHTML = `

        <h2>${name}</h2>

        <img src="${flag}" 
             width="200"
             alt="${name} Flag">

        <p><strong>Official Name:</strong> ${official}</p>

        <p><strong>Capital:</strong> ${capital}</p>

        <p><strong>Population:</strong> ${population}</p>

        <p><strong>Region:</strong> ${region}</p>

        <p><strong>Currency:</strong> ${currency}</p>

        <p><strong>Languages:</strong> ${languages}</p>

        `;


    } catch(error) {

        result.innerHTML =
        `<p style="color:red;">
        ${error.message}
        </p>`;

    }
}
