export const getFolderByPath = (pathArray) => {
    const fs = JSON.parse(localStorage.getItem("fileSystem"));
    if (!fs) return null;

    let current = fs;

    for (let i = 0; i < pathArray.length; i++) {
        const segment = pathArray[i];
        if (!current.children || !current.children[segment]) {
            console.warn(`Segmento "${segment}" não encontrado!`);
            return null;
        }
        current = current.children[segment];
    }

    return current;
};

export const getFreshFolderByPath = (pathArray) => {
    const fs = JSON.parse(localStorage.getItem("fileSystem"));
    if (!fs) return null;

    let current = fs;

    for (let i = 0; i < pathArray.length; i++) {
        const segment = pathArray[i];
        if (!current.children || !current.children[segment]) {
            console.warn(`Segmento "${segment}" não encontrado!`);
            return null;
        }
        current = current.children[segment];
    }

    return current;
};





export const createFolder = (pathArray, folderName) => {
  const fs = JSON.parse(localStorage.getItem("fileSystem"));
  if (!fs) return;

  let current = fs;

  for (const segment of pathArray) {
    if (!current.children[segment]) {
      console.warn(`Pasta ${segment} não existe`);
      return;
    }
    current = current.children[segment];
  }

  // Se a pasta já existir, não cria duplicada
  if (current.children[folderName]) {
    alert("Já existe uma pasta com esse nome.");
    return;
  }

  // Cria a nova pasta
  current.children[folderName] = {
    name: folderName,
    type: "folder",
    children: {}
  };

  // Salva de volta no localStorage
  localStorage.setItem("fileSystem", JSON.stringify(fs));
}

