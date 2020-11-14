function displayData(data, n) {
    let row = document.getElementById("searchResults");
    let numResults = document.getElementById("numResults");
    try {
        animate();
        row.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            row.innerHTML += `
            <div class='three col'>
                <div class='list-group' id=list-`+ i + ` onclick='lbAnimate()'>
                    <div class="col-container">
                        <img class="hotel-img"></img>
                        <!--<p class="paragraph-md">${data[i].address}
                        <br>${data[i].contactNum}
                        <br>${data[i].rating}
                        <br>${data[i].features}</p>-->
                        <h1 class="subheader">${data[i].name}</h1>
                    </div>
                </div>
            </div>
            `;
            console.log(i);
        }
        numResults.innerHTML = "Filter " + n + " Results";
        displayResults()
    } catch (e) {
        console.error(e);
    }
}

function animate() {
    let searchContainer = document.getElementById("searchContainer");
    searchContainer.classList.toggle("searchContainer-active");
}

function revAnimate() {
    animate();
    displayResults();
}

function displayResults() {
    let results = document.getElementById("resultGroup");
    results.classList.toggle("results-active");
}

export default displayData;