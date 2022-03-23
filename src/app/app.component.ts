import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SenhaService } from './services/senha.service';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  personalData: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(3)]),
    adress: new FormControl('', [Validators.required, Validators.minLength(3)]),
    adress2: new FormControl('', [Validators.required, Validators.minLength(3)]),
    tels: new FormArray([
      new FormControl('', [Validators.required]),
      new FormControl('', [Validators.required])
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password2: new FormControl('', [Validators.required]),

  })

  error: boolean = false;
  auxiliarDisable: boolean = true;

  tels:FormArray = this.personalData.get('tels') as FormArray

    constructor (
      public dialog: MatDialog,
      private passWordValidate: SenhaService
  ){}
  submit(): void {
    console.log(`Name = ${this.personalData.controls['name'].value}`)
    console.log(`lastName = ${this.personalData.controls['lastName'].value}`)
    console.log(`Senha = ${this.personalData.controls['password'].value}`)
    console.log(`Senha2 = ${this.personalData.controls['password2'].value}`)
    console.log(this.auxiliarDisable)

  }

    openDialog() {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, 
        {
          data:{ 
          name: this.personalData.controls['name'].value,
          lastName: this.personalData.controls['lastName'].value,
          userName: this.personalData.controls['userName'].value,
          cpf: this.personalData.controls['cpf'].value,
          phone: this.personalData.controls['tels'].value,
          adress: this.personalData.controls['adress'].value,
          adress2: this.personalData.controls['adress2'].value,         
      }})
  
      dialogRef.afterClosed().subscribe(result =>{
        console.log(`Dialog Result: ${result}`);
      })
      }
  
    newContact(): void{
      this.tels.push(new FormControl('', [Validators.required]))
    }
  
    deleteContact(): void{
      this.tels.controls = this.tels.controls.filter((x, index) => {
        return index != this.tels.controls.length -1
      })
    }

    passWordValidation(): void{
      this.error = this.passWordValidate.passwordConfirm(this.personalData.controls['password'].value,  this.personalData.controls['password2'].value)
      this.error ? this.auxiliarDisable = false : this.auxiliarDisable = true;
     }
    }
