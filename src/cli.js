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
import path from 'path';
import trataErros from './erros/funcoesErro.js'; //export default
import { contaPalavras } from './index.js'; //export
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander'; //lib externa para configurar/padronizar o terminal com parametros
import chalk from 'chalk'; //lib externa para decorar o terminal

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options; //desestruturacao, atribuir um valor a varias variaveis ao mesmo tempo
        if (!texto || !destino) {
            console.error(chalk.red('erro, favor inserir caminho de origem e destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try{
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green('texto processado com sucesso'));
        } catch(erro){
            console.log(chalk.red('ocorreu um erro no processamento', erro));
        }
    });

program.parse();

function processaArquivo(texto, destino){
    //throw e return interrompem o fluxo da funcao, ou seja, a funcao para de ser executada
    fs.readFile(texto, 'utf-8', (erro, texto) => {
        try{
            if(erro) throw erro;
            const resultado = contaPalavras(texto);
            criaESalvaArquivo(resultado, destino);
        } catch(erro){
            console.log(trataErros(erro));
        }
    });
}

// + facil de entender que o then
async function criaESalvaArquivo(listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    // const textoPalavras = JSON.stringify(listaPalavras);
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log(chalk.yellow('arquivo criado'));
    } catch(erro) {
        throw erro;
    } finally {
        console.log(chalk.gray('operacao finalizada'));
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