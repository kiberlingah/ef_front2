import { Component } from '@angular/core';
import { ReporteService } from './services/reporte.service';
import { Reporte } from './model/reporte';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/services/ticket.service';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent {
  categoryName: string = '';
  repoform!: FormGroup;
  reportuserbycategory: Reporte[] = [];
  categories: any;

  constructor(private reporteService: ReporteService, private ticketService: TicketService , public fb: FormBuilder, ) { }

  ngOnInit(): void {
    this.repoform = this.fb.group({
      categoryName: ['', Validators.required],
    });
    this.ticketService.readAllcategories().subscribe(resp => {
      this.categories = resp;
    });

  }

  ReportUserCategory() {
    const categoryName = this.repoform.value.categoryName;

  // Realiza la solicitud al servicio para obtener los usuarios por categoría
  this.reporteService.getAllUsersCategory(categoryName).subscribe((data: Reporte[]) => {
    // Asigna los resultados a la variable reportuserbycategory
    this.reportuserbycategory = data;
  });
    // if(this.categoryName == ''){
    //   //this.toast.error('Debe Ingresar Datos','Advertencia!!' );
    //   return;

    // };
    // this.reporteService.getAllUsersCategory(this.categoryName).subscribe(data => {
    //   this.reportuserbycategory = data;
    //   console.log(this.categoryName)
    //   if(this.reportuserbycategory.length > 0){
    //     //this.toast.success('Busqueda Exitosa','OK!!' )
    //   }else{
    //     //this.toast.warning('No se Encontro Datos','Advertencia!!' )
    //   }

    // },
    // err =>{
    //   //this.toast.error('Error al cargar datos','Advertencia!!' )
    // }

    // );
  }

}
