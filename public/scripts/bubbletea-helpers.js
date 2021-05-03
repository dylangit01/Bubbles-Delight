// Fetch and load all the bubbleteas (this only occurs once at the beginning)
const loadBubbleteas = function() {
  // GET request to the /bubbletea endpoint using AJAX to get all the bubbleteas (default is JSON)
  $.ajax('/bubbleteas')
    .then((bubbleteas) => {
      if (localStorage.getItem('bubbleTeas') === null) {
        
      }
      renderBubbleteas(bubbleteas);
    });

};

/*
 * Render all the bubbleteas in the app-container section
 * Input: an array of bubbletea objects
 * Function: calling createBubbleteaElement on each tweet object and appending each one to the #app-container
 */


const renderBubbleteas = function(bubbleteas) {
  // console.log($('#bubbleteaMenu'));
  for (const bubbletea of bubbleteas) {
    const $bubbletea = createBubbleteaElement(bubbletea);
    $('#bubbleteaMenu').append($bubbletea); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

/*
 * Create HTML markup of a single tweet element
 * Input: a single tweet object
 * Return: <article> element containing entire HTML structure of the tweet
 */
const createBubbleteaElement = function(bubbletea) {
  // Tweet header
  const name = bubbletea.name;
  const price = bubbletea.cost / 100;
  const imageURL = bubbletea.image_url;

  // Create tweet markup
  const $bubbletea = `
    <div class="col mb-4">
      <div class="card">
        <div class="menu-item">
          <img src=${imageURL} class="card-img-top" alt=${name} />
        </div>
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">Price: $${price}</p>
          <button type="button" class="w-100 btn btn-outline-danger">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  return $bubbletea;
};
