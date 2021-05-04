// $("document").ready(() => {
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users",
//   }).done((users) => {
//     for (user of users.users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });
// })



$(document).ready(function() {

 class StoreBubbletea {
    static getBubbleteas(){
      let bubbleteas;
      if(localStorage.getItem('bubbletea') === null){
        bubbleteas=[];
      } else {
        bubbleteas = JSON.parse(localStorage.getItem('bubbletea'));
      }
      return bubbleteas;
    }

    static addBubbletea(bubbletea){
      const bubbleteas = StoreBubbletea.getBubbleteas();
      bubbleteas.push(bubbletea)
      localStorage.setItem('bubbletea',JSON.stringify(bubbleteas));
    }

    static removeBubbletea(bubbletea){

    }

  }

// Add to Cart
let imageUrl,bubbleteaName, bubbleteaPrice;
let addToCartBtns = document.querySelectorAll('#addToCart');
addToCartBtns.forEach(btn => btn.addEventListener('click', (e) => {
  imageUrl = e.target.parentElement.parentElement.children[0].childNodes[1].currentSrc;
  bubbleteaName = e.target.parentElement.children[0].innerHTML
  bubbleteaPrice = e.target.parentElement.children[1].innerHTML
  // console.log(imageUrl, bubbleteaName, bubbleteaPrice);

  const bubbletea = {imageUrl, bubbleteaName, bubbleteaPrice}
  StoreBubbletea.addBubbletea(bubbletea);

}));
});
