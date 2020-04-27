const connection = require('../database/connection');  //conecção com o bd
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

module.exports = {
    async list(request, response) {
        const information = await connection('informations').select('*');

        return response.json(information);
    },

    async create(request, response) {
        const { titulo, descricao } = request.body; // ao invés de armazenar tudo em uma variavél, armazeou-se cada uma em uma
        const urlMidia = `${process.env.APP_URL}/files/${request.file.filename}`;
        await connection('informations').insert({  //iniciando inserção na tabela ongs
            titulo,
            descricao,
            midia: request.file.originalname,
            keyMidia: request.file.filename,
            urlMidia,
        });
        return response.json(titulo);
    },

    async delete(request, response) { 
        const { id, keyMidia } = request.params; //pega o parametro enviado, route params

        await connection('informations').where('id', id).delete();

        if (typeof keyMidia != 'undefined') {
            promisify(fs.unlink)(
                path.resolve(__dirname, '..', '..', 'tmp', 'uploads', keyMidia)
            );
            return response.status(204).send();
        } else {
            return response.status(204).send();
        }
    },
}