import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/services/ticket.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent {

  updateticketform!: FormGroup;
  id!: string | null;
  kinds: any;
  users: any;
  projects: any;
  categories: any;
  priorities: any;
  status: any;

  constructor(public ticketService: TicketService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.updateticketform = this.fb.group({
      id:[''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      updated_at: ['', Validators.required],
      created_at: ['', Validators.required],
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
    })
    this.getTicket();
  }
  getTicket(): void {
    let users;
    this.ticketService.readAll()
      .subscribe(
        response => {
          console.log(response);
          const ticket = response.find((usu: any) => usu.id == this.id);
          this.updateticketform = this.fb.group({
            id:[ticket.id],
            title: [ticket.title, Validators.required],
            description: [ticket.description, Validators.required],
            updated_at: [ticket.updated_at, Validators.required],
            created_at: [ticket.created_at, Validators.required],
            kinds: [ticket.kinds.id, Validators.required],
            users: [ticket.users.id, Validators.required],
            projects: [ticket.projects.id, Validators.required],
            categories: [ticket.categories.id, Validators.required],
            priorities: [ticket.priorities.id, Validators.required],
            status: [ticket.status.id, Validators.required]
          })
        },
        error => {
          console.log(error);
        }
      );

  }


  updateTicket(): void {
    if (this.updateticketform.invalid) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Complete all required fields of the form.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const data = {
      id: this.updateticketform.value.id,
      title: this.updateticketform.value.title,
      description: this.updateticketform.value.description,
      updated_at: this.updateticketform.value.updated_at,
      created_at: this.updateticketform.value.created_at,
      kinds: { id: this.updateticketform.value.kinds },
      users: { id: this.updateticketform.value.users },
      projects: { id: this.updateticketform.value.projects },
      categories: { id: this.updateticketform.value.categories },
      priorities: { id: this.updateticketform.value.priorities },
      status: { id: this.updateticketform.value.status }
    };
    console.log(data)
    this.ticketService.updateTicket(data).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/listticket']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
