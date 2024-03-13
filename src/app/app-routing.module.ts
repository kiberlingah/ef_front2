import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './user-crud/create-user/create-user.component';
import { ListUserComponent } from './user-crud/list-user/list-user.component';
import { CreateTicketComponent } from './ticket-crud/create-ticket/create-ticket.component';
import { ListTicketComponent } from './ticket-crud/list-ticket/list-ticket.component';
import { UpdateUserComponent } from './user-crud/update-user/update-user.component';
import { UpdateTicketComponent } from './ticket-crud/update-ticket/update-ticket.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [

  {path:'createuser', component: CreateUserComponent},
  {path:'listuser', component: ListUserComponent},
  {path:'updateuser/:id', component: UpdateUserComponent},
  {path:'createticket', component: CreateTicketComponent},
  {path:'listticket', component: ListTicketComponent},
  {path:'updateticket/:id', component: UpdateTicketComponent},
  {path:'report', component: ReporteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
