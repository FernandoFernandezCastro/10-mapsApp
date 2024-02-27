import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

//este es un componente q es su propio modulo a la vez

@Component({
  standalone: true,
  imports: [CommonModule, CounterAloneComponent, SideMenuComponent], //aca importamos lo modulos que usara el componente como CounterAloneComponent es standalone practicamente es un modulo por eso se importa aca
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {

}
