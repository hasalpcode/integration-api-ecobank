import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ExtensionValue extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public value:string

  @column()
  public id_user:number

  @column()
  public id_extension:number




}
