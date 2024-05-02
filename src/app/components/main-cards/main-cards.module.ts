import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ActionsCardComponent } from './actions-card/actions-card.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ContentMainCardsComponent } from './content-main-cards/content-main-cards.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';




@NgModule({
  declarations: [
    ProfileCardComponent,
    ActionsCardComponent,
    ContentMainCardsComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports: [
    ProfileCardComponent,
    ActionsCardComponent,
    ContentMainCardsComponent,
  ]
})
export class MainCardsModule { }
