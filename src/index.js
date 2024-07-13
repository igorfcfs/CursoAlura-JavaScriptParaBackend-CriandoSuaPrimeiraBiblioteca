const fs = require('fs'); //fs: File System
const trataErros = require('./erros/funcoesErro')

const caminhoArquivo = process.argv; //argv: argument vector (vetor de argumentos)
const link = caminhoArquivo[2];

//throw e return interrompem o fluxo da funcao, ou seja, a funcao para de ser executada
fs.readFile(link, 'utf-8', (erro, texto) => {
    try{
        if(erro) throw erro;
        contaPalavras(texto);
    } catch(erro){
        // console.log("Qual e o erro?", erro.code);
        // return;

        // if (erro.code === 'ENOENT') console.log("erro que esperava");
        // else console.log("erro inesperado");

        console.log(trataErros(erro));
    }
});

function contaPalavras(texto){
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos
        .flatMap((paragrafo) => {
            if (!paragrafo) return [];
            return verificaPalavrasDuplicadas(paragrafo);
        });
    console.log(contagem);
}

function extraiParagrafos(texto){
    return texto.toLowerCase().split("\n");
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