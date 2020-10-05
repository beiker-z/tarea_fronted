import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  constructor(private breakpoint: BreakpointObserver, private router: Router) { }

  isHandset$: Observable<boolean> = this.breakpoint.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['login']);
  }

}
