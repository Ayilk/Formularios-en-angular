import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validators/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {
  
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  },{
    validators: [this.validatorService.camposIguales('password', 'password2')]
  });

  //emailErrorMsg: string='';

  
  get emailErrorMsg():string{
    //console.log('tick');
    //return 'Hola Mundo'

    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'Email es obligatorio'
    }else if(errors?.['pattern']){///Hay un error con el pattern
      return 'El valor ingresado no tiene formato de correo'
    }else if(errors?.['emailTomado']){
      return 'El email ya fue tomado'
    }

    return '';
  }

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorsService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: "Sandra Rangel",
      email: 'test1@test.com',
      username: 'sandy_rangel',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido( campo:string ){
    return this.miFormulario.get(campo)?.errors?.['required'] &&
           this.miFormulario.get(campo)?.touched
  }

 

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched;
  }

}
