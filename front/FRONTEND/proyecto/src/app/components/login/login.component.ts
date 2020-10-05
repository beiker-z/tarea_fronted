import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulariologin: FormGroup;

  constructor(private fombuilder: FormBuilder, private loginService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.formulariologin = this.fombuilder.group({

      username: [''],
      password: ['']

    });

  }


  login(): void {

    const user: User = new User();
    user.userName = this.formulariologin.get('username').value;
    user.password = this.formulariologin.get('password').value;

    this.loginService.login(user).subscribe(
      data => {

        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/menu-principal');
      }
    );

  }


}
