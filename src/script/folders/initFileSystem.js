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
                        },
                        "Atlas Note": {
                            name: "Atlas Note",
                            type: "app",
                            iconName: "book",
                            url: "https://atlas-note-phi.vercel.app/"
                        },
                        "Gerador RPG": {
                            name: "Gerador RPG",
                            type: "app",
                            iconName: "beer",
                            url: "https://gerador-rpg.vercel.app/"
                        },
                        "Terminal RPG": {
                            name: "Terminal RPG",
                            type: "app",
                            iconName: "logo-game-controller-b",
                            url: "https://atylla.github.io/TerminalRPG/"
                        },
                        "To do List": {
                            name: "To-do List",
                            type: "app",
                            iconName: "list",
                            url: "https://atylla.github.io/Lista-de-Tarefas/"
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

