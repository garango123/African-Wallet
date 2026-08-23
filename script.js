// ===============================
// Toggle Dark Mode
// ===============================
function toggleDark() {
    document.body.classList.toggle("dark-mode");
}


// ===============================
// Event Listeners
// ===============================
document.getElementById("searchBtn").addEventListener("click", searchCountry);

document.getElementById("darkBtn").addEventListener("click", toggleDark);

document.getElementById("countryInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchCountry();
    }
});


// ===============================
// Search Country
// ===============================
async function searchCountry() {

    const country = document.getElementById("countryInput").value.trim();
    const result = document.getElementById("result");

    if (!country) {
        result.innerHTML = "<p style='color:red;'>Please enter a country name.</p>";
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

        const name = c.name?.common || "N/A";
        const official = c.name?.official || "N/A";
        const capital = c.capital?.[0] || "N/A";

        const population = c.population
            ? c.population.toLocaleString()
            : "N/A";

        const region = c.region || "N/A";
        const subregion = c.subregion || "N/A";


        const currency = c.currencies
            ? Object.values(c.currencies)
                .map(item => `${item.name} (${item.symbol || ""})`)
                .join(", ")
            : "N/A";


        const languages = c.languages
            ? Object.values(c.languages).join(", ")
            : "N/A";


        const flag = c.flags?.png || "";

        const coat = c.coatOfArms?.png || "";


        result.innerHTML = `

            <h2>${name}</h2>

            <img src="${flag}" 
                 alt="${name} Flag" 
                 width="200">


            <p><strong>Official Name:</strong> ${official}</p>

            <p><strong>Capital:</strong> ${capital}</p>

            <p><strong>Population:</strong> ${population}</p>

            <p><strong>Region:</strong> ${region}</p>

            <p><strong>Subregion:</strong> ${subregion}</p>

            <p><strong>Currency:</strong> ${currency}</p>

            <p><strong>Languages:</strong> ${languages}</p>


            ${
                coat 
                ? `<img src="${coat}" 
                    alt="${name} Coat of Arms" 
                    width="150">`
                : ""
            }

        `;


    } catch (error) {

        result.innerHTML = `
            <p style="color:red;">
                ${error.message}
            </p>
        `;

    }
}
