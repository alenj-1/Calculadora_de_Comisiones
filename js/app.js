const paises = [
    {
        codigo: "IN",
        nombre: "India",
        tasa: 0.10,
        monedaCodigo: "INR",
        monedaSimbolo: "₹",
        tasaCambioUSD: 0.011
    },

    {
        codigo: "US",
        nombre: "Estados Unidos",
        tasa: 0.15,
        monedaCodigo: "USD",
        monedaSimbolo: "US$",
        tasaCambioUSD: 1
    },

    {
        codigo: "UK",
        nombre: "Reino Unido",
        tasa: 0.12,
        monedaCodigo: "GBP",
        monedaSimbolo: "£",
        tasaCambioUSD: 1.35
    },

    {
        codigo: "DO",
        nombre: "República Dominicana",
        tasa: 0.13,
        monedaCodigo: "DOP",
        monedaSimbolo: "RD$",
        tasaCambioUSD: 0.017
    },

    {
        codigo: "MX",
        nombre: "México",
        tasa: 0.11,
        monedaCodigo: "MXN",
        monedaSimbolo: "$",
        tasaCambioUSD: 0.058
    },

    {
        codigo: "CA",
        nombre: "Canadá",
        tasa: 0.16,
        monedaCodigo: "CAD",
        monedaSimbolo: "C$",
        tasaCambioUSD: 0.73
    }
];


// Referencias de la interfaz
const formulario = document.getElementById("formComision");
const inputPais = document.getElementById("pais");
const inputVentas = document.getElementById("ventas");
const inputDescuentos = document.getElementById("descuentos");
const listaPaises = document.getElementById("listaPaises");
const mensajeError = document.getElementById("mensajeError");
const btnLimpiar = document.getElementById("btnLimpiar");
const tablaReglas = document.getElementById("tablaReglas");
const resultadoSeccion = document.getElementById("resultadoSeccion");
const simboloVentas = document.getElementById("simboloVentas");
const simboloDescuentos = document.getElementById("simboloDescuentos");

// Campos donde se mostrará el resultado
const resVentasTotales = document.getElementById("resVentasTotales");
const resDescuentos = document.getElementById("resDescuentos");
const resVentasNetas = document.getElementById("resVentasNetas");
const resPais = document.getElementById("resPais");
const resComisionNativa = document.getElementById("resComisionNativa");
const resTasaCambio = document.getElementById("resTasaCambio");
const resComision = document.getElementById("resComision");
const resFormulaPaso1 = document.getElementById("resFormulaPaso1");
const resFormulaPaso2 = document.getElementById("resFormulaPaso2");
const resFormulaPaso3 = document.getElementById("resFormulaPaso3");


// Crea las tarjetas visuales para escoger el país
function cargarTarjetasPais() {
    listaPaises.innerHTML = "";

    paises.forEach(function (pais) {
        const tarjeta = document.createElement("button");
        tarjeta.type = "button";
        tarjeta.className = "tarjeta-pais";
        tarjeta.setAttribute("data-codigo", pais.codigo);

        tarjeta.innerHTML = `
            <span class="codigo-pais">${pais.codigo}</span>
            <span class="nombre-pais">${pais.nombre}</span>
            <span class="moneda-tasa">${pais.monedaSimbolo} ${pais.monedaCodigo} · ${pais.tasa * 100}%</span>
        `;

        tarjeta.addEventListener("click", function () {
            seleccionarPais(pais.codigo);
        });

        listaPaises.appendChild(tarjeta);
    });
}


// Marca visualmente el país seleccionado y guarda el valor
function seleccionarPais(codigoPais) {
    inputPais.value = codigoPais;

    const paisSeleccionado = obtenerPaisPorCodigo(codigoPais);

    // Cambia el símbolo de los campos según la moneda del país.
    simboloVentas.textContent = paisSeleccionado.monedaSimbolo;
    simboloDescuentos.textContent = paisSeleccionado.monedaSimbolo;

    const tarjetas = document.querySelectorAll(".tarjeta-pais");

    tarjetas.forEach(function (tarjeta) {
        if (tarjeta.getAttribute("data-codigo") === codigoPais) {
            tarjeta.classList.add("activa");
        } else {
            tarjeta.classList.remove("activa");
        }
    });

    // Si el usuario cambia de país, se oculta el resultado anterior
    resultadoSeccion.classList.add("oculto");
}


// Llena la tabla con las reglas de comisión
function cargarTablaReglas() {
    tablaReglas.innerHTML = "";

    paises.forEach(function (pais) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${pais.nombre}</td>
            <td>${pais.monedaSimbolo} ${pais.monedaCodigo}</td>
            <td>(Ventas Totales - Descuentos) × ${pais.tasa * 100}%</td>
            <td>${pais.tasa * 100}%</td>
        `;
        tablaReglas.appendChild(fila);
    });
}


// Busca el país según su código
function obtenerPaisPorCodigo(codigo) {
    return paises.find(function (pais) {
        return pais.codigo === codigo;
    });
}


// Valida que los datos ingresados sean correctos
function validarDatos(ventasTotales, descuentos, codigoPais) {
    if (codigoPais === "") {
        return "Debe seleccionar un país.";
    }

    if (isNaN(ventasTotales) || ventasTotales < 0) {
        return "Las ventas totales deben ser un número mayor o igual a cero.";
    }

    if (isNaN(descuentos) || descuentos < 0) {
        return "Los descuentos deben ser un número mayor o igual a cero.";
    }

    if (descuentos > ventasTotales) {
        return "Los descuentos no pueden ser mayores que las ventas totales.";
    }

    return "";
}


// Fórmula principal de negocio
// Primero calcula en moneda nativa y luego convierte a USD
function calcularComision(ventasTotales, descuentos, pais) {
    const ventasNetas = ventasTotales - descuentos;
    const comisionNativa = ventasNetas * pais.tasa;
    const comisionUSD = comisionNativa * pais.tasaCambioUSD;

    return {
        ventasNetas: ventasNetas,
        comisionNativa: comisionNativa,
        comisionUSD: comisionUSD
    };
}


// Formatea valores como moneda
function formatearDinero(valor, codigoMoneda) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: codigoMoneda,
        minimumFractionDigits: 2
    }).format(valor);
}


// Muestra el resultado solo después del cálculo
function mostrarResultado(datos) {
    const pais = datos.pais;

    resVentasTotales.textContent = formatearDinero(datos.ventasTotales, pais.monedaCodigo);
    resDescuentos.textContent = formatearDinero(datos.descuentos, pais.monedaCodigo);
    resVentasNetas.textContent = formatearDinero(datos.ventasNetas, pais.monedaCodigo);
    resPais.textContent = `${pais.nombre} ${pais.codigo} - ${pais.monedaCodigo} · ${pais.tasa * 100}%`;

    resComisionNativa.textContent = formatearDinero(datos.comisionNativa, pais.monedaCodigo);
    resTasaCambio.textContent = `1 ${pais.monedaCodigo} = ${pais.tasaCambioUSD} USD`;
    resComision.textContent = "US" + formatearDinero(datos.comisionUSD, "USD");

    resFormulaPaso1.textContent =
        `(${formatearDinero(datos.ventasTotales, pais.monedaCodigo)} - ${formatearDinero(datos.descuentos, pais.monedaCodigo)}) = ${formatearDinero(datos.ventasNetas, pais.monedaCodigo)}`;

    resFormulaPaso2.textContent =
        `${formatearDinero(datos.ventasNetas, pais.monedaCodigo)} × ${pais.tasa * 100}% = ${formatearDinero(datos.comisionNativa, pais.monedaCodigo)}`;
    
    resFormulaPaso3.textContent =
    `${formatearDinero(datos.comisionNativa, pais.monedaCodigo)} × ${pais.tasaCambioUSD} = US${formatearDinero(datos.comisionUSD, "USD")}`;

    resultadoSeccion.classList.remove("oculto");
}


// Limpia todo y vuelve a dejar la pantalla como al inicio
function limpiarFormulario() {
    formulario.reset();
    inputPais.value = "";
    mensajeError.textContent = "";
    resultadoSeccion.classList.add("oculto");
    simboloVentas.textContent = "$";
    simboloDescuentos.textContent = "$";

    const tarjetas = document.querySelectorAll(".tarjeta-pais");
    tarjetas.forEach(function (tarjeta) {
        tarjeta.classList.remove("activa");
    });
}


// Eventos
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const codigoPais = inputPais.value;
    const ventasTotales = parseFloat(inputVentas.value);
    const descuentos = parseFloat(inputDescuentos.value);

    const error = validarDatos(ventasTotales, descuentos, codigoPais);

    if (error !== "") {
        mensajeError.textContent = error;
        resultadoSeccion.classList.add("oculto");
        return;
    }

    mensajeError.textContent = "";

    const paisSeleccionado = obtenerPaisPorCodigo(codigoPais);
    const calculo = calcularComision(ventasTotales, descuentos, paisSeleccionado);

    mostrarResultado({
        pais: paisSeleccionado,
        ventasTotales: ventasTotales,
        descuentos: descuentos,
        ventasNetas: calculo.ventasNetas,
        comisionNativa: calculo.comisionNativa,
        comisionUSD: calculo.comisionUSD
    });
});

btnLimpiar.addEventListener("click", limpiarFormulario);


cargarTarjetasPais();
cargarTablaReglas();