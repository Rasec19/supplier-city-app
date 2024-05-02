import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IReport } from 'src/app/interfaces/Report.interface';
import { EmployService } from 'src/app/services/employ.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-actions-card',
  templateUrl: './actions-card.component.html',
  styleUrls: ['./actions-card.component.css']
})
export class ActionsCardComponent {

  @Input() public politicaUsuario: string = '';
  @Input() public politicaVacaciones: number = 0;
  @Input() politicas!: any;

  @ViewChild('calendar') calendar!: any;

  isVacationsModalActive: boolean = false;
  isReporterModalActive: boolean = false;
  isloaderActive: boolean = false;
  public isDisabled: boolean = false;
  public isDisabledReortBtn: boolean = false;
  public minDate: Date = new Date();
  public maxDate: Date = new Date();
  disabledDates: Date[] = [];
  public selectedDatesVacations: string[] = [];

  dates: Date[] | undefined;
  datesInicial: Date[] | undefined;
  datesFinal: Date[] | undefined;

  public estatus = [
    {
      id: 1,
      nombreEstatus: 'Aprobado'
    },
    {
      id: 2,
      nombreEstatus: 'Pendiente'
    },
    {
      id: 3,
      nombreEstatus: 'Rechazado'
    },
    {
      id: 5,
      nombreEstatus: 'Gozada'
    },
  ];

  vacationRquestForm = new FormGroup({
    fechas: new FormControl('', [Validators.required]),
    razon: new FormControl(''),
  })

  reportForm = new FormGroup({
    fechaInicial: new FormControl('', [Validators.required]),
    fechaFinal: new FormControl('', [Validators.required]),
    estatus: new FormControl(1),
    politica: new FormControl(0),
  })

  constructor( private reportService: ReportService, private employService: EmployService ) {
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.calculateDisabledDates();
  }

  calculateDisabledDates(): void {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    // Loop through the dates and add them to disabledDates array
    for (let d = new Date(today); d <= thirtyDaysFromNow; d.setDate(d.getDate() + 1)) {
      this.disabledDates.push(new Date(d));
    }
  }

  printSelectedDates(): void {
    const selectedVacations: Date[] = this.calendar.value;
    if( selectedVacations ==  null ) this.selectedDatesVacations = [];

    const dates = selectedVacations.map(dateVacation => dateVacation.toISOString());

    this.selectedDatesVacations = dates;
  }

  vacationRequest(): void {
    this.isDisabled = !this.isDisabled;
    this.isloaderActive = !this.isloaderActive;
    const fechas = this.vacationRquestForm.controls['fechas'].value
    const razon = this.vacationRquestForm.controls['razon'].value

    const body = {
      user_id: 500,
      policy_id: this.politicaVacaciones,
      days: fechas!.length,
      rangoFechas: fechas,
      reason: razon,
      created_by: 500,
      created_on: new Date(),
      updated_by: 500,
      updated_on: new Date()
    }
    this.employService.createVacationRequest(500, body).subscribe(res => {
      this.isVacationsModalActive = false
      this.isloaderActive = !this.isloaderActive;
      location.reload()
    })
  }


  createReport(): void {
    this.isloaderActive = !this.isloaderActive;
    this.isDisabledReortBtn = !this.isDisabledReortBtn;

    const fechaInicio = this.reportForm.controls['fechaInicial'].value;
    const fechaFin = this.reportForm.controls['fechaFinal'].value;
    const estatus = this.reportForm.controls['estatus'].value;
    const politicaId = this.reportForm.controls['politica'].value;

    const body = {
      empleadoId: 500,
      fechaInicio,
      fechaFin,
      estatus,
      politicaId
    }
    this.reportService.createReport(500, body).subscribe((res: IReport) => {
      this.reportForm.reset({
        fechaInicial: '',
        fechaFinal: '',
        estatus: 1,
        politica: 0
      });

      const fileBase64 = res.contenidoArchivo;

      const byteCharacters = atob(fileBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: res.tipoMime });

      const fileUrl = window.URL.createObjectURL(blob);
      const elementLink = document.createElement('a');
      elementLink.href = fileUrl;
      elementLink.download = res.nombreArchivo;
      document.body.appendChild(elementLink);
      elementLink.click();
      window.open(fileUrl, '_blank');
      window.URL.revokeObjectURL(fileUrl);
      this.isloaderActive = !this.isloaderActive;
      this.isDisabledReortBtn = !this.isDisabledReortBtn;
      this.isReporterModalActive = false;
    })
  }

  showVacationDialog() {
    this.isVacationsModalActive = true;
  }

  showReporterDialog() {
    this.isReporterModalActive = true;
  }
}
