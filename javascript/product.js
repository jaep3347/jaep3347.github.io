function Product(name, image, price, quantity, glazing) {
  this.name = name;
  this.image = image;
  this.price = price;
  this.quantity = quantity;
  this.glazing = glazing;
}

function selectGlazing(product, glazing) {
  $('#'+product.glazing).css("border", "2px solid #E1E8EE");
  product.glazing = glazing;
  $("#glazing_pic").attr("src", "images/glazing_"+glazing+".jpg");
  $('#'+glazing).css("border", "2px solid #86939E");
}

function updateItemCount(cart) {
  var count = 0;
  for (i=0; i<cart.length; i++) {
    count += cart[i].quantity;
  }
  $("#item-count").text(count + " Items");
}

function addToCart(cart, product) {
  for (i=0; i<cart.length; i++) {
    if (cart[i].name === product.name && cart[i].glazing === product.glazing) {
      cart[i].quantity += product.quantity;
      return;
    }
  }
  cart.push(product);
}

function showConfirmation()
{
    $('#flash').html("Successfully added item to cart!");
    $('#flash').css("border-color", "#004400");
    $('#flash').css("background-color", "#A2D890");
    $('#flash').css("color", "#004400");
    $('#flash').css("visibility", "visible");
    $('#flash').show().delay( 1000 ).fadeOut();
};


$(document).ready(function() {
  var name = $('#roll-name').text();
  var image = $('#main-pic').attr('src');
  var price = parseFloat($('.product-price #price').text().replace('$','').replace(' per roll', ''));
  var quantity = parseInt($('.dropdown-one').val());
  var glazing = "none";


  var currProduct = new Product(name, image, price, quantity, glazing);

  var cart = JSON.parse(sessionStorage.getItem("savedCart"));
  if (cart === null) {
    cart = [];
  } else {
    updateItemCount(cart);
  }

  //Select Glazing
	$("#none").click(function() {
		selectGlazing(currProduct, "none");
	});
	$("#sugarmilk").click(function() {
		selectGlazing(currProduct, "sugarmilk");
	});
	$("#vanilla").click(function() {
		selectGlazing(currProduct, "vanilla");
	});
  $("#chocolate").click(function() {
  	selectGlazing(currProduct, "chocolate");
	});

  //Add to Cart
  $(".cart-btn").click(function() {
    currProduct.quantity = parseInt($('.dropdown-one').val());
    addToCart(cart, currProduct);
    updateItemCount(cart);
    console.log(cart);
    showConfirmation();
    //Save to session storage
    sessionStorage.setItem("savedCart", JSON.stringify(cart));
    currProduct = new Product(name, image, price, quantity, glazing);
  });

});
