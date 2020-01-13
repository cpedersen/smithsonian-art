'use strict';

const apiKey = '9eCw7spZyYcnwSpdSl6hnfPcxiOw1JaFEgNAQV3u';

/* Use for random generation */
let uuid_artwork = '';
let uuid_artist = '';

/* ------------------------------------------------------------- */
function formatURL(typeArtInfo="artworks") {
  let searchURL = '';
  if (typeArtInfo === "artworks") {
    searchURL = 'https://api.si.edu/saam/v1/artworks';
  } else if (typeArtInfo === "artists") {
    searchURL = 'https://api.si.edu/saam/v1/artists';
  } else if (typeArtInfo === "institutions") {
    searchURL = 'https://api.si.edu/saam/v1/institutions'; 
  } else if (typeArtInfo === "exhibitions") {
    searchURL = 'https://api.si.edu/saam/v1/exhibitions';
  } else if (typeArtInfo === "audio") {
    searchURL = 'https://api.si.edu/saam/v1/audio';
  } else if (typeArtInfo === "books") {
    searchURL = 'https://api.si.edu/saam/v1/books';
  } else {
    console.log("ERROR: Type not found");
  }
  console.log("searchURL = " + searchURL);
  return searchURL;
}

/* ------------------------------------------------------------- */
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

/* ------------------------------------------------------------- */
function displayResults(typeArtInfo, typeQuery, responseJson, imgData) {
/*function displayResults(typeArtInfo, typeQuery, responseJson, responses) { */

  /*const response_default_image_url = responses[0];
  const response_video_url = responses[1];

  console.log("DEBUG: response_default_image_url = " + response_default_image_url + "<-------------------------");
  console.log("DEBUG: response_video_url = " + response_video_url + "<-------------------------");*/

  const values = Object.values(responseJson);
  let totalObjs = Object.keys(responseJson).length;

  /*let arr = Object.keys(responseJson);
  console.log("Looping through responseJson ");
  Object.keys(responseJson).forEach(key => console.log(
    `${key}: ${responseJson[key]}`
  ));

  console.log("Looping through responseJson.data");
  Object.keys(responseJson.data).forEach(key => console.log(
    `${key}: ${responseJson.data[key]}`
  )); */

  /* Clear out the results area of the ui */
  $('#results-list').empty();

  /* Create associated places string */
  const places_arr = responseJson.data.attributes['associated_places'];
  console.log("places_arr = " + places_arr);
  let places_str = '';
  for (let i = 0; i < places_arr.length; i++) {
    places_str = places_str.concat(places_arr[i], "; ");
  }

  /* Get bio image url using artwork_bio_images */
  let url = responseJson.data.relationships['artwork_bio_images'].links['self'].href;
  /*let url = responseJson.data.relationships['artwork_bio_images'].links['related'].href;*/
  console.log("url = " + url);
  let artwork_bio_image_url;
  artwork_bio_image_url = url + "&api_key=" + apiKey;
  console.log("artwork_bio_image_url = " + artwork_bio_image_url);

  /* Or get bio image url using default_image */
  let url2 = responseJson.data.relationships['default_image'].links['related'].href;
  console.log("url2 = " + url2);
  let default_image_url;
  default_image_url = url2 + "&api_key=" + apiKey;
  console.log("default_image_url = " + default_image_url);

  /* Or get bio image url using bio_images */
  let url3 = responseJson.data.relationships['bio_images'].links['self'].href;
  console.log("url3 = " + url3);
  let bio_image_url;
  bio_image_url = url3 + "&api_key=" + apiKey;
  console.log("bio_image_url = " + bio_image_url);

  /* Print url for default img */
  console.log("responseJson for the image: " + responseJson, imgData.data.attributes.uri.url);

  /* Print url for video */
  /*console.log("responseJson for video: " + responseJson, imgData.data.attributes.uri.url);*/

  /* Create html to push to the dom */
  $('#results-list').append(
    `
    <li>
      <a target="_blank" href="${imgData.data.attributes.uri.url}">
        <img src="${imgData.data.attributes.uri.url}" alt="img-bio" id="img-bio">
      </a> 
    <p><b>NAME:</b> ${responseJson.data.attributes['title']}</p>
    <p><b>DATE OF BIRTH:</b> ${responseJson.data.attributes['date_of_birth']}</p>
    <p><b>BIRTH PLACE:</b> ${responseJson.data.attributes['birth_place']}</p>
    <p><b>DATE OF DEATH:</b> ${responseJson.data.attributes['date_of_death']}</p>
    <p><b>PLACE OF DEATH:</b> ${responseJson.data.attributes['death_place']}</p>
    <p><b>ASSOCIATED PLACES:</b> ${places_str}</p>
    <p><b>BIOGRAPHY:</b> ${responseJson.data.attributes['luce_artist_biography'].value}</p>
    <p><b>ADDITIONAL DETAIL:</b> ${responseJson.data.attributes['luce_artist_biography'].value}</p>
    <p><b>INFO UPDATED:</b> ${responseJson.data.attributes['changed']}</p>
    </li>
    `
  );

  //display the results section  
  $('#results').removeClass('hidden');
}

/* get multiple urls at once */
async function getAllResponses(urls) {
  console.log("Start getAllResponses function");
  try {
    let data = await Promise.all (
      urls.map(
        fetch(url).then(
          (response) => response.json()
            )));
    return (data);
  } catch (error) {
    console.log("ERROR: " + error);
    $('#js-error-message').text(`Something went wrong: ${error.message}`);
  }
}

function getArtInfo(typeArtInfo="artists", typeQuery="random") {

  //typeArtInfo: artworks, artists
  //typeQuery: random, specific
  //TODO: queryMax for non-random field
  console.log("Type of art information: " + typeArtInfo);

  const params = {
    api_key: apiKey,
  };

  /* create string that can be used for randomizing the artist */
  const queryString = formatQueryParams(params);
  const searchURL = formatURL(typeArtInfo);
  /*const url = searchURL + '?' + queryString;*/

  /* use a single artist temporarily */
  const id = "/83c7b704-55e2-4c32-a682-16f1df6ceb12";
  /*const id = "/a90a4637-92c5-4436-8dea-32ca84706b8b";*/
  const url = searchURL + id + "?" + queryString ;
  console.log("artist url = " + url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      let url1 = responseJson.data.relationships['default_image'].links['related'].href;
      let default_image_url = url1 + "&api_key=" + apiKey;

      let url2 = responseJson.data.relationships['videos'].links['related'].href;
      let video_url = url2 + "&api_key=" + apiKey;

      fetch(default_image_url)
      .then(res => res.json())
      .then(imgData => { 
        displayResults(typeArtInfo, typeQuery, responseJson, imgData);
      })
    
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
} 

function listenRandomArtistButton() {
  $('form').on('click', '#random-artist', function (event) {
    getArtInfo("artists");
  });
}

/* ------------------------------------------------------------- */
function watchForm() {
  //listen for the events
  listenRandomArtistButton();
}

$(watchForm);