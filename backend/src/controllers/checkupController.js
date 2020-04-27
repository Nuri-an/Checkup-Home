const connection = require('../database/connection');  //conecção com o bd
const generateUniqueId = require('../utilis/generateUniqueId');  //metodo de criptografia, gera uma string aleatória


module.exports = {
    async listUser(request, response) {
        const checkup = await connection('checkups').where('validacao', '1').select('*');

        return response.json(checkup);
    },

    async listAdm(request, response) {
        const checkup = await connection('checkups').where('validacao', '0').select('*');

        return response.json(checkup);
    },

    async create(request, response) {
        const idCheckup = generateUniqueId();

        const {titulo, descricao, validacao} = request.body; // ao invés de armazenar tudo em uma variavél, armazeou-se cada uma em uma
        
        await connection('checkups').insert({  //iniciando inserção na tabela ongs
            idCheckup,
            titulo,
            descricao,
            validacao: '0',
        });

        return response.json(idCheckup);
    },

    async validity(request, response) {
        const { idCheckup } = request.params; //pega o parametro enviado, route params
        //const idCheckup = request.headers.authorization;
    
        await connection('checkups').where('idCheckup', idCheckup).update('validacao', '1');

        return response.json(idCheckup);
    },


    async delete(request, response){
        const { id } = request.params; //pega o parametro enviado, route params

        await connection('checkups').where('idCheckup', id).delete();

        return response.status(204).send();
        
    },
}