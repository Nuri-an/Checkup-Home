const connection = require('../database/connection');  //conecção com o bd

module.exports = {
    async list(request, response) {
        const complaint = await connection('complaints').select('*');

        return response.json(complaint);
    },

    async create(request, response) {
        const { idCheckup, descricao } = request.body; // ao invés de armazenar tudo em uma variavél, armazeou-se cada uma em uma

        const validacao = await connection('checkups')
            .where('idCheckup', idCheckup)  //procura pela linha que possui este id
            .select('validacao') //seleciona o campo ong_id dessa linha
            .first();        //pega o primeiro, e unico, valor encontrado

        if (typeof validacao != 'undefined') {
            if (validacao.validacao === '1') { //verifica se o valor encontrado é gual ao valor enviado pela route params

                await connection('complaints').insert({  //iniciando inserção na tabela ongs
                    idCheckup,
                    descricao,
                });
                return response.json({ status: "deu" });
            }
        } else {
            return response.json({status: `O id: ${idCheckup} não se refere a nenhum checkup listado` });
        }

    },

    async delete(request, response) {
        const { id } = request.params; //pega o parametro enviado, route params

        await connection('complaints').where('id', id).delete();

        return response.status(204).send();
    },
}