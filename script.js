// Toggle Dark Mode
function toggleDark() {
    document.body.classList.toggle("dark-mode");
}

// Add button events
document.getElementById("searchBtn").addEventListener("click", searchCountry);
document.getElementById("darkBtn").addEventListener("click", toggleDark);

// Search when Enter is pressed
document.getElementById("countryInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        searchCountry();
    }
});

async function searchCountry() {
    const country = document.getElementById("countryInput").value.trim();
    const result = document.getElementById("result");

    if (country === "") {
        result.innerHTML = "<p style='color:red;'>Please enter a country name.</p>";
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    try {
        // Latest REST Countries API
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
        const capital = c.capital ? c.capital[0] : "Not Available";
        const population = c.population.toLocaleString();
        const region = c.region || "N/A";
        const subregion = c.subregion || "N/A";
        const currency = c.currencies
            ? Object.values(c.currencies)[0].name
            : "Not Available";
        const languages = c.languages
            ? Object.values(c.languages).join(", ")
            : "Not Available";
        const flag = c.flags?.png;
        const coat = c.coatOfArms?.png || "";

        result.innerHTML = `
            <h2>${name}</h2>

            <img src="${flag}" alt="Flag of ${name}" width="180">

            <p><strong>Official Name:</strong> ${official}</p>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Sub-region:</strong> ${subregion}</p>
            <p><strong>Currency:</strong> ${currency}</p>
            <p><strong>Languages:</strong> ${languages}</p>

            ${
                coat
                    ? `<h3>Coat of Arms</h3><img src="${coat}" width="120">`
                    : ""
            }
        `;
    } catch (error) {
        result.innerHTML =
            "<p style='color:red;'>Country not found or API unavailable.</p>";
        console.error(error);
    }
}
