import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresas } from '../../models/empresas';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  titulo: 'Empresas';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC: string = 'L';
  Items: Empresas[] = [];
  submitted = false;

  constructor(private empresasService: EmpresasService) {}

  FormBusqueda = new FormGroup({});

  FormRegistro = new FormGroup({
    IdEmpresa: new FormControl(0),
    RazonSocial: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(55),
    ]),
    CantidadEmpleados: new FormControl(300, [Validators.required]),
    FechaFundacion: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
      ),
    ]),
  });

  ngOnInit() {}
  
  Buscar() {
    this.AccionABMC = 'L';
    this.empresasService.get().subscribe((res: Empresas[]) => {
      this.Items = res;
    });
  }
}
