import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ActionsCardComponent } from './actions-card/actions-card.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ContentMainCardsComponent } from './content-main-cards/content-main-cards.component';



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
  ],
  exports: [
    ProfileCardComponent,
    ActionsCardComponent,
    ContentMainCardsComponent
  ]
})
export class MainCardsModule { }
