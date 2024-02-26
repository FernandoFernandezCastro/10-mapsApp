import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, MapStyle, Marker } from '@maptiler/sdk';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
  map: Map | undefined;

  @Input() lngLat?: [number,number];
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(){
    if (!this.divMap?.nativeElement) throw "Map Div not found";
    if( !this.lngLat ) throw "LngLat can't be null";



    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }
}
