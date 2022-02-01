//-----------------RELOJ ----------------//
const today = new Date();
let todayIs = new Date();
let time = 0;
let todaysDate = 0;
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

// display time every 1 second
function showTime() {
  // return new date and time
  let dateTime = new Date();
  // return the time
  time = dateTime.toLocaleTimeString();
  time = time.substring(0, time.length - 3);
  console.log(time);
  todaysDate =
    todayIs.getDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();
  // console.log(todayIs.getDate() + "-" + todayIs.getMonth());
}

let display = setInterval(showTime, 1000);
/////////////////////////////////////////////
/////////////////////////////////////////////

let loggedStatus = false;
const wrapAllLogin = document.querySelector(".wrapall");
const wrapAllAfterLogin = document.querySelector(".wrapallafterlogin");
const inputUser = document.querySelector(".inputuser");
const inputPass = document.querySelector(".inputpass");
const loginBtn = document.querySelector(".loginbtn");
const addHidden = document.querySelector(".addhidden");

let LoginAttempt = function () {
  if (inputUser.value === "miguel" && inputPass.value === "123") {
    loggedStatus = true;
  }

  if (loggedStatus === true) {
    wrapAllLogin.classList.add("hidden");
    wrapAllAfterLogin.style.display = "flex";
  }
};

loginBtn.addEventListener("click", LoginAttempt);

//-------------------AFTER LOGIN VISION----------------------//
const tusAhorros = document.querySelector(".tusahorrosvalue");
tusAhorros.textContent = 600;
const tuUltimoPago = document.querySelector(".ultimopagovalue");
tuUltimoPago.textContent = 60;
const cajaMovimientos = document.querySelector(".ultimosmovs");
const panelDos = document.querySelector(".panel2");
const inputPagoA = document.querySelector(".inputusuarioapagar");
const inputPagoCantidad = document.querySelector(".inputcantidadapagar");
const btnPagar = document.querySelector(".btnpagar");
const panelTres = document.querySelector(".panel3");
const inputStockName = document.querySelector(".stockname");
const inputStockCantidad = document.querySelector(".stockcantidad");
const btnInvertir = document.querySelector(".btninvertir");
const cajaInversiones = document.querySelector(".tusinversiones");
const errorCantidadNoValidaPago = document.querySelector(
  ".errorcantidadnovalidapago"
);
const errorDemasiadasTransacciones = document.querySelector(
  ".errordemasiadastransacciones"
);
const errorStockNoDisponible = document.querySelector(
  ".errorstocknodisponible"
);

const errorCantidadNoValidaInversion = document.querySelector(
  ".errorcantidadnovalidainversion"
);

////////// FUNCIONES DE AYUDA ////////////////////
function errorCantidadNoValidaPagoFuncion() {
  errorCantidadNoValidaPago.classList.add("hiddenerrors");
}

function errorDemasiadasTransaccionesFuncion() {
  errorDemasiadasTransacciones.classList.add("hiddenerrors");
}

function errorStockNoDisponibleFuncion() {
  errorStockNoDisponible.classList.add("hiddenerrors");
}

function errorCantidadNoValidaInversionFuncion() {
  errorCantidadNoValidaInversion.classList.add("hiddenerrors");
}

///////////////////////////////////////////////////

function EnviarUnPago() {
  inputPagoCantidad.value = Number(inputPagoCantidad.value);
  if (
    Number(tusAhorros.textContent) < Number(inputPagoCantidad.value) ||
    inputPagoCantidad.value == "" ||
    Math.sign(inputPagoCantidad.value) === -1 ||
    inputPagoCantidad.value == 0
  ) {
    errorCantidadNoValidaPago.classList.remove("hiddenerrors");
    setTimeout(errorCantidadNoValidaPagoFuncion, 3000);
    return;
  }

  if (cajaMovimientos.childElementCount > 20) {
    errorDemasiadasTransacciones.classList.remove("hiddenerrors");
    setTimeout(errorDemasiadasTransaccionesFuncion, 3000);
    return;
  }

  tusAhorros.textContent = tusAhorros.textContent - inputPagoCantidad.value;
  tuUltimoPago.textContent = inputPagoCantidad.value;
  cajaMovimientos.insertAdjacentHTML(
    "beforeend",
    `<div class='ultimosmovs'>${inputPagoCantidad.value} 💶 enviados a ${inputPagoA.value} (${time}, ${todaysDate}) </div>`
  );
}

btnPagar.addEventListener("click", EnviarUnPago);

// COMPRAR ACCIONES //

function CompraStocks() {
  inputStockName.value = inputStockName.value.toUpperCase();
  if (
    Number(tusAhorros.textContent) < Number(inputStockCantidad.value) ||
    inputStockCantidad.value == "" ||
    Math.sign(inputStockCantidad).value === -1
  ) {
    errorCantidadNoValidaInversion.classList.remove("hiddenerrors");
    setTimeout(errorCantidadNoValidaInversionFuncion, 3000);
    return;
  }
  if (
    inputStockName.value !== "MSFT" &&
    inputStockName.value !== "APPLE" &&
    inputStockName.value !== "TESLA"
  ) {
    errorStockNoDisponible.classList.remove("hiddenerrors");
    setTimeout(errorStockNoDisponibleFuncion, 3000);
    return;
  }

  tusAhorros.textContent = tusAhorros.textContent - inputStockCantidad.value;
  cajaInversiones.insertAdjacentHTML(
    "beforeend",
    `<div class='accioneslistadas'> <img src="/TurboBank/stockimgs/${inputStockName.value}.png">por valor de ${inputStockCantidad.value} euros &nbsp&nbsp(${todaysDate})</div>`
  );
}

btnInvertir.addEventListener("click", CompraStocks);

/*----------CERRAR SESION---------*/

const btnCerrarSesion = document.querySelector(".cerrarsesionbtn");

function CerrarSesion() {
  loggedStatus = false;
  if (loggedStatus === false) {
    wrapAllLogin.classList.remove("hidden");
    wrapAllAfterLogin.style.display = "none";
  }
}

btnCerrarSesion.addEventListener("click", CerrarSesion);
