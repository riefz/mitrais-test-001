import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

@Injectable()
export class RegisterComponent implements OnInit {
  registerForm;

  canLogin: boolean = false;
  onSubmitState: boolean = false;
  onTimeOut: any = null;

  errType: string = '';
  errMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { 
    this.canLogin = false;
    this.onSubmitState = false;
    this.registerForm = this.formBuilder.group({
      mobile: '',
      firstname: '',
      lastname: '',
      birthdate: '',
      gender: '',
      email: '',
    });

    this.errType = '';
    this.errMessage = '';
  }

  ngOnInit(): void {
    
  }

  setOnSubmitState(statez){
    var _self = this;

    _self.onSubmitState = statez;

    if(statez == true){
      document.getElementById('disabledLayer').style.visibility='visible';
    }
    else{
      document.getElementById('disabledLayer').style.visibility='hidden';
    }

    _self.onTimeOut = window.setTimeout(function () {
      _self.onSubmitState = false;
      window.clearTimeout(_self.onTimeOut);
      _self.onTimeOut = null;

      document.getElementById('disabledLayer').style.visibility='hidden';
    }, 10000);

  }

  formInit(){
    this.registerForm = this.formBuilder.group({
      mobile: '',
      firstname: '',
      lastname: '',
      birthdate: '',
      gender: '',
      email: '',
    });
  }

  handleErrorSubmit(errorMessage){
    console.log(errorMessage);

    this.errType = '';

    if(errorMessage['error']){
      if(errorMessage['error']['message']){
        if(errorMessage['error']['message'].length>0){
          if(Array.isArray(errorMessage['error']['message'])){
            console.log(errorMessage['error']['message'][0]);

            const element = errorMessage['error']['message'][0];
            const myErr = Object.keys(errorMessage['error']['message'][0]);
            console.log(myErr[0]);
            console.log(element[Object.keys(element)[0]]);
            
            this.errType = myErr[0];
            this.errMessage = element[Object.keys(element)[0]];
  
            if(this.errType == 'isNotEmpty'){
              if(this.registerForm.value['firstname'] == ''){
                this.errType = 'isFirstName';
              }
              else if(this.registerForm.value['lastname'] == ''){
                this.errType = 'isLastName';
              }
            }
          }
          else{
            this.errType = 'IsErrorForm';
            this.errMessage = errorMessage['error']['message'];
          }
          
        }
      }
    }

  }

  onSubmit(formData){
    var _self = this;
    console.log(formData);
    _self.setOnSubmitState(true);

    // _self.http.post<any>('http://localhost:3000/users', formData).subscribe(data => {
    //   console.log(data);
    // })
    // const headers = { 'Content-Type': 'application/json'};
    const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    _self.http.post('http://localhost:3000/users', formData, _options).subscribe({
      next: data => {
        console.log(data);
        _self.onSubmitState = false;
        _self.canLogin = true;
        window.clearTimeout(_self.onTimeOut);
        _self.onTimeOut = null;
        _self.registerForm.reset();
        document.getElementById('disabledLayer').style.visibility='visible';
        // _self.setOnSubmitState(false);
      },
      error: error => {
        // console.error('There was an error!', error)
        _self.setOnSubmitState(false);
        _self.handleErrorSubmit(error);
      }
    })

  }

}
