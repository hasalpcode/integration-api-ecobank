import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'extensions_associations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('table_name')
      table.timestamp('created_at', { useTz: true }).notNullable()
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
