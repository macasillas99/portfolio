import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
@Component({selector:'app-root', standalone:true, imports:[RouterOutlet,RouterLink,RouterLinkActive],templateUrl:'./app.component.html',styleUrl:'./app.component.css'})
export class AppComponent { readonly currentYear = new Date().getFullYear(); skipToMain(event: Event) { event.preventDefault(); document.getElementById("main-content")?.focus(); } }
