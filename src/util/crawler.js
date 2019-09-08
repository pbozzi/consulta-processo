'use strict';

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

exports.crawl = async function(num, print = false) {
    let args = [
        '--disable-setuid-sandbox',
        '--no-sandbox',
    ];
    let options = {
        args,
        headless: true,
        ignoreHTTPSErrors: true
    };
    let browser = await puppeteer.launch(options);
    let page = await browser.newPage();

    try {
        await page.goto(process.env.URL, {waitUntil: 'networkidle2'});
        await page.type(process.env.PROCESSO_SELECTOR, num);
        await page.click(process.env.PESQUISAR_SELECTOR);

        try {
            await page.waitForSelector(process.env.RESULTADO_SUCESSO_SELECTOR, {visible: true, timeout: process.env.URL_TIMEOUT});

            let html = await page.evaluate(() => document.getElementById('result-success').innerHTML);
            let $ = cheerio.load(html);

            function getText(element) {
                if (element) {
                    if ($(element).text()) {
                        return $(element).text().trim();
                    }
                }
                return undefined;
            }

            let processo = {};
            processo.numero = $(process.env.NUMERO_SELECTOR).text().trim();
            processo.assunto = $(process.env.ASSUNTO_SELECTOR).text();
            processo.situacao = $(process.env.SITUACAO_SELECTOR).text();
            processo.interessados = [];
            
            let arr = $(process.env.INTERESSADOS_SELECTOR);
            arr.each(function(index, element) {
                processo.interessados.push(getText($(this)));
            });

            processo.municipio = $(process.env.MUNICIPIO_SELECTOR).text();
            processo.resumo = $(process.env.RESUMO_SELECTOR).text();
            
            processo.historicos = [];
            arr = $(process.env.HISTORICOS_SELECTOR);
            arr.each(function(index, element) {
                let tds = $(this).find('td');
                if (tds && tds.length > 0) {
                    let historico = {};
                    historico.data = getText(tds[0]);
                    historico.orgao = getText(tds[1]);
                    historico.local = getText(tds[2]);
                    historico.situacao = getText(tds[3]);
                    
                    processo.historicos.push(historico);
                }
            });

            return processo;
        }
        catch (error) {
            try {
                await page.waitForSelector(process.env.RESULTADO_FALHA_SELECTOR, {timeout: 10, visible: true});
                return 404;
            } catch (error) {
                return 500;
            }
        };
    } catch (error) {
        return 500;
    } finally {
        if (print)
            await page.screenshot({path: 'processo.png', fullPage: true});
        await page.close();
        await browser.close();
    }
}