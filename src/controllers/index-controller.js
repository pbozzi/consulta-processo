'use strict';

const ValidationContract = require('../util/fluent-validator');
const crawler = require('../util/crawler');

exports.get = async (req, res, next) => {
    res.status(200).send({
        title: process.env.APP_NAME,
        version: process.env.APP_VERSION
    });
}

exports.consultar = async (req, res, next) => {
    let validator = new ValidationContract();
    validator.isRequired(req.params.numero, 'O número é obrigatório');
    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
    }

    try {
        let data = await crawler.crawl(req.params.numero);
        if (data && data.numero) {
            res.send(data);
        } else {
            if (data == 404) {
                res.sendStatus(404);
            } else {
                res.sendStatus(500);
            }
        }
    } catch (error) {
        res.status(500).send({
            error: true,
            message: `Erro ao consultar processo ${req.params.numero}`,
            exception: error
        });
    }
}