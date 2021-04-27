"use strict";

/* API key for Smithsonian Art Museum */
const apiKey = "OrFepxlZ19QfuIhaXWxu5AgkpQJUeeYpg2aUkycc";

/* Sample artist data */
const artist_id_arr = [
  "4039d113-5302-426d-9c9d-e4bf3db87f7e",
  "ebe8b3e9-eef5-4e0f-a5df-608abc27ed2f",
  "6e16ce20-22e9-4ee1-9fd2-e28ffbe025e9",
  "346b4f92-98d5-42f1-acc7-5a0c6285da3d",
  "c5a8e41a-1eff-4922-ad5c-a9e9d768d3e0",
  "92697604-cece-43f1-863c-2233a56f3679",
  "ad691064-908c-479a-9931-12aeb68be8ad",
  "6ca4314e-b31b-4e67-8415-2c656c6ae278",
  "ddea0bc7-3b5d-47e8-a715-7396dc9e71d2",
  "690417e5-d547-42c7-9366-cbfc379a89cb",
  "6e77d530-0190-4fac-8616-f51cca619744",
  "516717f5-107a-4845-b09b-e3e4d90c3dee",
  "0e47b10a-2a47-4b62-b960-18b5f523883f",
  "6e2c240f-baa0-4042-99f0-b65714d35149",
  "e1357839-e11b-419b-af43-9403c70c06c6",
  "4b0f9936-eb94-4044-9dbf-df5e6ed7efcb",
  "ae703fcf-b642-4621-a446-83e5ce08b50b",
  "7eb56ab8-094c-45c4-a8a3-ad8a1c69d5e0",
  "82fb4095-beb3-4dfb-949f-11c391e75327",
  "1e10bd2a-1e36-40e6-97e1-4b68de064390",
  "a5134cef-d8e8-4caf-8077-f1eed32bb1d0",
  "49677efd-07ec-4d7f-9ca9-ab9e29974283",
  "1d653012-6eed-4217-8c0c-a525652fbc70",
  "f1ce4ba3-80be-4e8c-971d-6873da5cef23",
  "0e0ea67f-f3f0-43e6-a97c-b90b79981a0b",
  "897156fc-511d-4ba9-992d-83796fad83e8",
  "40e8cc9b-9d29-47ac-a837-92b7dc2787ce",
  "36e7065c-64ee-409b-986d-559f73f97e06",
  "b07cd03d-3fd4-43dc-b9d1-18dbe4184947",
  "23e50136-a59d-4ae5-b99f-529f13c4820e",
  "e45264b5-acec-4b17-a0a3-30c2e5e4905d",
  "da920aca-bc8a-4c93-aa1a-9208f0b90bea",
  "fb6224de-edee-457d-83fb-1ad6a56d9f47",
  "bf3471bc-a59a-4e0b-9e80-7171c1ba3c98",
  "54b0c001-c05c-40ff-b4aa-7cf7f931a07d",
  "ea0edc91-6040-4f84-abb9-bddd2d93d997",
  "bbb33d87-5e7d-46a2-b38e-42fc499d6bd6",
  "e89b9fa5-f4c1-41d7-b1c0-dd474a885bb7",
  "1b98c023-a26c-42c8-b4d8-7280e01dcfe5",
  "09e4ad00-3c83-4fb5-8fc5-7bddec1b5cfc",
  "8741a84f-4d87-45ca-9e1d-8ef933c289d3",
  "3b47a253-2fe2-483f-a61b-2bf54c9680b6",
  "f7b25709-110f-4353-a14c-1a3e1c6d8964",
  "da7b6f42-4907-4947-9301-839cdf3812df",
  "ba3a72dd-8b4d-478e-87be-6320868f3258",
  "71f2c1da-cfa7-49e1-97fe-0fcc633d67b9",
  "69f57cc7-e98e-4271-8b6b-dae75ef39858",
  "496d6bbf-70b0-4095-9a73-a89fba3ff28a",
  "9478f436-5839-4f45-bb27-648e79214434",
  "ef14fe96-b7b1-4579-bf49-aee56b565ba1",
  "eafcf654-a831-4e1d-b284-b26f5b8c08aa",
];

/* ------------------------------------------------------------- */
/* Format url for a particular endpoint (only artworks and artists
   supported now) */
function formatURL(typeArtInfo) {
  let searchURL = "";
  if (typeArtInfo === "artworks") {
    searchURL = "https://api.si.edu/saam/v1/artworks";
  } else if (typeArtInfo === "artists") {
    searchURL = "https://api.si.edu/saam/v1/artists";
  } else if (typeArtInfo === "institutions") {
    searchURL = "https://api.si.edu/saam/v1/institutions";
  } else if (typeArtInfo === "exhibitions") {
    searchURL = "https://api.si.edu/saam/v1/exhibitions";
  } else if (typeArtInfo === "audio") {
    searchURL = "https://api.si.edu/saam/v1/audio";
  } else if (typeArtInfo === "books") {
    searchURL = "https://api.si.edu/saam/v1/books";
  } else {
    console.log("ERROR: Type not found");
  }
  return searchURL;
}

/* ------------------------------------------------------------- */
/* Put the query together */
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

/* ------------------------------------------------------------- */
/* Display all artwork for the random artist */
function displayArtworkResults(artworkData, artworkNum, artworkTotal) {
  /* Append artwork info for the artist, whether or not the url is working */
  if (typeof artworkData != "object") {
    if (artworkData === "error") {
      $("#results-list").append(
        `
        <section class="artwork_listing">
          <li>
            <p><b>ARTWORK</b></p>
            <p id="artwork-indent">Artwork information is unavailable</p>
          </li>
        </section>
        `
      );
    }
  } else {
    /* Check endpoints before attempting to use by using trys */
    try {
      let flag_display = 0;
      try {
        const check_val = artworkData.data.attributes.luce_center_label.value;
      } catch (error_luce) {
        flag_display++;
      }

      /* Convert null values to "Unavailable" */
      let dated = artworkData.data.attributes.dated;
      if (dated === null) {
        dated = "Unavailable";
      }
      let display_mediums = artworkData.data.attributes.display_mediums;
      if (display_mediums === null) {
        display_mediums = "Unavailable";
      }
      let credit_line = artworkData.data.attributes.credit_line;
      if (credit_line === null) {
        credit_line = "Unavailable";
      }

      /* Only display artwork description if available */
      if (flag_display === 1) {
        $("#results-list").append(
          `
          <section class="artwork_listing">
            <li>
              <p><b>ARTWORK</b></p>
              <p id="artwork-indent"><b>TITLE:</b>
                ${artworkData.data.attributes.title}</p>
              <p id="artwork-indent"><b>DATED:</b> ${dated}</p>
              <p id="artwork-indent"><b>DISPLAY MEDIUMS:</b>
                ${display_mediums}</p>
              <p id="artwork-indent"><b>IS ON VIEW?:</b>
                ${artworkData.data.attributes.is_on_view}</p>
              <p id="artwork-indent"><b>NEW ACQUISTION?:</b>
                ${artworkData.data.attributes.is_new_acquistion}</p>
              <p id="artwork-indent"><b>CREDIT:</b> ${credit_line}</p>
            </li>
          </section>
          `
        );
      } else {
        $("#results-list").append(
          `
          <section class="artwork_listing">
            <li>
            <p><b>ARTWORK</b></p>
            <p id="artwork-indent"><b>TITLE:</b>
              ${artworkData.data.attributes.title}</p>
            <p id="artwork-indent"><b>DATED:</b> ${dated}</p>
            <p id="artwork-indent"><b>DISPLAY MEDIUMS:</b>
              ${display_mediums}</p>
            <p id="artwork-indent"><b>IS ON VIEW?:</b>
              ${artworkData.data.attributes.is_on_view}</p>
            <p id="artwork-indent"><b>NEW ACQUISTION?:</b>
              ${artworkData.data.attributes.is_new_acquistion}</p>
            <p id="artwork-indent"><b>CREDIT:</b> ${credit_line}</p>
            <p id="artwork-indent"><b>ARTWORK DESCRIPTION:</b>
              ${artworkData.data.attributes.luce_center_label.value}</p>
            </li>
          </section>
          `
        );
      }
    } catch (error_artwork) {
      console.log("Cannot append artwork data: " + error_artwork);
    }
  }
  /* Stop using faded button */
  $("#random-artist-btn").removeClass("faded-btn");
}

/* ------------------------------------------------------------- */
/* Display info about the artist */
function displayArtistResults(responseJson, imgData) {
  /* Store responseJson info in array */
  const values = Object.values(responseJson);

  /* Clear out the results area of the ui */
  $("#results-list").empty();

  /* Create associated places string */
  const places_arr = responseJson.data.attributes.associated_places;
  let places_str = "";
  for (let i = 0; i < places_arr.length; i++) {
    if (places_arr.length === 1) {
      places_str = places_str.concat(places_arr[i]);
    } else {
      places_str = places_str.concat(places_arr[i], "; ");
    }
  }

  /* Print url for default img */
  /*console.log("image url = " + imgData.data.attributes.uri.url);*/

  /* Convert empty and values to "Unavailable" */
  if (places_str === "") {
    places_str = "Unavailable";
  }

  let date_of_birth = responseJson.data.attributes.date_of_birth;
  if (date_of_birth === null) {
    date_of_birth = "Unavailable";
  }

  let birth_place = responseJson.data.attributes.birth_place;
  if (birth_place === null) {
    birth_place = "Unavailable";
  }

  let date_of_death = responseJson.data.attributes.date_of_death;
  if (date_of_death === null) {
    date_of_death = "Unavailable";
  }

  let death_place = responseJson.data.attributes.death_place;
  if (death_place === null) {
    death_place = "Unavailable";
  }

  /* Append artist info */
  try {
    $("#results-list").append(
      `
      <li>
        <a target="_blank" href="${imgData.data.attributes.uri.url}">
          <img src="${imgData.data.attributes.uri.url}"
            alt="img-bio" id="img-bio">
        </a>
        <p id="tinyprint">Click image to enlarge</p>
        <p><b>INFO UPDATED:</b> ${responseJson.data.attributes.changed}</p>
        <p><b>NAME:</b> ${responseJson.data.attributes.title}</p>
        <p><b>DATE OF BIRTH:</b> ${date_of_birth}</p>
        <p><b>BIRTH PLACE:</b> ${birth_place}</p>
        <p><b>DATE OF DEATH:</b> ${date_of_death}</p>
        <p><b>PLACE OF DEATH:</b> ${death_place}</p>
        <p><b>ASSOCIATED PLACES:</b> ${places_str}</p>
      </li>
      `
    );
  } catch (error_details) {
    /* Do not need to print this error, since this info not always available */
    /*console.log("Cannot append artist biography data: " + error_details);*/
  }

  /* Also append biography if it's available */
  try {
    $("#results-list").append(
      `<li>
      <p><b>BIOGRAPHY:</b> ${responseJson.data.attributes.artist_biography.value}</p>
    </li>`
    );
  } catch (error_bio) {
    /* Do not need to print this error, since this info not always available */
    /*console.log("Cannot append artist biography data: " + error_bio);*/
  }

  try {
    $("#results-list").append(
      `<li>
      <p><b>ARTIST BACKGROUND:</b> ${responseJson.data.attributes.luce_artist_biography.value}</p>
    </li>`
    );
  } catch (error_background) {
    /* Do not need to print this error, since this info not always available */
    /*console.log("Cannot append luce artist biography data: " + error_background);*/
  }

  /* Display the results section */
  $("#results").removeClass("hidden");
}

/* ------------------------------------------------------------- */
function getArtworkInfo(artwork_arr) {
  /* Store api key */
  const params = {
    api_key: apiKey,
  };

  /* Create query using artworks endpoint */
  const queryString = formatQueryParams(params);
  const searchURL = formatURL("artworks");

  /* Keep track of errors */
  let error_count = 0;

  /* Print all artwork info for this artist */
  for (let i = 0; i < artwork_arr.length; i++) {
    const id = artwork_arr[i].id;
    const artwork_url = searchURL + "/" + id + "?" + queryString;
    fetch(artwork_url)
      .then((res) => res.json())
      .then((artworkData) => {
        displayArtworkResults(artworkData, `${i + 1}`, `${artwork_arr.length}`);
      })
      .catch((err) => {
        displayArtworkResults("error", `${i + 1}`, `${artwork_arr.length}`);
        error_count++;
      });

    $("#js-wait-message").show();
    $("#js-wait-message").text(`${i + 1} of ${artwork_arr.length}
      artworks successfully retrieved`);
  }
}

/* ------------------------------------------------------------- */
function getArtistInfo() {
  /* Store api key */
  const params = {
    api_key: apiKey,
  };

  /* Create query using artists endpoint */
  const queryString = formatQueryParams(params);
  const searchURL = formatURL("artists");

  /* Randomly find an artist */
  const id_random = Math.floor(Math.random() * artist_id_arr.length);
  const id = artist_id_arr[id_random];
  const url = searchURL + "/" + id + "?" + queryString;
  /*console.log("artist url = " + url);*/

  /* Fetch the artist url and capture the response */
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => {
      const url1 =
        responseJson.data.relationships.default_image.links.related.href;
      const default_image_url = url1 + "&api_key=" + apiKey;
      fetch(default_image_url)
        .then((res) => res.json())
        .then((imgData) => {
          displayArtistResults(responseJson, imgData);
          const artwork_arr = responseJson.data.relationships.artworks.data;
          getArtworkInfo(artwork_arr);
        });
    })
    .catch((err) => {
      $("#js-error-message").show();
      $("#js-error-message").text(`Could not retrieve artist information:
        ${err.message}`);
    });
}

/* ------------------------------------------------------------- */
function listenRandomArtistButton() {
  $("form").on("click", "#random-artist-btn", function (event) {
    /* Start fading the button */
    $("#random-artist-btn").addClass("faded-btn");
    $("#js-wait-message").show();
    /* Hide any previous error */
    $("#results").addClass("hidden");
    /* Let user know that the server call may take awhile */
    $("#js-wait-message").text("Wait for data retrieval...");
    getArtistInfo();
  });
}

/* ------------------------------------------------------------- */
function watchForm() {
  /* Hide previously displayed messages */
  $("#js-error-message").hide();
  $("#js-wait-message").hide();
  /* Listen for event */
  listenRandomArtistButton();
}

$(watchForm);
