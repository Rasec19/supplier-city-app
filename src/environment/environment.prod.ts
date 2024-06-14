export const environment = {
  prduction: true,
  host: 'https://{{PRODUCTION}}/api/',
  employees: {
    validUser: 'empleado/validarUsuario',
    userInformation: 'empleado/obtenerDatosDelEmpleado',
    requestVacations: 'empleado/solicitarVacaciones',
    allVacationRequests: 'empleado/obtenerTodasLasPeticiones',
    vacationByUser: 'empleado/obtenerSolicitudesDeVacacionesEmpleado',
    cancelVacation: 'empleado/cancelarVacaciones',
    allEmployees: 'empleado/obtenerTodosLosEmpleados',
  },
  history: {
    userHistory: 'empleado/obtenerHistoriasEmpleado'
  },
  report: {
    createReport: 'reportes/obtenerReportes',
    createReportConciliacion: 'reportes/obtenerReporteConciliacion'
  }
}
