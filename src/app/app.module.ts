import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './user-crud/create-user/create-user.component';
import { ListUserComponent } from './user-crud/list-user/list-user.component';
import { ListTicketComponent } from './ticket-crud/list-ticket/list-ticket.component';
import { CreateTicketComponent } from './ticket-crud/create-ticket/create-ticket.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './user-crud/update-user/update-user.component';
import { UpdateTicketComponent } from './ticket-crud/update-ticket/update-ticket.component';
import { ReporteComponent } from './reporte/reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    ListUserComponent,
    ListTicketComponent,
    CreateTicketComponent,
    ListTicketComponent,
    ListUserComponent,
    CreateUserComponent,
    CreateTicketComponent,
    UpdateUserComponent,
    UpdateTicketComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
