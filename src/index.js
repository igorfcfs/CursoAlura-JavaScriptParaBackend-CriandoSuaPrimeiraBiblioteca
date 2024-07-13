export function contaPalavras(texto){
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos
        .flatMap((paragrafo) => {
            if (!paragrafo) return [];
            return verificaPalavrasDuplicadas(paragrafo);
        });
    return contagem;
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