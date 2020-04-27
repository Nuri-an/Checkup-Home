
exports.up = function(knex) {
    return knex.schema.createTable('complaints', function(table){  
        table.increments();  
        table.string('idCheckup').notNullable();  
        table.foreign('idCheckup').references('idCheckup').inTable('checkups');  
        table.string('descricao').notNullable();  
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('complaints');
};
