import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { config } from '@maptiler/sdk';
config.apiKey = environment.mapbox_key ; //se pone aqui la key de mapLibre porq aca es generral para todos los compoentes

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { environment } from '../../environments/environments';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent, //como este componente es standalone entonces se lo considera como un modulo, esto es para que el componente properties-page.component.html funcione ya que llama directo al componente counter
    SideMenuComponent, //es un standalone
  ]
})
export class MapsModule { }
