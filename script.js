async function verNota() {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = ""; // Limpiar contenido anterior

  const cedula = document.getElementById("cedula").value.trim();

  if (!cedula) {
    resultadoDiv.textContent = "Por favor, ingrese una cédula.";
    return;
  }

  try {
    const response = await fetch('notas.json');
    if (!response.ok) throw new Error("Error al cargar el archivo.");
    const notas = await response.json();
    const nota = notas[cedula];

    if (!nota || !Array.isArray(nota) || nota.length > 3) {
      resultadoDiv.textContent = "No se encontraron notas válidas para la cédula.";
      return;
    }

    const pesos = [0.1, 0.3, 0.3]; // 10%, 30%, 30%
    const fragment = document.createDocumentFragment();
    let acum = 0;

    nota.forEach((nota, index) => {
      const li = document.createElement("li");
      acum += nota * pesos[index];
      li.textContent = `Tema ${index + 1}: ✏ ${nota.toFixed(1)} x ${pesos[index] * 100}%`;
      fragment.appendChild(li);
    });

    const li = document.createElement("li");
    li.innerHTML = `<hr /><strong>📊 Total: ${acum.toFixed(1)} puntos</strong>`;
    fragment.appendChild(li);
    
    resultadoDiv.appendChild(fragment);

  } catch (error) {
    resultadoDiv.textContent = "Error al cargar las notas.";
    console.error("Error:", error);
  }
}
