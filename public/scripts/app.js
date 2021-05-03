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

$("document").ready(() => {
  $(".trigger_cart").click(function () {
    console.log("11111");
    setTimeout(() => {
      $(".cart").show();
    }, 200);
    $(".cartCloseButton").click(function () {
      $(".cart").hide();
    });
  });
});


$(document).ready(function() {
  // Loads and renders current database of bubbleteas (only happens once)
  // loadBubbleteas();
});
