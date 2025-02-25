document.addEventListener("DOMContentLoaded", function () {
    const menuPrincipal = document.getElementById("menuPrincipal");
    const seccionBusqueda = document.getElementById("seccionBusqueda");
    const seccionAgregar = document.getElementById("seccionAgregar");
    const tablaChicas = document.getElementById("tablaChicas");
    const formAgregar = document.getElementById("formAgregar");

    function ocultarSecciones() {
        seccionBusqueda.classList.add("oculto");
        seccionAgregar.classList.add("oculto");
    }

    window.mostrarBusqueda = function () {
        ocultarSecciones();
        menuPrincipal.classList.add("oculto");
        seccionBusqueda.classList.remove("oculto");
    };

    window.mostrarFormulario = function () {
        ocultarSecciones();
        menuPrincipal.classList.add("oculto");
        seccionAgregar.classList.remove("oculto");
    };

    window.volverAlMenu = function () {
        ocultarSecciones();
        menuPrincipal.classList.remove("oculto");
        cargarChicas("http://localhost:8080/api/chicas-magicas");
    };

    function cargarChicas(url, mostrandoAcciones = false) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let contenidoTabla = `
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Ciudad</th>
                        <th>Estado Actual</th>
                        <th>Fecha de Contrato</th>
                        ${mostrandoAcciones ? '<th>Acciones</th>' : ''}
                    </tr>`;

                const chicas = Array.isArray(data) ? data : [data];

                chicas.forEach(chica => {
                    contenidoTabla += `
                        <tr data-id="${chica.id}">
                            <td>${chica.id}</td>
                            <td>${chica.nombre}</td>
                            <td>${chica.edad}</td>
                            <td>${chica.ciudadOrigen || "N/A"}</td>
                            <td>${chica.estadoActual || "N/A"}</td>
                            <td>${chica.fechaContrato ? chica.fechaContrato.substring(0, 10) : "N/A"}</td>
                            ${mostrandoAcciones ? `
                                <td>
                                    <button onclick="editarChica(${chica.id})">Editar</button>
                                    <button class="eliminar" onclick="eliminarChica(${chica.id})">Eliminar</button>
                                </td>` : ''}
                        </tr>`;
                });

                tablaChicas.innerHTML = contenidoTabla;
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
                tablaChicas.innerHTML = "<p>Error al cargar los datos.</p>";
            });
    }

    cargarChicas("http://localhost:8080/api/chicas-magicas");

    window.buscarPorId = function () {
        const id = document.getElementById("buscarId").value.trim();

        if (id === "") {
            cargarChicas("http://localhost:8080/api/chicas-magicas");
        } else {
            cargarChicas(`http://localhost:8080/api/chicas-magicas/${id}`, true);
        }
    };

    window.filtrarPorEstado = function () {
        const estado = document.getElementById("filtrarEstado").value;
        if (estado) {
            cargarChicas(`http://localhost:8080/api/chicas-magicas/estado/${estado}`, true);
        } else {
            cargarChicas("http://localhost:8080/api/chicas-magicas");
        }
    };

    formAgregar.addEventListener("submit", function (event) {
        event.preventDefault();

        const nuevaChica = {
            nombre: document.getElementById("nombre").value,
            edad: parseInt(document.getElementById("edad").value),
            ciudadOrigen: document.getElementById("ciudadOrigen").value,
            estadoActual: document.getElementById("estadoActual").value,
            fechaContrato: document.getElementById("fechaContrato").value
        };

        fetch("http://localhost:8080/api/chicas-magicas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaChica)
        })
        .then(response => response.json())
        .then(data => {
            alert("Chica mágica agregada con éxito!");
            formAgregar.reset();
            volverAlMenu();
            cargarChicas("http://localhost:8080/api/chicas-magicas");
        })
        .catch(error => {
            console.error("Error al agregar chica mágica:", error);
            alert("Hubo un error al agregar la chica.");
        });
    });

    window.eliminarChica = function (id) {
        if (confirm("¿Estás seguro de que quieres eliminar esta chica mágica?")) {
            fetch(`http://localhost:8080/api/chicas-magicas/${id}`, {
                method: "DELETE",
            })
            .then(response => {
                if (response.ok) {
                    alert("Chica mágica eliminada con éxito.");
                    volverAlMenu();
                } else {
                    alert("Error al eliminar la chica mágica.");
                }
            })
            .catch(error => {
                console.error("Error al eliminar:", error);
                alert("Error al eliminar la chica mágica.");
            });
        }
    };

    window.editarChica = function (id) {
        const fila = document.querySelector(`tr[data-id="${id}"]`);
        if (!fila) return;

        const celdas = fila.querySelectorAll("td:not(:last-child)");

        celdas.forEach((celda, index) => {
            const valorActual = celda.innerText;
            if (index === 0) return;
            if (index === 4) {  
                celda.innerHTML = `
                    <select>
                        <option value="Activa">Activa</option>
                        <option value="Retirada">Retirada</option>
                        <option value="Fallecida">Fallecida</option>
                        <option value="Desaparecida">Desaparecida</option>
                    </select>`;
                celda.querySelector("select").value = valorActual;  
            } else {
                celda.innerHTML = `<input type="text" value="${valorActual}">`;
            }
        });

        const botonEditar = fila.querySelector("button");
        botonEditar.textContent = "Guardar";
        botonEditar.onclick = function () {
            guardarEdicion(id);
        };
    };

    window.guardarEdicion = function (id) {
        const fila = document.querySelector(`tr[data-id="${id}"]`);
        if (!fila) return;

        const inputs = fila.querySelectorAll("td input, td select");
        const nuevaChica = {
            nombre: inputs[0].value,
            edad: parseInt(inputs[1].value),
            ciudadOrigen: inputs[2].value,
            estadoActual: inputs[3].value,
            fechaContrato: inputs[4].value
        };

        fetch(`http://localhost:8080/api/chicas-magicas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaChica)
        })
        .then(response => response.json())
        .then(data => {
            alert("Chica mágica actualizada con éxito!");

            fila.innerHTML = `
                <td>${id}</td>
                <td>${nuevaChica.nombre}</td>
                <td>${nuevaChica.edad}</td>
                <td>${nuevaChica.ciudadOrigen}</td>
                <td>${nuevaChica.estadoActual}</td>
                <td>${nuevaChica.fechaContrato}</td>
                <td>
                    <button onclick="editarChica(${id})">Editar</button>
                    <button class="eliminar" onclick="eliminarChica(${id})">Eliminar</button>
                </td>
            `;
        })
        .catch(error => {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al actualizar.");
        });
    };
});
