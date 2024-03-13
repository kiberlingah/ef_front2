import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})


export class UpdateUserComponent {
  updateuserform!: FormGroup;
  id!: string | null;

  constructor(public userService: UserService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    this.updateuserform = this.fb.group({
      id:[''],
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      is_active: [1, Validators.required],
      kind: [1, Validators.required],
      created_at: ['', Validators.required]
    })
    this.getUser();
  }

  getUser(): void {
    //let users;
    this.userService.readAllUser()
        .subscribe(
          response => {
            console.log(response);
            const user = response.find((usu:any) => usu.id == this.id);
            this.updateuserform = this.fb.group({
              id:[user.id],
              username: [user.username, Validators.required],
              name: [user.name, Validators.required],
              lastname: [user.lastname, Validators.required],
              email: [user.email, Validators.required],
              password: [user.password, Validators.required],
              is_active: [user.is_active, Validators.required],
              kind: [user.kind, Validators.required],
              created_at: [user.created_at, Validators.required]
            })
          },
          error => {
            console.log(error);
          }
      );

  }

  updateUser(): void {
    if (this.updateuserform.invalid) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Complete all required fields of the form.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const data = this.updateuserform.value;
    this.userService.updateUser(data).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/listuser']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
