import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableRowSelectEvent } from 'primeng/table';
import { Observable } from 'rxjs';
import { IReport } from 'src/app/interfaces/Report.interface';
import { IVacationRequest } from 'src/app/interfaces/VacationRequest.interface';
import { AdminService } from 'src/app/services/admin.service';
import { EmployService } from 'src/app/services/employ.service';
import { ReportService } from 'src/app/services/report.service';

interface ISelectedEmploye {
  añosAntiguedad: number,
  empleadoId: number,
  nombre: string,
  politicas: number,
  saldos: number,
  tipo: number,
  usuarioLogin: number,
}

@Component({
  selector: 'app-actions-card',
  templateUrl: './actions-card.component.html',
  styleUrls: ['./actions-card.component.css'],
})
export class ActionsCardComponent {
  @Input() public politicaUsuario: string = '';
  @Input() public politicaVacaciones: number = 0;
  @Input() politicas!: any;

  @ViewChild('calendar') calendar!: any;

  isVacationsModalActive: boolean = false;
  isVacationsModalActiveNoAdmin: boolean = false;
  isReporterModalActive: boolean = false;
  isCancelModalActive: boolean = false;
  isloaderActive: boolean = false;
  public isDisabled: boolean = false;
  public isDisabledReortBtn: boolean = false;
  public minDate: Date = new Date();
  public maxDate: Date = new Date();
  disabledDates: Date[] = [];
  public selectedDatesVacations: string[] = [];
  public isDeleteBtnDisabled: boolean = true;
  public isDeleteBtnLoading: boolean = false;
  public idSolicitud: number = 0;
  public nombreUsuario: string = '';
  public isAdmin$: Observable<boolean> = new Observable<boolean>();
  public isAdmin: boolean = false;
  public employes: any[] = [];
  public selectedEmploye!: ISelectedEmploye;
  public politica!: number;
  public politicaNombre!: string;
  public templatePolitica: string = ''

  dates: Date[] | undefined;
  datesInicial: Date[] | undefined;
  datesFinal: Date[] | undefined;

  public vacations: IVacationRequest[] = [];
  public selectedVacationRequest!: IVacationRequest;

  public estatus = [
    {
      id: 1,
      nombreEstatus: 'Aprobado',
    },
    {
      id: 2,
      nombreEstatus: 'Pendiente',
    },
    {
      id: 3,
      nombreEstatus: 'Rechazado',
    },
    {
      id: 5,
      nombreEstatus: 'Gozada',
    },
  ];

  vacationRquestForm = new FormGroup({
    empleado: new FormControl('', [Validators.required]),
    fechas: new FormControl('', [Validators.required]),
    razon: new FormControl(''),
  });

  vacationNoAdminRquestForm = new FormGroup({
    fechas: new FormControl('', [Validators.required]),
    razon: new FormControl(''),
  });

  reportForm = new FormGroup({
    fechaInicial: new FormControl('', [Validators.required]),
    fechaFinal: new FormControl('', [Validators.required]),
    estatus: new FormControl(1),
    politica: new FormControl(0),
  });

  reportConciliacionForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });

  constructor(
    private reportService: ReportService,
    private employService: EmployService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.adminService.getIsAdmin();

    if( this.isAdmin ) {
      this.employService.getAllEmployes().subscribe(res => {
        this.employes = res;
      });
    }

    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.calculateDisabledDates();
  }

  async getAllVacationRequest() {
    await this.employService
      .getAllVacationRequest()
      .subscribe((res: IVacationRequest[]) => {
        this.vacations = res;
      });
  }

  async getVacationRequestByUser() {
    const user: number = await this.adminService.getUserID();
    console.log(user)

    await this.employService
      .getVacationRequestByUser(user)
      .subscribe((res: IVacationRequest[]) => {
        this.vacations = res;
      });
  }

  getVacations(): void {
    if( !this.isAdmin ) {
      this.getVacationRequestByUser();
    } else if ( this.isAdmin ) {

      this.getAllVacationRequest();
    }

  }

  onRowSelect(e: TableRowSelectEvent): void {
    this.isDeleteBtnDisabled = false;
    const { id, nombre } = e.data;
    this.idSolicitud = id;
    this.nombreUsuario = nombre;
  }

  onRowUnselect() {
    this.selectedDatesVacations = [];
    if (this.selectedDatesVacations.length === 0) {
      this.idSolicitud = 0;
      this.nombreUsuario = '';
      this.isDeleteBtnDisabled = false;
    }
  }

  confirm(e: Event) {
    const userId = this.adminService.getUserID();

    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: '¿Desea cancelar el registro de vacaciones?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.employService
          .cancelVacationRequest(userId, this.idSolicitud, this.nombreUsuario)
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Registro eliminado',
                detail: 'Se ha eliminado el registro de vacaciones con exito.',
              });
              this.getVacations();
            },
            (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error al cancelar',
                detail: err.error,
                life: 5000,
              });
            }
          );
      },
    });
  }

  reload(): void {
    // location.reload();
  }

  calculateDisabledDates(): void {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 15);

    for (
      let d = new Date(today);
      d <= thirtyDaysFromNow;
      d.setDate(d.getDate() + 1)
    ) {
      this.disabledDates.push(new Date(d));
    }
  }

  printSelectedDates(): void {
    const selectedVacations: Date[] = this.calendar.value;
    if (selectedVacations == null) this.selectedDatesVacations = [];

    const dates = selectedVacations.map((dateVacation) =>
      dateVacation.toISOString()
    );

    this.selectedDatesVacations = dates;
  }

  onChangeSelectEmploye(e: any) {
    const { empleadoId } = this.selectedEmploye;

    this.employService.getUserInformation(empleadoId).subscribe(res => {
      this.politica = res.saldos[0].politicaVacaciones;
      this.politicaNombre = res.saldos[0].nombrePolitica;
      this.templatePolitica = `Licencia: ${ this.politicaNombre }`
    })
  }

  cleanSelectedEmploye() {
    this.templatePolitica = 'Seleccione un usuario';
  }


  async vacationRequest() {
    this.isDisabled = !this.isDisabled;
    this.isloaderActive = !this.isloaderActive;
    const fechas = this.vacationRquestForm.controls['fechas'].value;
    const razon = this.vacationRquestForm.controls['razon'].value;

    const { empleadoId } = this.selectedEmploye;
    const userId: number = this.adminService.getUserID();
    console.log(userId)
    let body = {};

    body = {
      user_id: empleadoId,
      policy_id: this.politica,
      days: fechas!.length,
      rangoFechas: fechas,
      reason: razon,
      created_by: userId,
      created_on: new Date(),
      updated_by: userId,
      updated_on: new Date(),
    };

    await this.employService.createVacationRequest(empleadoId, body).subscribe((res) => {
      this.isloaderActive = !this.isloaderActive;
      this.isVacationsModalActive = false;
      this.isDisabled = !this.isDisabled;
      this.messageService.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'Solicitud enviada correctamente.'
      });
      this.selectedDatesVacations = [];
      this.vacationRquestForm.reset({
        empleado: '',
        fechas: '',
        razon: '',
      });
      // location.reload();
    }, (err) => {
      console.log(err)
      this.isDisabled = !this.isDisabled;
      this.isloaderActive = !this.isloaderActive;
      this.selectedDatesVacations = [];
      this.vacationRquestForm.reset({
        empleado: '',
        fechas: '',
        razon: '',
      });
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un error al generar la solicitud.'
      });
    });
  }

  async vacationRequestNoAdmin() {
    this.isDisabled = !this.isDisabled;
    this.isloaderActive = !this.isloaderActive;
    const fechas = this.vacationNoAdminRquestForm.controls['fechas'].value;
    const razon = this.vacationNoAdminRquestForm.controls['razon'].value;

    const userId: number = await this.adminService.getUserID();
    console.log(userId)
    let body = {};

    body = {
      user_id: userId,
      policy_id: this.politicaVacaciones,
      days: fechas!.length,
      rangoFechas: fechas,
      reason: razon,
      created_by: userId,
      created_on: new Date(),
      updated_by: userId,
      updated_on: new Date(),
    };

    await this.employService.createVacationRequest(userId, body).subscribe((res) => {
      this.isloaderActive = !this.isloaderActive;
      this.isVacationsModalActiveNoAdmin = false;
      this.isDisabled = !this.isDisabled;
      this.messageService.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'Solicitud enviada correctamente.'
      });
      this.selectedDatesVacations = [];
      this.vacationRquestForm.reset({
        empleado: '',
        fechas: '',
        razon: '',
      });
      // location.reload();
    }, (err) => {
      console.log(err)
      this.isDisabled = !this.isDisabled;
      this.isloaderActive = !this.isloaderActive;
      this.selectedDatesVacations = [];
      this.vacationRquestForm.reset({
        empleado: '',
        fechas: '',
        razon: '',
      });
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un error al generar la solicitud.'
      });
    });
  }

  createReport(): void {
    this.isloaderActive = !this.isloaderActive;
    this.isDisabledReortBtn = !this.isDisabledReortBtn;

    const userId = this.adminService.getUserID();
    const fechaInicio = this.reportForm.controls['fechaInicial'].value;
    const fechaFin = this.reportForm.controls['fechaFinal'].value;
    const estatus = this.reportForm.controls['estatus'].value;
    const politicaId = this.reportForm.controls['politica'].value;

    const body = {
      empleadoId: userId,
      fechaInicio,
      fechaFin,
      estatus,
      politicaId,
    };
    this.reportService.createReport(500, body).subscribe((res: IReport) => {
      this.reportForm.reset({
        fechaInicial: '',
        fechaFinal: '',
        estatus: 1,
        politica: 0,
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
    });
  }

  onUpload(event: any) {
    const file = event.files[0];
    const formData = new FormData();
    formData.append('archivo', file);

    this.reportService
      .createReportConciliacion(500, formData)
      .subscribe((res) => {
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
        window.URL.revokeObjectURL(fileUrl);
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Reporte de conciliación generado.',
        });
      },err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al generar el reporte de conciliación.'
        });
      });
  }

  showVacationDialog() {
    this.isVacationsModalActive = true;
  }

  showVacationDialogNoAdmin() {
    this.isVacationsModalActiveNoAdmin = true;
  }

  showReporterDialog() {
    this.isReporterModalActive = true;
  }

  showCancelDailog() {
    this.isCancelModalActive = true;
  }
}
