function createEventListeners() {
    const tbody = document.getElementById("tabla");
    const tds = tbody.getElementsByTagName("td");

    for (i = 0; i < tds.length; i++) {
        if (tds[i].classList.contains("elemento")) {
            continue
        }
        tds[i].addEventListener("click", function() {
            idx = texts.indexOf(this.innerHTML);
            this.style.color = colors[(idx + 1) % colors.length];
            this.style.backgroundColor = backs[(idx + 1) % backs.length];
            this.innerHTML = texts[(idx + 1) % texts.length];
        });
    }

    const elementos = document.getElementsByClassName("elemento");
    for (i = 0; i < elementos.length; i++) {
        elementos[i].addEventListener("click", function() {
            chl = this.parentElement.children

            if (this.style.backgroundColor === 'red') {
                for (i = 0; i < chl.length; i++) {
                    chl[i].style.backgroundColor = "white";
                    chl[i].style.color = "#1315a2";
                    chl[i].style.textDecoration = "none"
                    if (!chl[i].classList.contains("elemento")) {
                        chl[i].innerHTML = "";
                    }
                }
            } else {
                for (i = 0; i < chl.length; i++) {
                    chl[i].style.backgroundColor = 'red';
                    chl[i].style.color = "black";
                    if (!chl[i].classList.contains("elemento")) {
                        chl[i].innerHTML = "✘";
                    } else{
                        chl[i].style.textDecoration = "line-through"
                    }
                }
            }
        });
    }

    const desplegable = document.getElementById("desplegable");
    const tarjeta = document.getElementById("tarjeta");
    desplegable.addEventListener("click", function() {
        console.log(tarjeta.getAttribute("data-hidden"));

        if (tarjeta.getAttribute("data-hidden")=="true") {
            tarjeta.setAttribute("data-hidden", "false");
            tarjeta.style.right = 0;
        }
        else if (tarjeta.getAttribute("data-hidden")=="false") {
            tarjeta.setAttribute("data-hidden", "true");
            tarjeta.style.right = "-20%";
        }
    });
}

const colors = ['black' , 'black' , 'black','white', 'white']
const backs = ['red' , 'green' , 'yellow','blue', 'white']
const texts = ['✘' , '✔' , '◯', '⁈','']
createEventListeners();




function setup(td, i) {
    if (i < 5) {
        i--
        td.style.color = colors[i % colors.length];
        td.style.backgroundColor = backs[i % backs.length];
        td.innerHTML = texts[i % texts.length];
    }
}

