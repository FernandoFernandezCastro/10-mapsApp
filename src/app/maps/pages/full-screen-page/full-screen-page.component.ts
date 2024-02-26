import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

//config.apiKey = 'o3ljClNhWAqgr2NPCHaz'; //SE LO COMENTO Y SE LLEVO A maps_module porque es una configuracion global

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements OnInit, AfterViewInit, OnDestroy{
  map: Map | undefined;

  @ViewChild('map')
   divMap?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    //config.apiKey = 'o3ljClNhWAqgr2NPCHaz';
  }

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemnto HTML no fue encontrado';

    const initialState = { lng: -74.5, lat: 40, zoom: 9 };

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
