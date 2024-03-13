import { TicketService } from './../../../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../Model/Ticket';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.scss']
})
export class ListTicketComponent implements OnInit {
  listticket: Ticket[] = [];
  currentIndex = -1;

  submitted = false;
  constructor(private ticketService: TicketService) { }
  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.ticketService.readAll()
      .subscribe({
        next: (Ticket) => {
          this.listticket = Ticket;
          console.log(Ticket);
        },
        error: (error) => {
          console.log(error);
        }

      });
  }
  refresh(): void {

    this.list();
    this.currentIndex = -1;
  }


  getAllData(): void {
    this.listticket = [];
    this.ticketService.readAll()
      .subscribe(
        res => {
          this.listticket = res;
        },
        err => {

        }
      );
  }

  delete(Ticket: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((willDelete) => {
      console.log(willDelete);
      if (willDelete.value) {
        this.ticketService.deleteTicket(Ticket.id).subscribe({
          next: (response) => {
            console.log(response);
            Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success')
              .then(() => {
                this.getAllData();
              });
          },
          error: () => {
            Swal.fire('Error!', 'No se puedo borrar el proveedor', 'error');
          }
        });
      }
    });
  };


}
