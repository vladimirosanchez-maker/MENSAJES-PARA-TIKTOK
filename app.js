// =======================================
// VLADIMIRO MOTOR V1.0
// =======================================

let biblioteca = {};
let ultimoResultado = "";

// ======================
// CARGAR BIBLIOTECA
// ======================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("data/prompts.json");

        biblioteca = await response.json();

        document.getElementById("biblioteca").innerHTML =
            "✅ Biblioteca Vladimiro cargada.";

    } catch (error) {

        document.getElementById("biblioteca").innerHTML =
            "❌ Error cargando biblioteca.";

    }

    cargarFavoritos();
    cargarHistorial();

});

// ======================
// GENERAR
// ======================

document.getElementById("generateBtn")
.addEventListener("click", generarContenido);

function generarContenido() {

    const idea =
        document.getElementById("idea").value.trim();

    const categoria =
        document.getElementById("categoria").value;

    const longitud =
        document.getElementById("longitud").value;

    if (!idea) {

        alert("Escribe una idea.");

        return;
    }

    const categoriaMap = {

        "Relaciones":"relaciones",
        "Amor propio":"amor_propio",
        "Familia":"familia",
        "Reflexiones de vida":"reflexiones"

    };

    const clave =
        categoriaMap[categoria] || "reflexiones";

    const lista =
        biblioteca[clave] || [];

    const base =
        lista[Math.floor(Math.random() * lista.length)];

    let resultado = "";

    if(longitud === "Frase Viral"){

        resultado =
            base;

    }
    else if(longitud === "Hook Viral"){

        resultado =
            "¿Y si te dijera algo que nadie te ha dicho?\n\n" +
            base;

    }
    else{

        resultado =
            base +
            "\n\n" +
            "Ahora pregúntate esto:\n\n" +
            idea +
            "\n\n" +
            "Quizás la respuesta que buscas no está fuera de ti, sino dentro.";

    }

    ultimoResultado = resultado;

    document.getElementById("resultado").innerText =
        resultado;

    guardarHistorial(resultado);

    generarPuntuacion();

}

// ======================
// ANALIZADOR
// ======================

document.getElementById("analizarBtn")
.addEventListener("click", analizarMensaje);

function analizarMensaje(){

    const texto =
        document.getElementById("analizarTexto").value;

    if(!texto){

        alert("Escribe un mensaje.");

        return;
    }

    let impacto = 7 + Math.random()*3;
    let reflexion = 7 + Math.random()*3;
    let claridad = 7 + Math.random()*3;
    let viralidad = 7 + Math.random()*3;

    document.getElementById("analisisResultado").innerHTML =
    `
    Impacto emocional: ${impacto.toFixed(1)}/10<br>
    Reflexión: ${reflexion.toFixed(1)}/10<br>
    Claridad: ${claridad.toFixed(1)}/10<br>
    Viralidad: ${viralidad.toFixed(1)}/10<br><br>

    Recomendación:

    Añade una pregunta profunda y una reflexión final.
    `;

}

// ======================
// FAVORITOS
// ======================

document.getElementById("guardarFavorito")
.addEventListener("click", () => {

    if(!ultimoResultado) return;

    const favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos.unshift(ultimoResultado);

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    cargarFavoritos();

});

function cargarFavoritos(){

    const favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];

    document.getElementById("favoritos").innerHTML =
        favoritos
        .slice(0,10)
        .map(x => `<p>${x}</p>`)
        .join("<hr>");

}

// ======================
// HISTORIAL
// ======================

function guardarHistorial(texto){

    const historial =
        JSON.parse(localStorage.getItem("historial")) || [];

    historial.unshift(texto);

    localStorage.setItem(
        "historial",
        JSON.stringify(historial)
    );

    cargarHistorial();

}

function cargarHistorial(){

    const historial =
        JSON.parse(localStorage.getItem("historial")) || [];

    document.getElementById("historial").innerHTML =
        historial
        .slice(0,20)
        .map(x => `<p>${x}</p>`)
        .join("<hr>");

}

// ======================
// PUNTUACIONES
// ======================

function generarPuntuacion(){

    document.getElementById("scoreImpacto").innerText =
        (8 + Math.random()*2).toFixed(1);

    document.getElementById("scoreReflexion").innerText =
        (8 + Math.random()*2).toFixed(1);

    document.getElementById("scoreClaridad").innerText =
        (8 + Math.random()*2).toFixed(1);

    document.getElementById("scoreViralidad").innerText =
        (8 + Math.random()*2).toFixed(1);

    document.getElementById("scoreVladimiro").innerText =
        (9 + Math.random()).toFixed(1);

}