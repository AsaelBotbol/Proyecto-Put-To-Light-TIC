const contenedorQR = document.getElementById('contenedorQR');
const formulario = document.getElementById('formulario');

const QR = new QRCode(contenedorQR);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    QR.makeCode(formulario.link.value);
});

//codificador
iniciar.addEventListener("click", () => {
    fetch('http://localhost:9000/codificador.html', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: Usu.value,
                contrasenia: Pass1.value
            })
        })
        .then(response => {
            if (response.status === 200) {
                // se creo el usuario
                location.reload();
            } else {
                pan.innerText = "Ha ocurrido un error inesperado"
                pan.style.color = "red";
            }
        })
})