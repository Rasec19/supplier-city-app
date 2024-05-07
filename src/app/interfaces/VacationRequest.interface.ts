export interface IVacationRequest {
  id: number,
  nombre: string,
  dias: number,
  rangoFechas: string,
  razon?: string,
  estatus: number
}
