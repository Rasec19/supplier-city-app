import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployService } from 'src/app/services/employ.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-actions-card',
  templateUrl: './actions-card.component.html',
  styleUrls: ['./actions-card.component.css']
})
export class ActionsCardComponent {

  visible: boolean = false;

  public licensTypes: string[] = ['1 año', '2 año', '3 año', '4 año', '5 año'];

  dates: Date[] | undefined;

  vacationRquestForm = new FormGroup({
    tipoLicencia: new FormControl('', [Validators.required]),
    fechas: new FormControl('', [Validators.required]),
    razon: new FormControl('', [Validators.required]),
  })

  constructor( private reportService: ReportService, private employService: EmployService ) {}

  vacationRequest(): void {
    const tipoLicencia = this.vacationRquestForm.controls['tipoLicencia'].value
    const fechas = this.vacationRquestForm.controls['fechas'].value
    const razon = this.vacationRquestForm.controls['razon'].value

    const body = {
      user_id: 500,
      policy_id: 1,
      days: fechas!.length,
      rangoFechas: fechas,
      reason: razon,
      created_by: 500,
      created_on: new Date(),
      "updated_by": 500,
      "updated_on": new Date()
    }
    this.employService.createVacationRequest(500, body).subscribe(res => {
      this.visible = false
      location.reload()
    })
  }


  createReport(): void {
    const body = {
      empleadoId: 500,
      fechaInicio: "2024-04-24T18:46:04.356Z",
      fechaFin: "2024-04-25T18:46:04.356Z",
      estatus: 1,
      politicaId: 1
    }
    this.reportService.createReport(500, body).subscribe(res => console.log(res))
  }

  showDialog() {
    this.visible = true;
  }
}
