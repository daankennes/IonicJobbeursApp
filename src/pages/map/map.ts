import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import leaflet from 'leaflet';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapContainer: ElementRef;

  map: any;
  mapInitialised: boolean;
  imageMap: any;

  constructor(public navCtrl: NavController, private file: File) {
    this.mapInitialised = false;
  }

  /*getMapFromStorage() {
    if (this.file.applicationDirectory) this.imageMap = this.file.applicationDirectory + "www/assets/imgs/map.svg";
    else this.imageMap = "http://cdn.calatlantichomes.com/files/webplanlevelsvg/604963d0-0a60-e211-9582-02bfcd947d8b/stockbridge-1-plan.svg.gzip?v=63493957845";
    console.log(this.imageMap);
    this.file.checkFile(this.file.applicationDirectory + "www/assets/imgs/", "map.svg").then(_ => console.log('File exists')).catch(err => console.log('File doesnt exist'));
    this.loadMap();
  }*/

  ionViewDidEnter() {
    if (!this.mapInitialised) this.loadMap();
  }

  loadMap() {
    /*this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);*/
    this.map = leaflet.map('map', {
      minZoom: 1,
      maxZoom: 4,
      center: [0, 0],
      zoom: 1,
      crs: leaflet.CRS.Simple,
      attributionControl: false
    });
    // dimensions of the image
    var w = 2000,
        h = 1500,
        //url = this.imageMap;
        url = "./assets/imgs/map.svg";
    // calculate the edges of the image, in coordinate space
    var southWest = this.map.unproject([0, h], this.map.getMaxZoom()-1);
    var northEast = this.map.unproject([w, 0], this.map.getMaxZoom()-1);
    var bounds = new leaflet.LatLngBounds(southWest, northEast);
    // add the image overlay,
    // so that it covers the entire map
    leaflet.imageOverlay(url, bounds).addTo(this.map);
    // tell leaflet that the map is exactly as big as the image
    this.map.setMaxBounds(bounds);
    /*this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })*/
    this.mapInitialised = true;
  }

}
