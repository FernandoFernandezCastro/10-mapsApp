import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, MapStyle, Marker } from '@maptiler/sdk';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  public zoom: number = 12;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.08996629165586, 4.650687386351279);

  @ViewChild('map')
   divMap?: ElementRef<HTMLElement>;

  public markers: MarkerAndColor[] = [];

  ngOnInit(): void {
    //config.apiKey = 'o3ljClNhWAqgr2NPCHaz';
  }

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemnto HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: 14,
    });

   // const markerHtml = document.createElement('div');
    //markerHtml.innerHTML = 'Fernando Fernandez'
    //const marker= new Marker({
    //  //color: 'green'
    //  element:markerHtml
    //})
    //  .setLngLat( this.currentLngLat )
    //  .addTo( this.map )
    this.readFromLocalStorage();
  }

  createMarker(){

    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

      this.markers.push({
        color: color,
        marker: marker
      });
    this.saveToLocalStorage(); //cuando lo creas se guarda en el local storage en el centro porq asi se creo

    //esto actualiza el localstorage con los markers y su posicion final si movemos un marker
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })
  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove(); //primero debemos borrar el marcador del mapa como el atributo marker este tipo Marker esta clase tiene un metodo remove() que elimina el marcador creado del mapa
    this.markers.splice(index , 1); //con esto eliminamos el objeto creado del arreglo de markers y usamos este arreglo para pintar los cuadrados de los marcadores en el mapa y  con esto se desaparece el cuadrado del marcador del mapa
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    //setaamos a otro objeto los datos necesarios ya que la clase Marker es muy compleja
    //para esto usamos el operador mp de Arreglos no confundir con el map de Observable
    //lo que hace map es mapear cada dato se un objeto a otro tipo de dato o estructura.
    const plainMarkers: PlainMarker[] = this.markers.map (({ color, marker }) => {
      return {
        color: color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers )); //guardamos al localstorage del navegador
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({color, lngLat}) => {

      const [lng, lat] = lngLat;
      const coords = new LngLat ( lng, lat );
      this.addMarker( coords, color );
    });

  }


}
