// Carrito
let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("carrito-lista");
    const totalCarrito = document.getElementById("total");
    listaCarrito.innerHTML = "";
    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - ${item.precio} Monedas`;
        listaCarrito.appendChild(li);
    });
    totalCarrito.textContent = total;
}

function finalizarCompra() {
    const nombreMinecraft = document.getElementById("nombre-minecraft").value;
    if (!nombreMinecraft) {
        alert("Por favor, ingresa tu nombre de Minecraft.");
        return;
    }
    enviarDiscordMensaje(`Usuario ${nombreMinecraft} ha comprado:\n${carrito.map(item => item.nombre).join(", ")}, por un total de ${total} Monedas.`);
    alert("Compra finalizada. ¡Gracias!");
    carrito = [];
    total = 0;
    actualizarCarrito();
}

// Reseñas
function abrirModalReseña(producto) {
    document.getElementById("modal-reseña").style.display = "flex";
    document.getElementById("producto-reseña").textContent = producto;
    document.getElementById("texto-reseña").value = "";
}

function cerrarModal() {
    document.getElementById("modal-reseña").style.display = "none";
}

function guardarReseña() {
    const producto = document.getElementById("producto-reseña").textContent;
    const texto = document.getElementById("texto-reseña").value;
    if (!texto) {
        alert("La reseña no puede estar vacía.");
        return;
    }
    const contenedorReseñas = document.getElementById(`reseñas-${producto}`);
    const p = document.createElement("p");
    p.textContent = texto;
    contenedorReseñas.appendChild(p);
    cerrarModal();
}

// Reportes
function enviarReporte(event) {
    event.preventDefault();
    const mensaje = document.getElementById("mensaje-reporte").value;
    const nombre = document.getElementById("nombre-reporte").value || "Anónimo";
    if (!mensaje) {
        alert("Por favor, escribe un reporte.");
        return;
    }
    enviarDiscordMensaje(`Nuevo reporte de ${nombre}:\n${mensaje}`);
    alert("Reporte enviado. ¡Gracias!");
    document.getElementById("form-reporte").reset();
}

// Enviar mensaje a Discord
function enviarDiscordMensaje(mensaje) {
    const webhookUrl = "https://discord.com/api/webhooks/1055154811860959305/2-5F5ecAzM7QUDuxRLOx4oaATyCX1_ao8mEh-2yNoC50j104raK-6Z9qYfx80-F9u1xa";
    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: mensaje })
    })
    .then(() => console.log("Mensaje enviado a Discord"))
    .catch(err => console.error("Error al enviar mensaje a Discord:", err));
}
