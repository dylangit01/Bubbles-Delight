$(document).ready(function () {
  //////////////////////////////////////////////////////////////////
  // LOCAL STORAGE FUNCTIONS ---------------------------------------
  //////////////////////////////////////////////////////////////////

  // Update the cart number if user selects bubbletea
  const updateCartNumber = function () {
    const itemNum = JSON.parse(localStorage.getItem("bubbletea")).length;
    const bubbleteas = JSON.parse(localStorage.getItem("bubbletea"));

    let totalPrice = 0;
    bubbleteas.forEach((bubbletea) => {
      const price = Number((bubbletea.bubbleteaPrice).substring(1));
      console.log(bubbletea.bubbleteaPrice);
      totalPrice += price;
    });

    if (itemNum > 0) {
      $("#cartNum").show();
      $(".cartIcon").removeClass('text-muted');
      $(".cartIcon").addClass('text-success');
    } else {
      $("#cartNum").hide();
      $(".cartIcon").removeClass('text-success');
      $(".cartIcon").addClass('text-muted');
    }
    $("#cartNum").text(itemNum);

    console.log(totalPrice);
    // $("#total_bubbletea_price").text(totalPrice);

  };

  // Get cart number from localStorage:
  if (localStorage.getItem("bubbletea")) {
    updateCartNumber();
  }

  // Build localStorage class and fns:
  class StoreBubbletea {
    static getBubbleteas() {
      let bubbleteas;
      if (localStorage.getItem("bubbletea") === null) {
        bubbleteas = [];
      } else {
        bubbleteas = JSON.parse(localStorage.getItem("bubbletea"));
      }
      return bubbleteas;
    }

    // Add new bubbletea data to localStorage
    static addBubbletea(bubbletea) {
      const bubbleteas = StoreBubbletea.getBubbleteas();
      bubbleteas.push(bubbletea);
      localStorage.setItem("bubbletea", JSON.stringify(bubbleteas));
    }

    // Remove matched bubbletea from localStorage
    static removeBubbletea(id) {
      const bubbleteas = StoreBubbletea.getBubbleteas();
      // console.log(bubbleteas);
      bubbleteas.forEach((bubbletea, index) => {
        if (bubbletea.bubbleteaId == id) {
          bubbleteas.splice(index, 1);
        }
      });
      localStorage.setItem("bubbletea", JSON.stringify(bubbleteas));
    }
  }

  //////////////////////////////////////////////////////////////////
  // USER INTERFACE FUNCTIONS --------------------------------------
  //////////////////////////////////////////////////////////////////

  // UI Class: Handle UI tasks
  class cartUI {
    static displayCartItems() {
      const storedBubbleteas = StoreBubbletea.getBubbleteas();
      const bubbleteas = storedBubbleteas;
      bubbleteas.forEach((bubbletea) => cartUI.addToCart(bubbletea));
    }

    static addToCart(bubbletea) {
      $("<tr/>")
        .html(
          `
        <td class="align-middle p-1"><img src="${bubbletea.imageUrl}" style="width:120px; height:auto; border-radius: 3px;" alt=""/></td>
        <td class="align-middle">${bubbletea.bubbleteaName}</td>
        <td class="align-middle">${bubbletea.bubbleteaPrice}</td>
        <td class="align-middle">
          <div class="form-group m-0">
            <label for="exampleFormControlSelect1"></label>
            <select class="form-control-sm " id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
        </td>
        <td class="align-middle"><i class="bi bi-x fa-2x btn removeBubbletea" style="color:#ff0000"></i></td>
        <td class="d-none">${bubbletea.bubbleteaId}</td>
        `
        )
        .appendTo("#cart-items");
    }

    // Remove UI list item:
    static removeUIBubbletea(el) {
      if (el.classList.contains("removeBubbletea")) {
        el.parentElement.parentElement.remove();
      }
    }
  }

  // Handle showing cart items event
  $(".cartBtn").click(() => {
    $("#cart-items").text("");
    cartUI.displayCartItems();
  });

  // Handle remove btn of Cart item:
  $("#cart-items").click((e) => {
    cartUI.removeUIBubbletea(e.target); // Remove item from UI

    // If statement to filter out null/undefined textContent of next element
    if (e.target.parentElement.nextElementSibling) {
      StoreBubbletea.removeBubbletea(
        e.target.parentElement.nextElementSibling.textContent
      );
    }

    updateCartNumber();
  });

  //////////////////////////////////////////////////////////////////
  // BUBBLETEA MODAL CUSTOMIZATIONS FUNCTIONS ----------------------
  //////////////////////////////////////////////////////////////////

  let bubbletea;

  // Display bubbletea customization options for a specific bubbletea through a modal
  const bubbleteaOptionsHandler = function () {
    const $card = $(this).closest(".card"); // Find closest card
    const bubbleteaId = $card.find('.d-none').text();
    const bubbleteaName = $card.find('.card-title').text();
    const bubbleteaPrice = $card.find('.card-price').text();
    const imageUrl = $card.find('img').attr('src');

    bubbletea = {
      bubbleteaId,
      bubbleteaName,
      bubbleteaPrice,
      imageUrl
    };
    const $newBubbleteaElement = createBubbleteaOptions(bubbletea);
    $('#bubbletea-options-container').empty(); // Clear container before appending
    $('#bubbletea-options-container').append($newBubbleteaElement); // Append/show specific bubbletea with options
    $('#bubbleteaOptionsModal').modal('show'); // Display modal
  };

  // Create the bubbletea options modal body specific to the bubbletea clicked
  const createBubbleteaOptions = function (bubbletea) {
    // Create bubbletea options markup for modal
    const $bubbleteaOptions = `
      <div class="card">
        <div class="menu-item">
          <img src='${bubbletea.imageUrl}' class="card-img h-100" alt='${bubbletea.bubbleteaName}' />
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${bubbletea.bubbleteaName}</h5>
          <p class="card-text mt-1"><strong>Price:</strong> ${bubbletea.bubbleteaPrice}</span></p>
          <form>

            <!-- Size -->
            <div class="form-row align-items-center">

              <div class="form-check form-check-inline form-control-lg col">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="smallSize" value="small">
              <label class="form-check-label" for="smallSize">S</label>
              </div>
              <div class="form-check form-check-inline form-control-lg col">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="mediumSize" value="medium" checked>
                <label class="form-check-label" for="mediumSize">M</label>
              </div>
              <div class="form-check form-check-inline form-control-lg col">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="largeSize" value="large">
                <label class="form-check-label" for="largeSize">L</label>
              </div>
            </div>

            <!-- Hot/Cold Switch -->
            <button type="button" class="temperature-toggle-container">
              <input type="checkbox">
              <div class="toggle toggle-cold"><i class='far fa-snowflake mr-2'></i> Cold</div>
              <div class="toggle toggle-hot">Hot <i class='fab fa-hotjar ml-2'></i></div>
            </button>

            <!-- Sugar Level -->
            <div class="form-group mt-2">
              <label for="sugarLevel"><strong>Sugar Level: </strong></label>
              <span id="sugarRangeVal">50%</span>
              <input type="range" class="form-control-range" step="25" id="sugarLevel"
                onInput="$('#sugarRangeVal').html($(this).val()+'%')">
            </div>

            <!-- Ice Level -->
            <div class="form-group mt-1">
              <label for="iceLevel"><strong>Ice Level: </strong></label>
              <span id="iceRangeVal">50%</span>
              <input type="range" class="form-control-range" step="25" id="iceLevel"
                onInput="$('#iceRangeVal').html($(this).val()+'%')">
            </div>

            <!-- Toppings -->
            <p class="mt-1"><strong>Toppings:</strong></p>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="tapioca" value="tapioca" checked>
              <label class="form-check-label" for="tapioca">Tapioca</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="pudding" value="pudding">
              <label class="form-check-label" for="pudding">Pudding</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="grass-jelly" value="grass-jelly">
              <label class="form-check-label" for="grass-jelly">Grass Jelly</label>
            </div>

            <!-- Quantity -->
            <label class="my-1 mr-2 mt-3" for="quantity"><strong>Quantity: </strong></label>
            <select class="custom-select my-1 mr-sm-2" id="quantity">
              <option value="1"selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </form>
          <span class="d-none">${bubbletea.bubbleteaId}</span>
        </div>
      </div>
    `;

    return $bubbleteaOptions;
  };

  // Store current bubbletea information in local storage if user adds it to cart through button on options modal
  const addToCartFromOptionsHandler = function () {
    $("#bubbleteaOptionsModal").modal("hide");
    StoreBubbletea.addBubbletea(bubbletea); // Current bubbletea will be stored in variable from bubbleteaOptionsHandler that's within scope
    updateCartNumber(); // Update cart number dynamically
  };


  const temperatureHandler = function () {
    console.log("made it here");
    if ($(this).checked()) {
      console.log("Checkbox is checked.");
    } else {
      console.log("Checkbox is unchecked.");
    }
  };

  //////////////////////////////////////////////////////////////////
  // EVENT LISTENERS FOR BUBBLETEA MODAL CUSTOMIZATIONS  -----------
  //////////////////////////////////////////////////////////////////

  // Event listener on all the order status update buttons (have to use class and not id)
  $(".bubbleteaOptionsBtn").on("click", bubbleteaOptionsHandler);

  // Event listener on Add to Cart button from the options modal
  $("#addToCartBtnFromOptions").on("click", addToCartFromOptionsHandler);
});
