import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('nom')
      table.string('prenom')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
