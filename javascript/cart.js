// create a list from session storage
function createItemList(cart) {
  for (i = 0; i < cart.length; i++) {
    var item = cart[i];
    var list = $("#cart-items");
    list.append("<li id=\"" + item.name + "-" + item.glazing + "\"><img class=\"small-pic\" src=\"" + item.image + "\" alt=\"\"><div class=\"cart-text\">" + item.name + "<div class=\"cart-subtext\">Glazing: " + item.glazing + "</div></div><div class=\"cart-num\">" + "Quantity:&nbsp;" + item.quantity + "</div><img class=\"cart-cross\" src=\"images/cross.png\" alt=\"\"></li>");
  }
}


$(document).ready(function() {
  var cart = JSON.parse(sessionStorage.getItem("savedCart"));
  if (cart === null) {
    cart = [];
  } else {
    updateItemCount(cart);
  }
  if (!cart.length == 0) {
    $("#no-item").remove();
    createItemList(cart);
  } else {
    $("#summary").remove();
  }
});
