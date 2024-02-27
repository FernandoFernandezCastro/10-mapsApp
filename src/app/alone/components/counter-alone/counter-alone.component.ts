import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [],
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.css'
})
export class CounterAloneComponent {

  @Input() //si no pongo un nombre del input dentro de los () toma el miosmo nombre de la variable el input
  public counter: number = 10;
}
