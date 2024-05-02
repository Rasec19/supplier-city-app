import { IBalance } from "./Balance.interface";

export interface IUser {
  añosAntiguedad: number[],
  saldos: IBalance[],
  tipo: string,
  usuarioLogin: string,
  nombre: string
  politicas: Array<IPolicies>
}

export interface IPolicies {
  id: number,
  nombrePolitica: string,
}
