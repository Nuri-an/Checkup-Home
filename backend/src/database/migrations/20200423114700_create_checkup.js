
exports.up = function(knex) {
    return knex.schema.createTable('checkups', function(table){  
        table.string('idCheckup').primary();  
        table.string('titulo').notNullable();  
        table.string('descricao').notNullable();  
        table.string('validacao'); 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('checkups');
};
