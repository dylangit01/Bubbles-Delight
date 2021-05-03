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
  $(".trigger_popup_fricc").click(function () {
    setTimeout(() => {
      $(".hover_bkgr_fricc").show();
    }, 500);

    $(".hover_bkgr_fricc").click(function () {
      $(".hover_bkgr_fricc").hide();
    });
    $(".popupCloseButton").click(function () {
      $(".hover_bkgr_fricc").hide();
    });
  });

});
