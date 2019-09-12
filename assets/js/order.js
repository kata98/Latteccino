$(document).ready(function() {
    $.ajax({
        url: "assets/data/menu.json",
        success: function(data) {
            ucitajMeni(data);
        }
    });
    $("#sort1").click(sortirajPoImenu);
});

function sortirajPoImenu() {


    $.ajax({
        url: "assets/data/menu.json",
        method: "GET",
        type: "json",
        success: function(data) {
            data.sort(function(a, b) {
                if (a.naziv.ime == b.naziv.ime)
                    return 0;
                return a.naziv.ime > b.naziv.ime ? 1 : -1;
            });

            ucitajMeni(data);

        },
        error: function(xhr, error, status) {
            alert(status);
        }
    });
}

function prikaziVrstu() {
    $.ajax({
        url: "assets/data/ddl.json",
        method: "GET",
        type: "json",
        success: function(vrste) {
            let select = " <select name='porudzbina' class='ddlporudzbina'> <option value='0'>Choose...</option>";
            for (let v of vrste) {
                select += `<option value='${v.id}'>${v.ime}</option>`;
            }
            select += "</select>";

            document.querySelector("#ddl").innerHTML = select;

            document.querySelector(".ddlporudzbina").addEventListener("change", function() {
                Number(this.value) ? filtrirajPoVrsti(this.value) : ucitajMeni();
            });

        },
        error: function(xhr, error, status) {
            alert(status);
        }
    });
}

function filtrirajPoVrsti(vrstaId) {

    $.ajax({
        url: "assets/data/menu.json",
        method: "GET",
        type: "json",
        success: function(data) {
            data = data.filter(p => p.naziv.id == vrstaId);
            ucitajMeni(data);
        },
        error: function(xhr, error, status) {
            alert(status);
        }
    });
}

function ucitajMeni(products) {
    let ispis = "";

    for (product of products) {
        ispis += prikaziMeni(product);
    }

    $("#baner").html(ispis);

    bindCartEvents();
}


function bindCartEvents() {
    $(".dugme4").click(addToCart);
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}

function addToCart() {
    let id = $(this).data("id");

    var products = productsInCart();

    if (products) {
        if (productIsAlreadyInCart()) {
            updateQuantity();
        } else {
            addToLocalStorage();
        }
    } else {

        addFirstItemToLocalStorage();
        console.log(JSON.parse(localStorage.getItem("products")))
    }

    alert("Cart successfully updated!");


    function productIsAlreadyInCart() {
        return products.filter(p => p.id == id).length;
    }

    function updateQuantity() {
        let products = productsInCart();
        for (let i in products) {
            if (products[i].id == id) {
                products[i].quantity++;
                break;
            }
        }

        localStorage.setItem("products", JSON.stringify(products));
    }

    function addToLocalStorage() {
        let products = productsInCart();
        products.push({
            id: id,
            quantity: 1
        });
        localStorage.setItem("products", JSON.stringify(products));
    }

    function addFirstItemToLocalStorage() {
        let products = [];
        products[0] = {
            id: id,
            quantity: 1
        };
        localStorage.setItem("products", JSON.stringify(products));
    }
}



function clearCart() {
    localStorage.removeItem("products");
}

function prikaziMeni(product) {
    return `
    <div class="artikl">
    <img src="${product.slika.src}" alt="${product.slika.alt}" />
    <h3>${product.naziv.ime}</h3><br/>
    <p>${product.cena}<br/><br/>${product.tekst}</p>
    <input class="dugme4" type="button" data-id="${product.id}" value="ORDER NOW">

    </div>
    `;
}