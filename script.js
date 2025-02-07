async function verNota() {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; // Limpiamos el contenido anterior;

  const cedula = document.getElementById("cedula").value;

  try {
    const response = await fetch('notas.json');
    const notas = await response.json();
    const nota = notas[cedula];

    if (!nota) {
      resultadoDiv.textContent = "No se encontraron notas para la cédula proporcionada.";
      return;
    }

    const listaNotas = document.createElement("ul");
    let acum = 0;
    nota.forEach((nota, index) => {
      const li = document.createElement("li");

      if (index == 5) {
        nota = acum;
        li.innerHTML = `----------------------------
        <br /> 📈 Total: <b> ${nota.toFixed(1)} </b> puntos`;
        acum = 0;

      } else {
        acum += nota * 0.2;
        li.textContent = `Tema ${index + 1}: ✏ ${nota.toFixed(1)} x 20%`;
      }
      listaNotas.appendChild(li);
    });

    resultadoDiv.appendChild(listaNotas);

  } catch (error) {
    resultadoDiv.textContent = "Error al cargar las notas.";
    console.error("Error al cargar las notas:", error);
  }
}