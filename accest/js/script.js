const montoIngreso = document.getElementById("montoIngreso");
const seleccionMoneda = document.getElementById("monedas");
const btnCambiar = document.getElementById("cambiar");
let valorCambio = document.getElementById("valorConvertido");
const apiURL = "https://mindicador.cl/api/";

//funcion para obtener los valores de las monedas

async function monedasDeCambio () {
    try {
        const response = await fetch(apiURL);
        const moneda = await response.json();
        console.log(moneda)
        return moneda;
        
    } catch (error) {
        alert(error.message);
        return null;
    }
}
monedasDeCambio ();

//funcion para convertir el monto ingresado
async function convertirMonto () {
    const tasaDeCambio = await monedasDeCambio();
    const escala = 1000000;
    const escalaBitcoin = 1000000000000;
    if (tasaDeCambio) {
            const monto = Number(montoIngreso.value)
            if (isNaN(monto) || monto < 0) {
                alert("Ingrese un monto numérico");
                return;
            }
            const seleccion = seleccionMoneda.value;
            let resultado = 0;

            if (seleccion === "dolar") {
                resultado = monto * tasaDeCambio.dolar.valor;
                resultado = resultado / escala;
            }else if (seleccion === "euro") {
                resultado = monto * tasaDeCambio.euro.valor;
                resultado = resultado / escala;
            }else if (seleccion === "bitcoin") {
                resultado = monto * tasaDeCambio.bitcoin.valor;
                resultado = resultado / escalaBitcoin;
            }
            valorCambio.textContent = `Valor del cambio: ${resultado.toFixed(4)} ${seleccion}`;
}
}
btnCambiar.addEventListener("click", convertirMonto);