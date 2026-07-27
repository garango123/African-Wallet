// Dark mode
function toggleDark() {
    document.body.classList.toggle("dark-mode");
}

// Search country
async function searchCountry() {
    const country = document.getElementById("countryInput").value.trim();
    const result = document.getElementById("result");

    if (country === "") {
        result.innerHTML = "<p>Please enter a country name.</p>";
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
        const capital = c.capital ? c.capital[0] : "Not Available";
        const population = c.population
            ? c.population.toLocaleString()
            : "Not Available";
        const region = c.region || "Not Available";
        const flag = c.flags?.png || "";
        const currency = c.currencies
            ? Object.values(c.currencies)[0].name
            : "Not Available";
        const languages = c.languages
            ? Object.values(c.languages).join(", ")
            : "Not Available";

        result.innerHTML = `
            <h2>${name}</h2>
            <img src="${flag}" alt="Flag of ${name}">
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Continent:</strong> ${region}</p>
            <p><strong>Currency:</strong> ${currency}</p>
            <p><strong>Languages:</strong> ${languages}</p>
        `;
    } catch (error) {
        result.innerHTML = `
            <p style="color:red;">
                Country not found or internet connection unavailable.
            </p>
        `;
        console.error(error);
    }
}

// Button events
document.getElementById("searchBtn").addEventListener("click", searchCountry);
document.getElementById("darkBtn").addEventListener("click", toggleDark);

// Press Enter to search
document.getElementById("countryInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchCountry();
    }
});
