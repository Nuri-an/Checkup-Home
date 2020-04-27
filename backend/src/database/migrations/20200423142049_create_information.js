
exports.up = function(knex) { 
    return knex.schema.createTable('informations', function(table){ 
        table.increments();  
        table.string('titulo').notNullable();  
        table.string('descricao').notNullable(); 
        table.string('midia'); 
        table.string('keyMidia');
        table.string('urlMidia');  
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('informations');
};
