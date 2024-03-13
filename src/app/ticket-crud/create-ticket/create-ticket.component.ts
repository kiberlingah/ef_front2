import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { TicketService } from 'src/services/ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  createticketform!: FormGroup;
  today = moment().format('YYYY-MM-DD');
  kinds: any;
  users: any;
  projects: any;
  categories: any;
  priorities: any;
  status: any;
  constructor(public ticketService: TicketService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.createticketform = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      updated_at: [this.today, Validators.required],
      created_at: [this.today, Validators.required],
      kinds: ['', Validators.required],
      users: ['', Validators.required],
      projects: ['', Validators.required],
      categories: ['', Validators.required],
      priorities: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.ticketService.readAllkind().subscribe(resp => {
      this.kinds = resp;
    });
    this.ticketService.readAllproject().subscribe(resp => {
      this.projects = resp;
    });
    this.ticketService.readAllcategories().subscribe(resp => {
      this.categories = resp;
    });
    this.ticketService.readAllpriority().subscribe(resp => {
      this.priorities = resp;
    });
    this.ticketService.readAllstatus().subscribe(resp => {
      this.status = resp;
    });

  }

  createTicket(): void {

    if (this.createticketform.valid == false) {
      console.log(this.createticketform.valid);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Complete all fields required of form.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const data = {
      title: this.createticketform.value.title,
      description: this.createticketform.value.description,
      updated_at: this.createticketform.value.updated_at,
      created_at: this.createticketform.value.created_at,
      kinds: { id: this.createticketform.value.kinds },
      users: { id: this.createticketform.value.users },
      projects: { id: this.createticketform.value.projects },
      categories: { id: this.createticketform.value.categories },
      priorities: { id: this.createticketform.value.priorities },
      status: { id: this.createticketform.value.status }
    };
    console.log(data)
    this.ticketService.createTicket(data)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          this.resetForm();
        },
        error => {
          console.log(error);
        }
      );
  }

  resetForm(): void {
    this.createticketform.reset({

      updated_at: this.today,
      created_at: this.today
    });
  }



}
