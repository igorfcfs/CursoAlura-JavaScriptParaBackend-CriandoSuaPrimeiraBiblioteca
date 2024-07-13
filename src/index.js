const fs = require('fs'); //fs: File System

const caminhoArquivo = process.argv; //argv: argument vector (vetor de argumentos)
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (erro, texto) => {
    quebraEmParagrafos(texto);
    //verificaPalavrasDuplicadas(texto);
});

// criar um array com as palavras
// contar as ocorrencias
// montar um objeto com o resultado

// {
//     "web": 5,
//     "computador": 4
// }

function quebraEmParagrafos(texto) {
    const paragrafos = texto.toLowerCase().split("\n");
    const contagem = paragrafos
        .flatMap((paragrafo) => {
            if (!paragrafo) return [];
            return verificaPalavrasDuplicadas(paragrafo);
        });
        /*.filter((paragrafo) => paragrafo)
        .map((paragrafo) => {
            return verificaPalavrasDuplicadas(paragrafo)
        });*/ // map e parecido com o forEach mas ele retorna um array com os elementos percorridos
    console.log(contagem);
}

function limpaPalavras(palavra){
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); // expressao regular: regex - serve para identificar padroes em textos, o g significa global, ou seja, para procurar em todo o texto
}

function verificaPalavrasDuplicadas(texto){
    const listaPalavras = texto.split(" ");
    const resultado = {};
    //objeto[propriedade] = valor; | objeto.propriedade = valor;
    listaPalavras.forEach(palavra => {
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    });
    return resultado;
}