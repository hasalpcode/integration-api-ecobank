import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class ExtensionAssociation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public table_name:string

  @belongsTo(()=>User)
  public extension_a: BelongsTo<typeof User>

  @column()
  public table_ext_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
