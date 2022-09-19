import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'extensions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('id_ext_association').unsigned()
      .references('extensions_associations.id')
      .onDelete('SET NULL')
      .nullable()
      table.timestamp('created_at', { useTz: true })
     
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
