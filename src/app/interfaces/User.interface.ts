import { IStory } from "./Story.interface";

export interface IUser {
  añosAntiguedad: number[],
  saldos: IStory,
  tipo: string,
  usuarioLogin: string,
  nombre: string
}
