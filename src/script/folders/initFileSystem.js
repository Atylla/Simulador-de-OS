export const initFileSystem = () => {
    const fsExist = localStorage.getItem('fileSystem');
    if (!fsExist) {
        const fileSystem = {
            name: "root",
            type: "folder",
            children: {
                "Área de Trabalho": {
                    name: "Área de Trabalho",
                    type: "folder",
                    children: {
                        "Nova Pasta": {
                            name: "Nova Pasta",
                            type: "folder",
                            children: {}
                        }
                    }
                },
                "Documentos": {
                    name: "Documentos",
                    type: "folder",
                    children: {}
                },
                "Imagens": {
                    name: "Imagens",
                    type: "folder",
                    children: {}
                }
            }
        };
        localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
        console.log("fileSystem criado no localStorage");
    }
}

//localStorage.removeItem('fileSystem');

