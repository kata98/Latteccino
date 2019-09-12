window.onload = function() {

    prikaziPictures();
    prikaziPictures1();
    prikaziNavigaciju();
    prikaziVrstu();

    document.getElementsByClassName('dugme')[0].addEventListener("click", provera);
    document.getElementsByClassName('prijava')[0].addEventListener("click", provera2);
};

function provera2() {
    var mejl = document.getElementById("mejl").value.trim();
    var regMejl = /^[a-z]{3,13}\.[a-z]{3,17}\.[1-9][0-9]{0,3}\.[0-1][0-9]@(ict.edu.rs)$/;
    if (mejl == "") {
        mejl.value = "Email is required";
    } else if (!regMejl.test(mejl)) {
        mejl.value = "Email is not valid";

    } else {
        mejl.value = "";
    }
};

function provera() {
    var ime = document.getElementById("ime").value.trim();
    var prezime = document.getElementById("prezime").value.trim();
    var mejl = document.getElementById("mejl1").value.trim();
    var lozinka = document.getElementById("lozinka").value.trim();


    var imeError = document.getElementById("imeError");
    var prezimeError = document.getElementById("prezimeError");
    var mejlError = document.getElementById("mejlError");
    var lozinkaError = document.getElementById("lozinkaError");


    var regIme = /^[A-Z][a-z]{2,10}$/;
    var regPrezime = /^[A-Z][a-z]{2,7}$/;
    var regMejl = /^[a-z]{3,13}\.[a-z]{3,17}\.[1-9][0-9]{0,3}\.[0-1][0-9]@(ict.edu.rs)$/;
    var regLozinka = /[A-Z]+[a-z]+[.,@/$%^&*()!#]/;




    if (ime == "") {
        imeError.textContent = "First name is required";
    } else if (!regIme.test(ime)) {
        imeError.textContent = "First name is not valid";

    } else {
        imeError.textContent = "";
    }


    if (prezime == "") {
        prezimeError.innerHTML = "Last name is required";

    } else if (!regPrezime.test(prezime.value)) {
        prezimeError.innerHTML = "Last name is not valid";

    } else {
        prezimeError.innerHTML = "";
    }


    if (mejl == "") {
        mejlError.innerHTML = "Email is required";
    } else if (!regMejl.test(mejl.vale)) {
        mejlError.innerHTML = "Email is not valid";

    } else {
        mejlError.innerHTML = "";
    }

    if (lozinka == "") {
        lozinkaError.innerHTML = "Password is required";
    } else if (!regLozinka.test(lozinka.value)) {
        lozinkaError.innerHTML = "Password is not valid";

    } else {
        lozinkaError.innerHTML = "";
    }

}

$('#dugmence').click(function() {
    $('#sakriveno').slideToggle("slow");
});

function prikaziPictures() {
    $.ajax({
        url: "assets/data/pictures.json",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            let ispis = "";
            for (let d of data) {
                ispis += `
                <div class="prva">
                <img src="${d.src}" alt="${d.alt}" />
            </div>
                `;
            }
            document.querySelector("#pictures").innerHTML = ispis;
        },
        error: function(xhr, error, status) {
            alert("nije ok");
        }
    });
}

function prikaziPictures1() {
    $.ajax({
        url: "assets/data/pictures1.json",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            let ispis = "";
            for (let d of data) {
                ispis += `
                <div class="prva">
                <img src="${d.src}" alt="${d.alt}" />
            </div>
                `;
            }
            document.querySelector("#pictures1").innerHTML = ispis;
        },
        error: function(xhr, error, status) {
            alert("nije ok");
        }
    });
}

function prikaziNavigaciju() {
    $.ajax({
        url: "assets/data/navigacija.json",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            let ispis = "";
            for (let d of data) {
                ispis += `
                <li><a href="${d.ahref}">${d.ime}</a></li>
                `;
            }
            document.querySelector(".lista").innerHTML = ispis;
        },
        error: function(xhr, error, status) {
            alert("nije ok");
        }
    });
}