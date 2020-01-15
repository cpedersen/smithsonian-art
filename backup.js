    try {
      // YOUAREHERE
      if (artworkData.data.attributes['luce_center_label']['value'] === null) {
        console.log("Description is not available for this artwork");
        $('#results-list').append(
          `
          <li id="artwork_listing">
          <p><b>ARTWORK</b></p>
          <p id="artwork-indent"><b>TITLE:</b> ${artworkData.data.attributes['title']}</p>
          <p id="artwork-indent"><b>DATED:</b> ${artworkData.data.attributes['dated']}</p>
          <p id="artwork-indent"><b>DISPLAY MEDIUMS:</b> ${artworkData.data.attributes['display_mediums']}</p>
          <p id="artwork-indent"><b>IS ON VIEW?:</b> ${artworkData.data.attributes['is_on_view']}</p>
          <p id="artwork-indent"><b>NEW ACQUISTION?:</b> ${artworkData.data.attributes['is_new_acquistion']}</p>
          <p id="artwork-indent"><b>CREDIT:</b> ${artworkData.data.attributes['credit_line']}</p>
          </li>
          `
        );
      } else {
        console.log("Description is available for this artwork");
        $('#results-list').append(
          `
          <li id="artwork_listing">
          <p><b>ARTWORK</b></p>
          <p id="artwork-indent"><b>TITLE:</b> ${artworkData.data.attributes['title']}</p>
          <p id="artwork-indent"><b>DATED:</b> ${artworkData.data.attributes['dated']}</p>
          <p id="artwork-indent"><b>DISPLAY MEDIUMS:</b> ${artworkData.data.attributes['display_mediums']}</p>
          <p id="artwork-indent"><b>IS ON VIEW?:</b> ${artworkData.data.attributes['is_on_view']}</p>
          <p id="artwork-indent"><b>NEW ACQUISTION?:</b> ${artworkData.data.attributes['is_new_acquistion']}</p>
          <p id="artwork-indent"><b>CREDIT:</b> ${artworkData.data.attributes['credit_line']}</p>
          <p id="artwork-indent"><b>ARTWORK DESCRIPTION:</b> ${artworkData.data.attributes['luce_center_label']['value']}</p>
          </li>
          `
        );
      }