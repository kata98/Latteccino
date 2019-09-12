$(document).ready(function() {
    let products = productsInCart();
    console.log(products);

    displayCartData();


});

function displayCartData() {
    let products = productsInCart();

    $.ajax({
        url: "assets/data/menu.json",
        success: function(data) {



            data = data.filter(p => {
                for (let prod of products) {
                    if (p.id == prod.id) {
                        p.quantity = prod.quantity;
                        return true;
                    }

                }
                return false;
            });
            console.log(data);
            prikaziCart(data)
        }
    });
}

function prikaziCart(products) {
    let html = "";

    for (let p of products) {
        html += ` <div class="artikl">
        <img src="${p.slika.src}" alt="${p.slika.alt}" />
        <h3>${p.naziv.ime}</h3><br/>
        <p>${p.cena}<br/><br/>${p.tekst}</p><br/>
        <p> ${p.quantity}</p>
        <input class="btnBrisi" type="button" data-id="${p.id}" value="REMOVE">
    
        </div>`;

    }

    $("#baner1").html(html);

    $(".btnBrisi").click(removeFromCart);

}


function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}



function removeFromCart() {
    let id = $(this).data("id");
    let products = productsInCart();
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtered));

    displayCartData();
}