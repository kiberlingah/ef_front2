import { User } from './../Model/User';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  listuser: User[] = [];
  currentIndex = -1;
  //nombreServicio ='';

  submitted = false;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.userService.readAllUser()
      .subscribe({
        next: (User) => {
          this.listuser = User;
          console.log(User);
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
    this.listuser = [];
    this.userService.readAllUser()
      .subscribe(
        res => {
          this.listuser = res;
        },
        err => {

        }
      );
  }

  delete(User: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((willDelete) => {
      if (willDelete.value) {
        this.userService.deleteUser(User.id).subscribe({
          next: (response) => {
            console.log(response);
            Swal.fire('ok!', 'Usuario eliminado satisfactoriamente', 'success')
              .then(() => {
                this.getAllData();
              });
          },
          error: () => {
            Swal.fire('Error!', 'No se puedo borrar el usuario', 'error');
          }
        });
      }
    });

  }

}
