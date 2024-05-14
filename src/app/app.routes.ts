import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { LivroslistComponent } from './components/livros/livroslist/livroslist.component';
import { Component } from '@angular/core';
import { LivrosdetailsComponent } from './components/livros/livrosdetails/livrosdetails.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { AutoreslistComponent } from './components/autores/autoreslist/autoreslist.component';
import { EditoraslistComponent } from './components/editoras/editoraslist/editoraslist.component';
import { AutoresdetailsComponent } from './components/autores/autoresdetails/autoresdetails.component';
import { EditorasdetailsComponent } from './components/editoras/editorasdetails/editorasdetails.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path:"login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children: [
        {path: "livros", component: LivroslistComponent},
        {path: "autores", component: AutoreslistComponent},
        {path: "editoras", component: EditoraslistComponent},
        {path: "livros/new", component: LivrosdetailsComponent},
        {path: "livros/edit/:id", component: LivrosdetailsComponent},
        {path: "autores/new", component: AutoresdetailsComponent},
        {path: "autores/edit/:id", component: AutoresdetailsComponent},
        {path: "editoras/new", component: EditorasdetailsComponent},
        {path: "editoras/edit/:id", component: EditorasdetailsComponent}
    ]}
];
