# Consulta Processo

![Coyote](https://github.com/pbozzi/consulta-processo/blob/master/assets/coyote.gif)

API para consulta de processos eletrônicos do Estado do ES. 

> API que realiza a consulta de processos eletrônicos do Estado do ES através da página https://processoeletronico.es.gov.br.

## Instalação

1. Instale o NodeJs
1. Clone o repositório: `git clone https://github.com/pbozzi/consulta-processo`
1. Instale as dependências: `npm install`
1. Crie o arquivo .env como cópia do arquivo .env.example.

## Utilização

1. Execute a aplicação: `node server.js` ou `npm start`
1. Passe como parâmetro para a rota (get) o número do processo: `http://localhost:3000/<numero processo>`

## Retorno

HTTP Status Code
* 500: Erro interno
* 404: Processo não encontrado
* 200: Processo encontrado

JSON Processo encontrado
```json
{
    numero: "",
    assunto: "",
    situacao: "",
    interessados: [""],
    municipio: "",
    resumo: "",
    historicos: [{
        data: "",
        orgao: "",
        local: "",
        situacao: ""
    }],
}
```

## Licença

MIT License

Copyright (c) 2019 Pablo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.