let iconos = []
let selecciones = []

crearCartas()

function quitarseleccion(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
        }else{
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
        }
    }, 1000);
}


function crearCartas() {
    cargarImagenes()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < 14; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionCarta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    <img src="https://i.ibb.co/jJkt8wM/back-2.jpg" width=100%>
                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
}

function seleccionCarta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        quitarseleccion(selecciones)
        selecciones = []
    }
}

function cargarImagenes() {
    iconos = [
        '<img src="https://i.ibb.co/2FFhMnf/pngwing-com.png" width="100% ,height=100%">',
        '<img src="https://i.ibb.co/HqxQmJ7/pngwing-com-4.png"width="100%">',
        '<img src="https://i.ibb.co/hRRDW2X/pngwing-com-1.png" width=100%>',
        '<img src="https://i.ibb.co/48Zdj07/pngwing-com-3.png" width=100%>' ,
        '<img src="https://i.ibb.co/Ydt938Z/casca-guts-berserker-knight-knight-e4aebf0e50d886354df3231706cc715b.png" width=100%>',
        '<img src="https://i.ibb.co/C2M223v/descarga.png" width="65%">',
        '<img src="//i.ibb.co/vVQHJKx/410-4105167-berserk-laughing-puck-berserk-laughing-puck-1.png"" width="120%">'
    ]
}



function back(){
    location.href="index.html"
}
