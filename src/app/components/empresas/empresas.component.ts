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
  titulo = 'Empresas';
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
      Validators.maxLength(50),
    ]),
    CantidadEmpleados: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,3}'),
    ]),
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
  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ IdEmpresa: 0 });
  }
  Grabar() {
    this.submitted = true;
    if (this.FormRegistro.invalid) {
      return;
    }
    const itemCopy = { ...this.FormRegistro.value };
    var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.FechaFundacion = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();
    this.empresasService.post(itemCopy).subscribe((res: Empresas) => {
      this.Buscar();
    });
  }

  Volver() {
    this.AccionABMC = 'L';
  }
}
