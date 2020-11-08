// Map Name of Glazing to make it pretty
function nameOfGlazing(glazing) {
    if (glazing === "none") return "None";
    if (glazing === "sugarmilk") return "Sugar Milk";
    if (glazing === "vanilla") return "Vanilla Milk";
    if (glazing === "chocolate") return "Double Chocolate";
    return null;
}

// create a list from session storage
function createItemList(cart) {
  for (i = 0; i < cart.length; i++) {
    var item = cart[i];
    var list = $("#cart-items");
    list.append("<li id=\"" + item.name + "-" + item.glazing + "\"><img class=\"small-pic\" src=\"" + item.image + "\" alt=\"\"><div class=\"cart-text\">" + item.name + "<div class=\"cart-subtext\">Glazing: " + nameOfGlazing(item.glazing) + "</div></div><div class=\"cart-num\">" + "Quantity:&nbsp;" + item.quantity + "</div><img class=\"cart-cross\" src=\"images/cross.png\" alt=\"\"></li>");
  }
}

// In case where there are no items in the cart
function cleanPage() {
    $("#shopping-cart").remove();
    $("#summary").remove();
    $("#checkout").remove();
}

// Update Summary
function updateSummary(cart, totalValue) {
    var totalValue = 0;
    for (i = 0; i < cart.length; i++) {
        totalValue += cart[i].price * cart[i].quantity;
    }
    var tax = Math.round(totalValue * 7) / 100;
    var estimatedTotal = Math.round(totalValue * 107) / 100;

    // Takes care of special case
    if (totalValue * 7 % 100 === 0) {
        tax += ".00";
        estimatedTotal += ".00";
    } else if (totalValue * 7 % 10 === 0) {
        tax += "0";
        estimatedTotal += "0";
    }
    // Shipping
    estimatedTotal += 1.25;

    // Display in the summary section
    $("#subtotal").text("$" + totalValue + ".00");
    $("#tax").text("$" + tax);
    $("#estimated-total").text("$" + estimatedTotal);
}


$(document).ready(function() {
  var cart = JSON.parse(sessionStorage.getItem("savedCart"));
  if (cart === null) {
    cart = [];
  } else {
    updateItemCount(cart);
  }
  if (cart.length === 0) {
    cleanPage();
  } else {
    $("#no-item").remove();
    createItemList(cart);
    updateSummary(cart);
  }

  /* Delete an item from the cart */
  $(".cart-cross").click(function() {
    // confirm button is loaded since user could acidentally click on delete
      if(confirm('Do you want to delete this item?')) {
        // remove item from html and cart list
        var index = $(this).parent().index();
        $(this).parent().remove();
        cart.splice(index, 1);
        updateItemCount(cart);

        // base case (when there is no item in the cart)
        if (cart.length === 0) {
            cleanPage();
            $("#contents").append("<h1 id=\"no-item\">There's no item in your cart!</h1>");
        } else {
            // updating summary
            updateSummary(cart);
        }

        // update cart in session storage as well
        sessionStorage.setItem("savedCart", JSON.stringify(cart));
      }
  });
});
