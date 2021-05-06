// let bubbletea;

// // Handle updates from restaurant
// const bubbleteaOptionsHandler = function() {
//   const $card = $(this).closest(".card"); // Find closest card
//   const bubbleteaId = $card.find('.d-none').text();
//   const bubbleteaName = $card.find('.card-title').text();
//   const bubbleteaPrice = $card.find('.card-price').text();
//   const imageUrl = $card.find('img').attr('src');
//   // console.log(bubbleteaId, name, price, imgSrc);

//   bubbletea = { bubbleteaId, bubbleteaName, bubbleteaPrice, imageUrl };
//   const $newBubbleteaElement = createBubbleteaOptions(bubbletea);
//   $('#bubbletea-options-container').append($newBubbleteaElement); // Show specific bubbletea with options
//   $('#bubbleteaOptionsModal').modal('show');  // Display modal
// };

// const createBubbleteaOptions = function(bubbletea) {
//   // Create bubbletea options markup for modal
//   const $bubbleteaOptions = `
//     <div class="card">
//       <div class="menu-item">
//         <img src='${bubbletea.imageUrl}' class="card-img" alt='${bubbletea.bubbleteaName}' />
//       </div>
//       <div class="card-body d-flex flex-column">
//         <h5 class="card-title">${bubbletea.bubbleteaName}</h5>
//         <p class="card-text mt-1"><strong>Price:</strong> ${bubbletea.bubbleteaPrice}</span></p>
//         <form>
//           <!-- Hot/Cold Switch -->
//           <input id="hot-cold-toggle" type="checkbox" checked data-toggle="toggle" data-on="<i class='far fa-snowflake mr-2'></i>Cold"
//             data-off="Hot<i class='fab fa-hotjar ml-2'></i>" data-onstyle="primary" data-offstyle="danger"
//             data-width="100%">



//             <div class="custom-control custom-radio custom-control-inline">
//             <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input">
//             <label class="custom-control-label" for="customRadioInline1">Cold</label>
//           </div>
//           <div class="custom-control custom-radio custom-control-inline">
//             <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input">
//             <label class="custom-control-label" for="customRadioInline2">Hot</label>
//           </div>




//           <!-- Sugar Level -->
//           <div class="form-group mt-4">
//             <label for="sugarLevel"><strong>Sugar Level: </strong></label>
//             <span id="sugarRangeVal">50%</span>
//             <input type="range" class="form-control-range" step="25" id="sugarLevel"
//               onInput="$('#sugarRangeVal').html($(this).val()+'%')">
//           </div>
//           <!-- Ice Level -->
//           <div class="form-group mt-1">
//             <label for="iceLevel"><strong>Ice Level: </strong></label>
//             <span id="iceRangeVal">50%</span>
//             <input type="range" class="form-control-range" step="25" id="iceLevel"
//               onInput="$('#iceRangeVal').html($(this).val()+'%')">
//           </div>
//           <!-- Toppings -->
//           <p class="mt-1"><strong>Toppings:</strong></p>
//           <div class="form-check">
//             <input class="form-check-input" type="checkbox" id="tapioca" value="tapioca" checked>
//             <label class="form-check-label" for="tapioca">Tapioca</label>
//           </div>
//           <div class="form-check">
//             <input class="form-check-input" type="checkbox" id="pudding" value="pudding">
//             <label class="form-check-label" for="pudding">Pudding</label>
//           </div>
//           <div class="form-check">
//             <input class="form-check-input" type="checkbox" id="grass-jelly" value="grass-jelly">
//             <label class="form-check-label" for="grass-jelly">Grass Jelly</label>
//           </div>
//           <!-- Quantity -->
//           <label class="my-1 mr-2 mt-3" for="quantity"><strong>Quantity: </strong></label>
//           <select class="custom-select my-1 mr-sm-2" id="quantity">
//             <option value="1"selected>1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//             <option value="6">6</option>
//             <option value="7">7</option>
//             <option value="8">8</option>
//             <option value="9">9</option>
//             <option value="10">10</option>
//           </select>
//         </form>
//         <span class="d-none">${bubbletea.bubbleteaId}</span>
//       </div>
//     </div>
//   `;

//   return $bubbleteaOptions;
// };

// const clearOptionsHandler = function() {
//   $('#bubbletea-options-container').empty(); // Clear container
// };

// const addToCartFromOptionsHandler = function() {
//   console.log("submit from options");
//   $("#bubbleteaOptionsModal").modal("hide");
//   StoreBubbletea.addBubbletea(bubbletea);

// };

// $(document).ready(function() {
//   // Event listener on all the order status update buttons (have to use class and not id)
//   $(".bubbleteaOptionsBtn").on("click", bubbleteaOptionsHandler);

//   // Even listener on when modal is hidden to empty it's contents
//   $("#bubbleteaOptionsModal").on("hidden.bs.modal", clearOptionsHandler);

//   // Event listener on Add to Cart button from the options modal
//   $("#addToCartBtnFromOptions").on("click", addToCartFromOptionsHandler);
// });
