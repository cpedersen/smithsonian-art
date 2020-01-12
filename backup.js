  /*<a target="_blank" href="${response_default_image_url.data.attributes.uri.url}">
    <img src="${response_default_image_url.data.attributes.uri.url}" alt="img-bio" id="img-bio">
  </a> */
  
sync function getArtInfo(typeArtInfo="artworks", typeQuery="random") {
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
  
    /* get responses to all of the urls */
    let arr_urls = [];
    arr_urls = [url, default_image_url, video_url];
    const responses = await getAllResponses(arr_urls);
  
    let responseJson = arr_urls[0];
    console.log("YOUAREHERE: responseJson = " + responseJson + "<---------------------");
  
    /*let url1 = responseJson.data.relationships['default_image'].links['related'].href;
    const default_image_url = url1 + "&api_key=" + apiKey;
  
    let url2 = responseJson.data.relationships['videos'].links['related'].href;
    const video_url = url2 + "&api_key=" + apiKey;*/
  
    displayResults(typeArtInfo, typeQuery, responseJson, responses);
  }

  /*function listenRandomArtButton() {
  $('form').on('click', '#random-art', function (event) {
    console.log("You clicked the Random Art button");
    getArtInfo("artworks");
  });
} */


/* ------------------------------------------------------------- */
function getAllArtists() {

}


function watchForm() {
    //listen for the events
    listenRandomArtistButton();
    /*listenRandomArtButton();*/
  
    /* Keeping this in case I add non-random fields */
    /*$('form').submit(event => {
      event.preventDefault();
      const getArtist = $('#random-artist').val();
      const getArt = $('#random-art').val();
      getArtInfo(getArtist, getArt);
    });*/
  }