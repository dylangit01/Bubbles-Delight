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
    setTimeout(() => {
      $(".cart").show();
    }, 500);
    $(".cartCloseButton").click(function () {
      $(".cart").hide();
    });
  });


});
