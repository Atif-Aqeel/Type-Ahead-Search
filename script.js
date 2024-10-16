

document.addEventListener('DOMContentLoaded', async function () {
    console.log('SCRIPT EXECUTED');
    
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];

    async function fetchCities(endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                // headers: {
                //     "Content-Type": "application/json",
                //     "Access-Control-Allow-Origin": '*', 
                // }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("data:", data);
    
            cities.push(...data);
    
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    fetchCities(endpoint);

    // await fetch(endpoint, {
    //     method: 'GET',
    //     headers: {
    //         "Content-Type": "application/json",
    //         // "Access-Control-Allow-Origin": '*',
    //     }
    // })
    // .then(response => {
    //     console.log("response :", response);
    //     response.json()
    // })
    // .then(data => {
    //     console.log("data :", data);
    //     cities.push(...data)
    // });
    
    
    function findMatches(wordToMatch, cities) {
        console.log("IN findMatches function ");

        return cities.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            console.log("regex :", regex);

            return place.city.match(regex) || place.state.match(regex)
        });
    }


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }


    function displayMatches() {
        console.log("IN displayMatches function ");

        const matchArray = findMatches(this.value, cities);
        console.log("matchArray :", matchArray);

        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
            const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

            return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>
                </li>
            `;

        }).join('');

        // console.log("html :", html);
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    console.log("searchInput accessed :", searchInput);

    const suggestions = document.querySelector('.suggestions');
    console.log("suggestions accessed :", suggestions);

    searchInput.addEventListener('change', function(){
        console.log("searchInput change event called");
        displayMatches
    });
    
    searchInput.addEventListener('keyup', displayMatches);

})
