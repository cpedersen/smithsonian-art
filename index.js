'use strict';

const apiKey = 'GjuT1S6PrirM1b4lwC6z7ecAw23Mhnpc5FgAxBo6';

/* ------------------------------------------------------------- */
function formatURL() {
  const searchURL = 'https://developer.nps.gov/api/v1/parks';
  return searchURL;
}

/* ------------------------------------------------------------- */
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

/* ------------------------------------------------------------- */
function displayResults(queryPark, queryStates, queryMax, responseJson) {
  const values = Object.values(responseJson);
  $('#results-list').empty();

  if (queryMax < responseJson.total) {
    $('#results-list').append(`<p>${queryMax} parks found using query '${queryPark}'</p>`);
  } else {
    $('#results-list').append(`<p>${responseJson.total} parks found using query '${queryPark}'</p>`);
  }

  for (let i = 0; i < responseJson.total && i < queryMax; i++){
    $('#results-list').append(
        `<li>
        <h2>Park: ${responseJson.data[i].fullName}</h2>
        <p>Description: ${responseJson.data[i].description}</p>
        <p>States: ${responseJson.data[i].states}</p>
        <p>URL: <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
        </li>`
    )};
    
  //display the results section  
  $('#results').removeClass('hidden');
};

/* ------------------------------------------------------------- */
function getParks(queryPark, queryStates, queryMax) {

  /*parkCode: queryPark*/
  const params = {
    api_key: apiKey,
    q: queryPark,
    stateCode: queryStates,
    limit: queryMax
  };

  const queryString = formatQueryParams(params);
  const searchURL = formatURL();
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(queryPark, queryStates, queryMax, responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

/* ------------------------------------------------------------- */
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchPark = $('#js-search-parks').val();
    const searchStates = $('#js-specify-states').val();
    const searchMax = $('#js-specify-max').val();
    getParks(searchPark, searchStates, searchMax);
  });
}

$(watchForm);