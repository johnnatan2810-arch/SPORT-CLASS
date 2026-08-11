// ============================================
//              SPORT CLASS
//                SCRIPT.JS
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // PRECIOS
    // ============================================

    const PRECIOS = {
        colombia: {
            normal: 50000,
            mayorista: 30000
        },

        america: {
            normal: 50000,
            mayorista: 30000
        },

        retro: {
            normal: 80000,
            mayorista: 40000
        },

        europa: {
            normal: 70000,
            mayorista: 35000
        },

        paises: {
            normal: 60000,
            mayorista: 30000
        },

        guayos: {
            normal: 150000,
            mayorista: 150000
        }
    };

    const MINIMO_MAYORISTA = 6;

    // ============================================
    // ELEMENTOS
    // ============================================

    const productosHTML =
        document.querySelectorAll(".producto");

    const ventanaProducto =
        document.getElementById("ventana-producto");

    const cerrarProducto =
        document.getElementById("cerrar-producto");

    const productoImagen =
        document.getElementById("producto-imagen");

    const productoNombre =
        document.getElementById("producto-nombre");

    const productoPrecio =
        document.getElementById("producto-precio");

    const productoMayoreo =
        document.getElementById("producto-mayoreo");

    const talla =
        document.getElementById("talla");

    const agregarCarrito =
        document.getElementById("agregar-carrito");

    const cantidadProducto =
        document.getElementById("cantidad-producto");

    const ventanaCarrito =
        document.getElementById("ventana-carrito");

    const botonCarrito =
        document.getElementById("boton-carrito");

    const cerrarCarrito =
        document.getElementById("cerrar-carrito");

    const listaCarrito =
        document.getElementById("lista-carrito");

    const totalCarrito =
        document.getElementById("total-carrito");

    const contadorCarrito =
        document.getElementById("contador-carrito");

    const botonComprar =
        document.getElementById("boton-comprar");

    const ventanaDatos =
        document.getElementById("ventana-datos");

    const cerrarDatos =
        document.getElementById("cerrar-datos");

    const formularioCompra =
        document.getElementById("formulario-compra");

    const ventanaPago =
        document.getElementById("ventana-pago");

    const cerrarPago =
        document.getElementById("cerrar-pago");

    const formularioPago =
        document.getElementById("formulario-pago");

    const totalPago =
        document.getElementById("total-pago");


    // ============================================
    // CARRITO
    // ============================================

    let carrito = [];

    let productoSeleccionado = null;


    // ============================================
    // UTILIDADES
    // ============================================

    function dinero(valor) {

        return "$" +
            Number(valor).toLocaleString("es-CO");

    }


    // ============================================
    // OBTENER CATEGORÍA
    // ============================================

    function obtenerCategoria(producto) {

        if (producto.dataset.categoria) {

            return producto.dataset.categoria
                .toLowerCase()
                .trim();

        }

        const grupo =
            producto.closest(".grupo");

        if (!grupo) {

            return "colombia";

        }

        const titulo =
            grupo
                .querySelector(".grupo-title h3")
                ?.textContent
                .toLowerCase() || "";


        if (titulo.includes("retro")) {

            return "retro";

        }


        if (titulo.includes("europa")) {

            return "europa";

        }


        if (
            titulo.includes("países") ||
            titulo.includes("paises")
        ) {

            return "paises";

        }


        if (
            titulo.includes("américa") ||
            titulo.includes("america")
        ) {

            return "america";

        }


        if (titulo.includes("colombia")) {

            return "colombia";

        }


        if (titulo.includes("guayo")) {

            return "guayos";

        }


        return "colombia";

    }


    // ============================================
    // PRECIO
    // ============================================

    function obtenerPrecio(categoria) {

        const cantidadTotal =
            carrito.reduce(
                (total, producto) =>
                    total + producto.cantidad,
                0
            );


        const precios =
            PRECIOS[categoria] ||
            PRECIOS.colombia;


        if (
            cantidadTotal >= MINIMO_MAYORISTA &&
            precios.mayorista > 0
        ) {

            return precios.mayorista;

        }


        return precios.normal;

    }


    function actualizarPreciosCarrito() {

        carrito.forEach(producto => {

            producto.precio =
                obtenerPrecio(producto.categoria);

        });

    }


    function obtenerCantidadTotal() {

        return carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );

    }


    function calcularTotal() {

        actualizarPreciosCarrito();

        return carrito.reduce(
            (total, producto) =>
                total +
                producto.precio *
                producto.cantidad,
            0
        );

    }


    // ============================================
    // CAMBIAR TALLAS SEGÚN PRODUCTO
    // ============================================

    function cambiarOpcionesTalla(categoria) {

        if (!talla) return;


        talla.innerHTML = "";


        const opcionInicial =
            document.createElement("option");

        opcionInicial.value = "";
        opcionInicial.textContent =
            categoria === "guayos"
                ? "Seleccionar talla de guayos"
                : "Seleccionar talla";

        talla.appendChild(opcionInicial);


        // ========================================
        // TALLAS DE GUAYOS
        // ========================================

        if (categoria === "guayos") {

            const tallasGuayos = [

                {
                    valor: "Colombia 38",
                    texto: "Colombia 38"
                },

                {
                    valor: "Colombia 39",
                    texto: "Colombia 39"
                },

                {
                    valor: "Colombia 40",
                    texto: "Colombia 40"
                },

                {
                    valor: "Colombia 41",
                    texto: "Colombia 41"
                },

                {
                    valor: "Colombia 42",
                    texto: "Colombia 42"
                },

                {
                    valor: "Colombia 43",
                    texto: "Colombia 43"
                },

                {
                    valor: "Colombia 44",
                    texto: "Colombia 44"
                }

            ];


            tallasGuayos.forEach(tallaGuayo => {

                const opcion =
                    document.createElement("option");

                opcion.value =
                    tallaGuayo.valor;

                opcion.textContent =
                    tallaGuayo.texto;

                talla.appendChild(opcion);

            });


            return;

        }


        // ========================================
        // TALLAS DE CAMISETAS
        // ========================================

        const tallasCamisetas = [
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ];


        tallasCamisetas.forEach(tallaCamiseta => {

            const opcion =
                document.createElement("option");

            opcion.value =
                tallaCamiseta;

            opcion.textContent =
                tallaCamiseta;

            talla.appendChild(opcion);

        });

    }


    // ============================================
    // ABRIR PRODUCTO
    // ============================================

    productosHTML.forEach(producto => {

        const boton =
            producto.querySelector(
                ".boton-producto"
            );


        if (!boton) return;


        boton.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();


                const imagen =
                    producto.querySelector("img")
                    ?.src || "";


                const nombre =
                    producto.querySelector("h4")
                    ?.textContent
                    .trim() ||

                    producto.querySelector("h3")
                    ?.textContent
                    .trim() ||

                    "Producto";


                const categoria =
                    obtenerCategoria(producto);


                const precios =
                    PRECIOS[categoria] ||
                    PRECIOS.colombia;


                productoSeleccionado = {

                    nombre: nombre,

                    categoria: categoria,

                    precio: precios.normal,

                    imagen: imagen

                };


                if (productoImagen) {

                    productoImagen.src =
                        imagen;

                    productoImagen.alt =
                        nombre;

                }


                if (productoNombre) {

                    productoNombre.textContent =
                        nombre;

                }


                if (productoPrecio) {

                    productoPrecio.innerHTML = `

                        <strong>
                            ${dinero(precios.normal)}
                        </strong>

                    `;

                }


                if (productoMayoreo) {

                    if (
                        categoria === "guayos"
                    ) {

                        productoMayoreo.textContent =
                            "Precio: $150.000";

                    } else {

                        productoMayoreo.textContent =
                            `${dinero(precios.mayorista)} c/u desde 6 prendas`;

                    }

                }


                // CAMBIA LAS TALLAS
                cambiarOpcionesTalla(
                    categoria
                );


                if (talla) {

                    talla.value = "";

                }


                if (cantidadProducto) {

                    cantidadProducto.value = 1;

                }


                if (ventanaProducto) {

                    ventanaProducto
                        .classList
                        .add("activo");

                }

            }
        );

    });


    // ============================================
    // CERRAR PRODUCTO
    // ============================================

    if (cerrarProducto) {

        cerrarProducto.addEventListener(
            "click",
            () => {

                ventanaProducto
                    ?.classList
                    .remove("activo");

            }
        );

    }


    if (ventanaProducto) {

        ventanaProducto.addEventListener(
            "click",
            evento => {

                if (
                    evento.target ===
                    ventanaProducto
                ) {

                    ventanaProducto
                        .classList
                        .remove("activo");

                }

            }
        );

    }


    // ============================================
    // AÑADIR AL CARRITO
    // ============================================

    if (agregarCarrito) {

        agregarCarrito.addEventListener(
            "click",
            () => {

                if (!productoSeleccionado) {

                    return;

                }


                if (
                    talla &&
                    talla.value === ""
                ) {

                    alert(
                        "Selecciona una talla."
                    );

                    return;

                }


                const tallaElegida =
                    talla?.value || "Única";


                let cantidad =
                    Number(
                        cantidadProducto?.value || 1
                    );


                if (
                    cantidad < 1 ||
                    isNaN(cantidad)
                ) {

                    cantidad = 1;

                }


                const productoExistente =
                    carrito.find(
                        producto =>

                            producto.nombre ===
                            productoSeleccionado.nombre &&

                            producto.talla ===
                            tallaElegida
                    );


                if (productoExistente) {

                    productoExistente.cantidad +=
                        cantidad;

                } else {

                    carrito.push({

                        nombre:
                            productoSeleccionado.nombre,

                        categoria:
                            productoSeleccionado.categoria,

                        precio:
                            productoSeleccionado.precio,

                        imagen:
                            productoSeleccionado.imagen,

                        talla:
                            tallaElegida,

                        cantidad:
                            cantidad

                    });

                }


                actualizarCarrito();


                ventanaProducto
                    ?.classList
                    .remove("activo");


                alert(
                    "Producto añadido al carrito ⚽"
                );

            }
        );

    }


    // ============================================
    // ACTUALIZAR CARRITO
    // ============================================

    function actualizarCarrito() {

        if (!listaCarrito) return;


        listaCarrito.innerHTML = "";


        if (carrito.length === 0) {

            listaCarrito.innerHTML = `

                <p class="carrito-vacio">
                    Tu carrito está vacío.
                </p>

            `;


            if (totalCarrito) {

                totalCarrito.textContent =
                    "$0";

            }


            if (contadorCarrito) {

                contadorCarrito.textContent =
                    "0";

            }


            return;

        }


        const cantidadTotal =
            obtenerCantidadTotal();


        const esMayorista =
            cantidadTotal >=
            MINIMO_MAYORISTA;


        let total = 0;


        carrito.forEach(
            (producto, indice) => {

                const precio =
                    obtenerPrecio(
                        producto.categoria
                    );


                producto.precio =
                    precio;


                const subtotal =
                    precio *
                    producto.cantidad;


                total += subtotal;


                const elemento =
                    document.createElement("div");


                elemento.classList.add(
                    "producto-carrito"
                );


                elemento.innerHTML = `

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    >

                    <div class="info-carrito">

                        <h4>
                            ${producto.nombre}
                        </h4>

                        <p>
                            Talla:
                            ${producto.talla}
                        </p>

                        <p>
                            ${dinero(precio)} c/u
                        </p>

                        <div class="cantidad-carrito">

                            <button
                                class="menos-producto"
                                data-indice="${indice}"
                            >
                                −
                            </button>

                            <strong>
                                ${producto.cantidad}
                            </strong>

                            <button
                                class="mas-producto"
                                data-indice="${indice}"
                            >
                                +
                            </button>

                        </div>

                        <p>
                            Subtotal:
                            <strong>
                                ${dinero(subtotal)}
                            </strong>
                        </p>

                    </div>

                    <button
                        class="eliminar-producto"
                        data-indice="${indice}"
                        title="Eliminar"
                    >
                        🗑️
                    </button>

                `;


                listaCarrito.appendChild(
                    elemento
                );

            }
        );


        // ========================================
        // AVISO MAYORISTA
        // ========================================

        const aviso =
            document.createElement("div");


        aviso.className =
            "aviso-mayorista";


        if (esMayorista) {

            aviso.innerHTML = `

                🎉 <strong>
                    Precio mayorista activado
                </strong>

                <br>

                Tienes ${cantidadTotal}
                unidades.
                Se aplicaron los precios
                especiales desde 6 unidades.

            `;

        } else {

            aviso.innerHTML = `

                Compra ${6 - cantidadTotal}
                unidad(es) más para activar
                los precios especiales.

            `;

        }


        listaCarrito.prepend(
            aviso
        );


        if (totalCarrito) {

            totalCarrito.textContent =
                dinero(total);

        }


        if (contadorCarrito) {

            contadorCarrito.textContent =
                cantidadTotal;

        }


        // ========================================
        // BOTÓN MENOS
        // ========================================

        document
            .querySelectorAll(".menos-producto")
            .forEach(boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        const indice =
                            Number(
                                boton.dataset.indice
                            );


                        if (carrito[indice]) {

                            carrito[indice]
                                .cantidad--;

                        }


                        if (
                            carrito[indice] &&
                            carrito[indice]
                                .cantidad <= 0
                        ) {

                            carrito.splice(
                                indice,
                                1
                            );

                        }


                        actualizarCarrito();

                    }
                );

            });


        // ========================================
        // BOTÓN MÁS
        // ========================================

        document
            .querySelectorAll(".mas-producto")
            .forEach(boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        const indice =
                            Number(
                                boton.dataset.indice
                            );


                        if (carrito[indice]) {

                            carrito[indice]
                                .cantidad++;

                        }


                        actualizarCarrito();

                    }
                );

            });


        // ========================================
        // ELIMINAR
        // ========================================

        document
            .querySelectorAll(
                ".eliminar-producto"
            )
            .forEach(boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        const indice =
                            Number(
                                boton.dataset.indice
                            );


                        carrito.splice(
                            indice,
                            1
                        );


                        actualizarCarrito();

                    }
                );

            });

    }


    // ============================================
    // ABRIR CARRITO
    // ============================================

    if (botonCarrito) {

        botonCarrito.addEventListener(
            "click",
            () => {

                actualizarCarrito();

                ventanaCarrito
                    ?.classList
                    .add("activo");

            }
        );

    }


    // ============================================
    // CERRAR CARRITO
    // ============================================

    if (cerrarCarrito) {

        cerrarCarrito.addEventListener(
            "click",
            () => {

                ventanaCarrito
                    ?.classList
                    .remove("activo");

            }
        );

    }


    if (ventanaCarrito) {

        ventanaCarrito.addEventListener(
            "click",
            evento => {

                if (
                    evento.target ===
                    ventanaCarrito
                ) {

                    ventanaCarrito
                        .classList
                        .remove("activo");

                }

            }
        );

    }


    // ============================================
    // IR A DATOS DEL CLIENTE
    // ============================================

    if (botonComprar) {

        botonComprar.addEventListener(
            "click",
            () => {

                if (
                    carrito.length === 0
                ) {

                    alert(
                        "Tu carrito está vacío."
                    );

                    return;

                }


                actualizarCarrito();


                ventanaCarrito
                    ?.classList
                    .remove("activo");


                ventanaDatos
                    ?.classList
                    .add("activo");

            }
        );

    }


    // ============================================
    // CERRAR DATOS
    // ============================================

    if (cerrarDatos) {

        cerrarDatos.addEventListener(
            "click",
            () => {

                ventanaDatos
                    ?.classList
                    .remove("activo");

            }
        );

    }


    if (ventanaDatos) {

        ventanaDatos.addEventListener(
            "click",
            evento => {

                if (
                    evento.target ===
                    ventanaDatos
                ) {

                    ventanaDatos
                        .classList
                        .remove("activo");

                }

            }
        );

    }


    // ============================================
    // CONTINUAR AL PAGO
    // ============================================

    if (formularioCompra) {

        formularioCompra.addEventListener(
            "submit",
            evento => {

                evento.preventDefault();


                const nombre =
                    document
                        .getElementById(
                            "nombre-cliente"
                        )
                        ?.value
                        .trim();


                const telefono =
                    document
                        .getElementById(
                            "telefono-cliente"
                        )
                        ?.value
                        .trim();


                const ciudad =
                    document
                        .getElementById(
                            "ciudad-cliente"
                        )
                        ?.value
                        .trim();


                const direccion =
                    document
                        .getElementById(
                            "direccion-cliente"
                        )
                        ?.value
                        .trim();


                if (
                    !nombre ||
                    !telefono ||
                    !ciudad ||
                    !direccion
                ) {

                    alert(
                        "Completa todos los datos de entrega."
                    );

                    return;

                }


                const total =
                    calcularTotal();


                if (totalPago) {

                    totalPago.textContent =
                        dinero(total);

                }


                ventanaDatos
                    ?.classList
                    .remove("activo");


                ventanaPago
                    ?.classList
                    .add("activo");

            }
        );

    }


    // ============================================
    // CERRAR PAGO
    // ============================================

    if (cerrarPago) {

        cerrarPago.addEventListener(
            "click",
            () => {

                ventanaPago
                    ?.classList
                    .remove("activo");

            }
        );

    }


    if (ventanaPago) {

        ventanaPago.addEventListener(
            "click",
            evento => {

                if (
                    evento.target ===
                    ventanaPago
                ) {

                    ventanaPago
                        .classList
                        .remove("activo");

                }

            }
        );

    }


    // ============================================
    // GMAIL
    // ============================================

    if (formularioPago) {

        formularioPago.addEventListener(
            "submit",
            evento => {

                evento.preventDefault();


                const comprobanteInput =
                    document.getElementById(
                        "comprobante"
                    );


                const comprobante =
                    comprobanteInput
                        ?.files?.[0];


                if (!comprobante) {

                    alert(
                        "Adjunta primero tu comprobante de pago."
                    );

                    return;

                }


                const nombre =
                    document
                        .getElementById(
                            "nombre-cliente"
                        )
                        ?.value
                        .trim();


                const telefono =
                    document
                        .getElementById(
                            "telefono-cliente"
                        )
                        ?.value
                        .trim();


                const ciudad =
                    document
                        .getElementById(
                            "ciudad-cliente"
                        )
                        ?.value
                        .trim();


                const direccion =
                    document
                        .getElementById(
                            "direccion-cliente"
                        )
                        ?.value
                        .trim();


                const total =
                    calcularTotal();


                let productosTexto = "";


                carrito.forEach(
                    producto => {

                        productosTexto +=
                            "• " +
                            producto.nombre +
                            " | Talla: " +
                            producto.talla +
                            " | Cantidad: " +
                            producto.cantidad +
                            " | Precio c/u: " +
                            dinero(
                                producto.precio
                            ) +
                            " | Subtotal: " +
                            dinero(
                                producto.precio *
                                producto.cantidad
                            ) +
                            "\n";

                    }
                );


                const asunto =
                    "Nuevo pedido - SPORT CLASS";


                const cuerpo =

                    "PEDIDO SPORT CLASS\n\n" +

                    "CLIENTE\n" +
                    nombre +
                    "\n\n" +

                    "TELÉFONO\n" +
                    telefono +
                    "\n\n" +

                    "CIUDAD\n" +
                    ciudad +
                    "\n\n" +

                    "DIRECCIÓN\n" +
                    direccion +
                    "\n\n" +

                    "PRODUCTOS\n" +
                    productosTexto +
                    "\n" +

                    "TOTAL\n" +
                    dinero(total) +
                    "\n\n" +

                    "PAGO\n" +
                    "Llave BRE-B: @DLLGP30001\n\n" +

                    "COMPROBANTE\n" +
                    "El comprobante será adjuntado manualmente en Gmail.\n\n" +

                    "Gracias por comprar en SPORT CLASS.";


                const gmailUrl =

                    "https://mail.google.com/mail/?view=cm" +

                    "&fs=1" +

                    "&to=" +
                    encodeURIComponent(
                        "johnnatan2810@gmail.com"
                    ) +

                    "&su=" +
                    encodeURIComponent(
                        asunto
                    ) +

                    "&body=" +
                    encodeURIComponent(
                        cuerpo
                    );


                window.open(
                    gmailUrl,
                    "_blank"
                );


                alert(
                    "Gmail se abrirá con el pedido preparado. Adjunta el comprobante y envía el correo."
                );

            }
        );

    }


    // ============================================
    // INICIO
    // ============================================

    actualizarCarrito();

});