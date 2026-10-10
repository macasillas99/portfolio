import { Routes } from '@angular/router';
import { HomeComponent } from './pages';
export const routes: Routes = [
{path:'',component:HomeComponent,title:'Maxine Casillas | Front-end portfolio'},
{path:'resume',loadComponent:()=>import('./pages').then(m=>m.ResumeComponent),title:'Résumé | Maxine Casillas'},
{path:'about',loadComponent:()=>import('./pages').then(m=>m.AboutComponent),title:'About | Maxine Casillas'},
{path:'projects',loadComponent:()=>import('./pages').then(m=>m.ProjectsComponent),title:'Projects | Maxine Casillas'},
{path:'**',loadComponent:()=>import('./pages').then(m=>m.NotFoundComponent),title:'Lost signal | Maxine Casillas'}
];