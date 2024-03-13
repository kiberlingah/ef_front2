import { UserService } from 'src/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal  from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{

  createuserform!: FormGroup;
  today = moment().format('YYYY-MM-DD');

  constructor(public userService: UserService,
    public fb: FormBuilder,
    ){}

    ngOnInit(): void{

      this.createuserform = this.fb.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        is_active: [1, Validators.required],
        kind: ['', Validators.required],
        created_at: [this.today, Validators.required]
      })
    }

    createNewUser(): void {

      if(this.createuserform.valid == false){
        console.log(this.createuserform.valid);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Complete all fields required of form.',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      const data = this.createuserform.value;
      this.userService.createUser(data)
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
      this.createuserform.reset({
        is_active: 1,
        kind: 1,
        created_at: this.today
      });
    }


}
