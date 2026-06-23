// =======================================
// VLADIMIRO | TRANSFORMA TU VIDA
// APP.JS V1.0
// =======================================

const API_URL = "https://api.openai.com/v1/responses";

let ultimoResultado = "";

// ======================
// API KEY
// ======================

document.addEventListener("DOMContentLoaded", () => {

    const savedKey = localStorage.getItem("openai_api_key");

    if(savedKey){
        document.getElementById("apiKey").value = savedKey;
    }

    cargarFavoritos();
    cargarHistorial();

});

document.getElementById("saveApiKey").addEventListener("click", () => {

    const key = document.getElementById("apiKey").value.trim();

    localStorage.setItem("openai_api_key", key);

    alert("API Key guardada.");

});

// ======================
// GENERAR CONTENIDO
// ======================

document.getElementById("generateBtn").addEventListener("click", generarContenido);

async function generarContenido() {

    const apiKey = localStorage.getItem("openai_api_key");

    if(!apiKey){
        alert("Debes guardar tu API Key.");
        return;
    }

    const idea = document.getElementById("idea").value.trim();
    const categoria = document.getElementById("categoria").value;
    const emocion = document.getElementById("emocion").value;
    const longitud = document.getElementById("longitud").value;
    const modoVladimiro = document.getElementById("modoVladimiro").checked;

    if(!idea){
        alert("Escribe una idea.");
        return;
    }

    document.getElementById("resultado").innerHTML =
        "⏳ Generando contenido...";

    const prompt = `
Actúa como Vladimiro Sánchez.

Categoría:
${categoria}

Emoción:
${emocion}

Longitud:
${longitud}

Idea:
${idea}

${modoVladimiro ? `
Modo Vladimiro activado:

- Segunda persona.
- Frases cortas.
- Reflexión profunda.
- Hook fuerte.
- Evitar clichés.
- Cierre contundente.
- Lenguaje sencillo.
- Público adulto.
` : ""}

Genera contenido optimizado para TikTok.
`;

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },

            body: JSON.stringify({
                model: "gpt-5.5-mini",
                input: prompt
            })

        });

        const data = await response.json();

        let texto = "";

        if(data.output_text){
            texto = data.output_text;
        }
        else if(data.output){
            texto = JSON.stringify(data.output,null,2);
        }
        else{
            texto = "No se recibió respuesta.";
        }

        ultimoResultado = texto;

        document.getElementById("resultado").innerText = texto;

        guardarHistorial(texto);

        generarPuntuacion();

    } catch(error){

        console.error(error);

        document.getElementById("resultado").innerText =
            "Error al conectar con OpenAI.";

    }

}

// ======================
// ANALIZAR MENSAJE
// ======================

document.getElementById("analizarBtn")
.addEventListener("click", analizarMensaje);

async function analizarMensaje(){

    const apiKey = localStorage.getItem("openai_api_key");

    const texto =
        document.getElementById("analizarTexto").value.trim();

    if(!texto){
        return;
    }

    document.getElementById("analisisResultado").innerText =
        "Analizando...";

    const prompt = `
Analiza este mensaje:

"${texto}"

Devuelve:

1. Impacto emocional (0-10)
2. Reflexión (0-10)
3. Claridad (0-10)
4. Potencial viral (0-10)

Y una versión mejorada.
`;

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${apiKey}`
            },

            body:JSON.stringify({
                model:"gpt-5.5-mini",
                input:prompt
            })

        });

        const data = await response.json();

        document.getElementById("analisisResultado").innerText =
            data.output_text || "Sin respuesta.";

    }
    catch(error){

        document.getElementById("analisisResultado").innerText =
            "Error analizando.";

    }

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

    const contenedor =
        document.getElementById("favoritos");

    contenedor.innerHTML = favoritos
        .slice(0,10)
        .map(item => `<p>${item}</p>`)
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
        .map(item => `<p>${item}</p>`)
        .join("<hr>");

}

// ======================
// PUNTUACIONES SIMULADAS
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
