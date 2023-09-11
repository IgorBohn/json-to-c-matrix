const fs = require("fs");

fs.readFile("matriz.json", "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo matriz.json:", err);
    return;
  }

  try {
    const matriz = JSON.parse(data);

    if (!Array.isArray(matriz.data)) {
      console.error("O arquivo matriz.json não contém uma matriz válida.");
      return;
    }

    const matrizC = `#ifndef MATRIZ_H
#define MATRIZ_H

// Matriz de dados
int matriz[${matriz.data.length}][${matriz.data[0].length}] = {
${matriz.data.map((row) => `  {${row.join(", ")}},`).join("\n")}
};

#endif
`;

    fs.writeFile("matriz.h", matrizC, "utf8", (err) => {
      if (err) {
        console.error("Erro ao escrever o arquivo matriz.h:", err);
      } else {
        console.log("O arquivo matriz.h foi gerado com sucesso.");
      }
    });
  } catch (e) {
    console.error("Erro ao analisar o arquivo JSON:", e);
  }
});
