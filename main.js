// ====== CONFIGURA AQUÍ TU WHATSAPP ======
        // Código de país + número, sin "+", espacios ni guiones.
        const WHATSAPP_NUMERO = "6644725977";
        const WHATSAPP_MENSAJE = "Hola, me gustaría pedir un diagnóstico para mi celular.";
        // ========================================

        const url = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(WHATSAPP_MENSAJE);
        document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = url; });
        document.getElementById("wa-numero").textContent = "+" + WHATSAPP_NUMERO;

        // ====== CATÁLOGO DE MARCAS Y MODELOS ======
        // Para agregar un modelo, solo añade su nombre a la lista de la marca.
        const CATALOGO = {
            "Apple (iPhone)": [
                "iPhone 7 / 7 Plus", "iPhone 8 / 8 Plus", "iPhone X", "iPhone XR", "iPhone XS / XS Max",
                "iPhone SE (2020)", "iPhone SE (2022)",
                "iPhone 11", "iPhone 11 Pro / Pro Max",
                "iPhone 12 mini", "iPhone 12", "iPhone 12 Pro / Pro Max",
                "iPhone 13 mini", "iPhone 13", "iPhone 13 Pro / Pro Max",
                "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro / Pro Max",
                "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro / Pro Max",
                "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro / Pro Max"
            ],
            "Samsung": [
                "Galaxy A03 / A03s", "Galaxy A04 / A04s", "Galaxy A05 / A05s", "Galaxy A06",
                "Galaxy A10 / A10s", "Galaxy A11", "Galaxy A12", "Galaxy A13", "Galaxy A14", "Galaxy A15", "Galaxy A16",
                "Galaxy A20 / A21s", "Galaxy A22", "Galaxy A23", "Galaxy A24", "Galaxy A25",
                "Galaxy A30 / A31 / A32", "Galaxy A33", "Galaxy A34", "Galaxy A35",
                "Galaxy A50 / A51 / A52", "Galaxy A53", "Galaxy A54", "Galaxy A55",
                "Galaxy A71 / A72 / A73",
                "Galaxy M (serie)", "Galaxy J (serie)",
                "Galaxy S10 / S10+", "Galaxy S20 / S20+ / Ultra", "Galaxy S21 / S21+ / Ultra",
                "Galaxy S22 / S22+ / Ultra", "Galaxy S23 / S23+ / Ultra", "Galaxy S24 / S24+ / Ultra",
                "Galaxy Note (serie)", "Galaxy Z Flip", "Galaxy Z Fold"
            ],
            "Motorola": [
                "Moto E (serie)", "Moto G (serie básica)", "Moto G Power", "Moto G Stylus",
                "Moto G Play", "Moto G Pure", "Moto G (serie 5G)",
                "Moto Edge (serie)", "Moto One (serie)", "Razr"
            ],
            "Xiaomi / Redmi / POCO": [
                "Redmi 9 / 9A / 9C", "Redmi 10 / 10C", "Redmi 12 / 12C", "Redmi 13 / 13C",
                "Redmi A (serie)", "Redmi Note 9", "Redmi Note 10", "Redmi Note 11",
                "Redmi Note 12", "Redmi Note 13", "Redmi Note 14",
                "POCO X (serie)", "POCO M (serie)", "POCO F (serie)",
                "Xiaomi Mi (serie)", "Xiaomi 11 / 12 / 13 / 14"
            ],
            "Huawei / Honor": [
                "Huawei P (serie)", "Huawei Y (serie)", "Huawei Nova (serie)", "Huawei Mate (serie)",
                "Honor X (serie)", "Honor Magic (serie)", "Honor 90 / 200"
            ],
            "OPPO / Realme / Vivo": [
                "OPPO A (serie)", "OPPO Reno (serie)", "OPPO Find (serie)",
                "Realme C (serie)", "Realme Narzo (serie)", "Realme GT (serie)",
                "Vivo Y (serie)", "Vivo V (serie)", "Vivo X (serie)"
            ],
            "Google Pixel": [
                "Pixel 4 / 4a", "Pixel 5 / 5a", "Pixel 6 / 6a / 6 Pro", "Pixel 7 / 7a / 7 Pro",
                "Pixel 8 / 8a / 8 Pro", "Pixel 9 / 9 Pro / 9 Pro XL"
            ],
            "OnePlus": ["OnePlus Nord (serie)", "OnePlus 8 / 9", "OnePlus 10 / 11 / 12"],
            "ZTE / Nokia / Alcatel": ["ZTE Blade (serie)", "ZTE Axon (serie)", "Nokia (serie)", "Alcatel (serie)"],
            "Tablet": ["iPad", "Samsung Galaxy Tab", "Lenovo Tab", "Huawei MatePad", "Otra tablet"],
            "Otra marca": []
        };

        const selMarca = document.getElementById("marca");
        const selModelo = document.getElementById("modelo");
        const inputOtro = document.getElementById("modelo-otro");

        Object.keys(CATALOGO).forEach(function (marca) {
            selMarca.add(new Option(marca, marca));
        });

        selMarca.addEventListener("change", function () {
            const marca = selMarca.value;
            selModelo.innerHTML = "";
            inputOtro.style.display = "none";
            inputOtro.value = "";

            if (!marca) {
                selModelo.add(new Option("Primero elige la marca", ""));
                selModelo.disabled = true;
                return;
            }
            selModelo.disabled = false;
            selModelo.add(new Option("Seleccionar modelo...", ""));
            CATALOGO[marca].forEach(function (m) { selModelo.add(new Option(m, m)); });
            selModelo.add(new Option("Otro modelo (lo escribo yo)", "__otro__"));

            // Si no hay lista para la marca, pedir el modelo escrito directamente
            if (CATALOGO[marca].length === 0) {
                selModelo.value = "__otro__";
                inputOtro.style.display = "block";
            }
        });

        selModelo.addEventListener("change", function () {
            const esOtro = selModelo.value === "__otro__";
            inputOtro.style.display = esOtro ? "block" : "none";
            if (esOtro) inputOtro.focus();
        });

        function obtenerModeloCompleto() {
            const marca = selMarca.value;
            let modelo = selModelo.value;
            if (modelo === "__otro__") modelo = inputOtro.value.trim();
            return marca && modelo ? marca + " - " + modelo : "";
        }

        // ====== FORMULARIO DE REPARACIÓN + FOTOS ======
        const MAX_FOTOS_MB = 5;
        const form = document.getElementById("form-reparacion");
        const errorBox = document.getElementById("form-error");
        const slots = document.querySelectorAll(".foto-slot");

        slots.forEach(function (slot) {
            const input = slot.querySelector("input[type=file]");
            const quitar = slot.querySelector(".foto-quitar");

            input.addEventListener("change", function () {
                errorBox.textContent = "";
                const archivo = input.files[0];
                quitarVistaPrevia(slot);
                if (!archivo) return;

                if (!archivo.type.startsWith("image/")) {
                    errorBox.textContent = "Solo se permiten imágenes.";
                    input.value = "";
                    return;
                }
                if (archivo.size > MAX_FOTOS_MB * 1024 * 1024) {
                    errorBox.textContent = "Cada foto debe pesar máximo " + MAX_FOTOS_MB + " MB.";
                    input.value = "";
                    return;
                }
                const img = document.createElement("img");
                img.alt = "Vista previa de la foto";
                img.src = URL.createObjectURL(archivo);
                slot.appendChild(img);
                slot.classList.add("tiene-foto");
            });

            quitar.addEventListener("click", function (e) {
                e.preventDefault();
                input.value = "";
                quitarVistaPrevia(slot);
            });
        });

        function quitarVistaPrevia(slot) {
            const img = slot.querySelector("img");
            if (img) { URL.revokeObjectURL(img.src); img.remove(); }
            slot.classList.remove("tiene-foto");
        }

        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            errorBox.textContent = "";

            const nombre = document.getElementById("nombre").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const modelo = obtenerModeloCompleto();
            const problema = document.getElementById("problema").value.trim();

            if (!nombre || !telefono || !modelo || !problema) {
                errorBox.textContent = "Por favor completa todos los campos.";
                return;
            }

            const fotos = Array.from(form.querySelectorAll("input[type=file]"))
                .map(function (i) { return i.files[0]; })
                .filter(Boolean);

            const texto =
                "Hola, quiero solicitar una reparación.\n" +
                "Nombre: " + nombre + "\n" +
                "Teléfono: " + telefono + "\n" +
                "Modelo: " + modelo + "\n" +
                "Problema: " + problema +
                (fotos.length ? "\nFotos adjuntas: " + fotos.length : "");

            // En celulares compatibles se puede compartir texto + fotos directo a WhatsApp
            if (fotos.length && navigator.canShare && navigator.canShare({ files: fotos })) {
                try {
                    await navigator.share({ text: texto, files: fotos });
                    return;
                } catch (err) {
                    if (err.name === "AbortError") return; // la persona canceló
                }
            }

            // Respaldo: abrir WhatsApp con el texto (WhatsApp Web no permite adjuntar fotos por enlace)
            window.open("https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
            if (fotos.length) {
                errorBox.style.color = "#333";
                errorBox.textContent = "Se abrió WhatsApp con tu solicitud. Adjunta tus fotos en el chat para completar el envío.";
            }
        });

        // ====== REDES SOCIALES ======
        // Pega aquí el enlace de cada red. Si dejas una vacía, su icono se oculta.
        const REDES = {
            facebook:  "",   // ej. "https://facebook.com/tu-pagina"
            instagram: "",   // ej. "https://instagram.com/tu-usuario"
            tiktok:    ""    // ej. "https://tiktok.com/@tu-usuario"
        };
        document.querySelectorAll("[data-red]").forEach(function (a) {
            const enlace = REDES[a.dataset.red];
            if (enlace) { a.href = enlace; } else { a.style.display = "none"; }
        });

        // ====== ANTES Y DESPUÉS ======
        document.querySelectorAll(".ba").forEach(function (caja) {
            const rango = caja.querySelector(".ba-range");
            rango.addEventListener("input", function () {
                caja.style.setProperty("--pos", rango.value + "%");
            });
        });

        // ====== MENÚ FLOTANTE EN CELULAR (sin cursor) ======
        // En pantallas táctiles: el primer toque abre la vista flotante, el segundo va a la sección.
        if (window.matchMedia("(hover: none)").matches) {
            document.querySelectorAll(".menu-item > a").forEach(function (enlace) {
                enlace.addEventListener("click", function (e) {
                    const item = enlace.parentElement;
                    if (!item.classList.contains("abierto")) {
                        e.preventDefault();
                        document.querySelectorAll(".menu-item.abierto").forEach(function (o) { o.classList.remove("abierto"); });
                        item.classList.add("abierto");
                    }
                });
            });
            document.addEventListener("click", function (e) {
                if (!e.target.closest(".menu-item")) {
                    document.querySelectorAll(".menu-item.abierto").forEach(function (o) { o.classList.remove("abierto"); });
                }
            });
        }
