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
            "https://countriesnow.space/api/v0.1/countries/population"
        );


        const data = await response.json();


        const countryData = data.data.find(
            item => item.country.toLowerCase() === country.toLowerCase()
        );


        if (!countryData) {
            throw new Error("Country not found");
        }


        const name = countryData.country;

        const population =
            countryData.populationCounts[
                countryData.populationCounts.length - 1
            ].value.toLocaleString();



        result.innerHTML = `

        <h2>${name}</h2>

        <p>
        <strong>Population:</strong>
        ${population}
        </p>

        <p>
        Country information loaded successfully.
        </p>

        `;


    } catch(error) {

        result.innerHTML =
        `<p style="color:red;">
        ${error.message}
        </p>`;

    }

}
