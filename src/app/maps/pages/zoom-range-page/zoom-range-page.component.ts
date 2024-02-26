import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map, MapStyle, config } from '@maptiler/sdk';
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements OnInit, AfterViewInit, OnDestroy{

  public zoom: number = 14;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.08996629165586, 4.650687386351279);

  @ViewChild('map')
   divMap?: ElementRef<HTMLElement>;

   @ViewChild('barra')
   barra?: ElementRef<HTMLInputElement>;



  ngOnInit(): void {
    //config.apiKey = 'o3ljClNhWAqgr2NPCHaz';
  }

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemnto HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove(); //se remueve todos los listeners y el mapa
  }

  mapListeners(){
    if(!this.map) throw 'Mapa no inicializado';

    //los listener q se crean a continuacion se deben destruir cuando se salga de esta ruta o dela pagina de zoom
    //porq sino al salir del componente se quedaran los listener y al entrar de nuevo se crearan otros mas eso puede afectar en la performance
    //esto lo hacemos en el metodo ngOnDestroy()
    this.map.on('zoom', (ev) => {  //cada vez q se haga un zoom mediante el mouse o los botones + - se actualizara la variable this.zoom que se muestra en la vista
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => { //cuando vamos al limite superior y sobrepasa el zoom de 18 entonces esto hace q se vuelva a 18
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);

    });

    this.map.on('move', () => {
     this.currentLngLat = this.map!.getCenter();
    })
  }



  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  actualizaZoomConBarra(){

    if ( !this.barra ) throw 'El elemnto HTML no fue encontrado';

    this.zoom = parseFloat(this.barra.nativeElement.value); //esto actualiza la variable q se muestra en la vista
    this.map?.zoomTo(this.zoom); //esto actualiza el zoom del mapa
  }

}
