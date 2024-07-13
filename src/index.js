const fs = require('fs'); //fs: File System

const caminhoArquivo = process.argv; //argv: argument vector (vetor de argumentos)
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (erro, texto) => {
    console.log(texto);
});

//console.log(link);