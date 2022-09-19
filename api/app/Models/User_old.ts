import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nom:string

  @column()
  public prenom:string

  @column()
  public email:string

  @column()
  public true:DateTime |null

}
