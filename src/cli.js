/* Forma nativa do node.js de lidar com exportacao e importacao de modulos, e aceita no node.js apenas
 * require - importar
 * module.exports - exportar
*/

/* Forma nova de lidar com importacao e exportacao no javascript aceita no node.js e nos navegadores
 * import
 * export
*/

/* Colocando a forma nova de importacao no codigo 
 * npm ini -y -> cria o package.json
Dentro do package.json:
 * ...
 * "type": "module",
 * ...
*/



// const fs = require('fs'); //fs: File System
// const trataErros = require('./erros/funcoesErro')

import fs from 'fs';
import trataErros from './erros/funcoesErro.js'; //export default
import { contaPalavras } from './index.js'; //export
import { montaSaidaArquivo } from './helpers.js';

const caminhoArquivo = process.argv; //argv: argument vector (vetor de argumentos)
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

//throw e return interrompem o fluxo da funcao, ou seja, a funcao para de ser executada
fs.readFile(link, 'utf-8', (erro, texto) => {
    try{
        if(erro) throw erro;
        const resultado = contaPalavras(texto);
        criaESalvaArquivo(resultado, endereco);
    } catch(erro){
        console.log(trataErros(erro));
    }
});

// + facil de entender que o then
async function criaESalvaArquivo(listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    // const textoPalavras = JSON.stringify(listaPalavras);
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('arquivo criado');
    } catch(erro) {
        throw erro;
    } finally {
        console.log('operacao finalizada');
    }
}

// + complexo de entender
// function criaESalvaArquivo(listaPalavras, endereco){
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
//     fs.promises.writeFile(arquivoNovo, textoPalavras)
//     .then((json) => {
//         //processamento feito com o resultado da promessa
//         console.log('arquivo criado');
//     })
//     .catch((erro) => {
//         throw erro;
//     })
//     .finally(() => console.log('operacao finalizada'));
// }