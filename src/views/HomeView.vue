<template>
  <div class="home">
    <div class="rec">
      <div class="pop">
        <img class="imp" src="../assets/images/1.jpg" alt="Путишествия">
        <div class="pop"><h4>Путишествия</h4></div>
      </div>
      <div class="pop">
        <img class="imp" src="../assets/images/2.jpg" alt="Путишествия">
        <div class="pop"><h4>Интересное</h4></div>
      </div>
      <div class="pop">
        <img class="imp" src="../assets/images/3.jpg" alt="Путишествия">
        <div class="pop"><h4>Рекомендуем</h4></div>
      </div>
    </div>
    <a name="map"></a>
    <div class="map">
      <GMapMap
          v-bind:center="coords"
          v-bind:zoom="zoom"
          map-type-id="terrain"
          v-bind:style="style"
          v-bind:options="options"
          ref="myMapRef"
      >
        <GMapCluster :zoomOnClick="true" :minimumClusterSize="2" v-if="!isPolygon">
          <GMapMarker :key="index" v-for="(marker, index) in markers" @click="this.setPoint(index)" :position="position[index]"
                      :clickable="true" :draggable="false" :icon="this.setIcon(marker)" :title="marker['name']">
            <GMapInfoWindow
                :closeclick="true" @closeclick="this.setPoint(null)" :opened="this.isOpen(index)"
            >
              <div class="openInfo" @click="$router.push(`/region/${marker['Slog']}`)">
                <img class="infoImage" :src="marker['image']" alt="coat of arms">
                <b>{{ marker['name'] }}</b>
              </div>
            </GMapInfoWindow>
          </GMapMarker>
        </GMapCluster>
        <div v-if="isPolygon">
          <div :key="index" v-for="(polygon, index) in polygons">
            <GMapPolygon @click="this.setPoint(index)" :paths="this.polygonsIn[index]" v-if="polygonsIn[index].length > 1"
                         :options="this.optinonT(polygon)">
            </GMapPolygon>
            <GMapCluster :zoomOnClick="true" :minimumClusterSize="2">
              <GMapMarker @click="this.setPoint(index)" :position="this.polygonsIn[index][0]" v-if="polygonsIn[index].length < 2"
                          :clickable="true" :draggable="false" :title="polygon['name']" :icon="this.setIcon(polygon)">
              </GMapMarker>
            </GMapCluster>
            <GMapInfoWindow :position="polygonsIn[index][0]" :closeclick="true" @closeclick="this.setPoint(null)"
                            :opened="this.isOpen(index)" :options="polygonsIn[index].length < 2? optionsInfo : ''">
              <div class="openInfo" @click="$router.push(`/reserve/${polygon['Slog']}`)">
                <img class="infoImage" :src="polygon['image']" alt="coat of arms">
                <b>{{ polygon['name'] }}</b>
              </div>
            </GMapInfoWindow>
          </div>
        </div>
      </GMapMap>
    </div>
    <div class="regions">
      <ul class="lists">
        <li class="list" v-for="(region, index) in isPolygon? reserved : regions" :key="index" >
          <div class="region">
            <a href="#map" @click="this.goto(index)"><i class="sort"></i></a>
            <div class="imag">
              <div class="jojo" @click="isPolygon? $router.push(`/reserve/${region['Slog']}`) : $router.push(`/region/${region['Slog']}`)">
                <img :src="region['image']" :alt="index"/>
                <p class="p"><b>{{ region['name'] }}</b></p>
              </div>
            </div>
            <div class="info" v-html="this.filt(region['info'])"></div>
          </div>
          <hr v-if="index !== regions.length-1">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
export default {
  name: 'HomeView',
  mounted() {
    this.sizeS()
    this.getMarker()
    this.getPolygon()
    this.$refs.myMapRef.$mapPromise.then((map) => {
      const centerControlDiv = document.createElement('div');
      this.addCenterControl(centerControlDiv, map);
      map.controls[8].push(centerControlDiv);
    });
  },
  filters: {
    marked,
  },
  methods: {
    filt(text) {
      return marked(text)
    },
    addCenterControl(controlDiv, map) {
      const controlUI = document.createElement('div');
      controlUI.innerHTML = `<div title="Центр" class="yot" style="background: #ffffff; border-radius: 3px; margin: 10px 10px 0 0; width: 50px; height: 50px;">
                                <i class="fa fa-home fa-fw" style="color: #7a7a7a; font-size: 30px; margin: 10px 5px 5px 5px;"></i>
                             </div>`;
      let base = document.createElement('div');
      base.innerHTML = `<div title="Изменить" class="yot" style="background: #ffffff; border-radius: 3px; margin: 0 10px 0 0; width: 50px; height: 50px;">
                                <i class="fa-repeat" style="position: absolute; font-family: FontAwesome; font-style: normal; color: #7a7a7a; font-size: 30px; margin: 10px;"></i>
                             </div>`;
      controlDiv.appendChild(base);
      controlDiv.appendChild(controlUI);
      controlDiv.addEventListener('mouseenter', () => {
        controlDiv.style.cursor = "pointer"
      });
      base.addEventListener('click', () => {
        this.isPolygon = !this.isPolygon
      });
      controlUI.addEventListener('click', () => {
        map.setCenter({
          lat: 65,
          lng: 100,
        });
        map.setZoom(this.base.zoom);
      });
  },
    sizeS() {
      if(document.documentElement.clientWidth < 1200) {
        if (document.documentElement.clientWidth < 1050) {
          if (document.documentElement.clientWidth < 900) {
            this.style.width = 600 + 'px'; this.style.height = 350 + 'px'; this.zoom = 2.7; this.base.zoom = 2.7;
          } else {
            this.style.width = 800 + 'px'; this.style.height = 450 + 'px'; this.zoom = 2.9; this.base.zoom = 2.9;
          }
        } else {
          this.style.width = 900 + 'px'; this.style.height = 550 + 'px'; this.zoom = 3.1; this.base.zoom = 3.1;
        }
      }
    },
    goto(index) {
      if (this.isPolygon) {this.coords = this.polygonsIn[index][0]} else {this.coords = this.position[index]}
      this.zoom = 4.4
      this.point = index
    },
    setPoint(index) {
      if(this.point === index) {this.point = null} else {this.point = index}
    },
    isOpen(index) {
      return this.point === index
    },
    setPos() {
      for(let marker = 0; marker < this.markers.length; marker++) {
        this.position[marker] =  {
          lat: this.markers[marker]['lat'], lng: this.markers[marker]['lng']
        }
      }
    },
    async getMarker() {
      try {
        this.markers = await fetch(this.$store.getters['site/getSettings']['ip']+'/map/markers', {
          method: 'GET',
        });
        if (this.markers.ok === true) {
          this.markers = (await this.markers.json())['markers'];
          this.regions = this.markers
        }
      } catch (error) {
        console.log(error)
      }
      this.setPos()
    },
    async getPolygon() {
      this.$store.getters
      try {
        this.polygons = await fetch(this.$store.getters['site/getSettings']['ip']+'/map/polygons', {
          method: 'GET',
        });
        if (this.polygons.ok === true) {
          this.polygons = (await this.polygons.json())['polygons'];
          this.reserved = this.polygons
        }
      } catch (error) {
        console.log(error)
      }
      this.setPol()
    },
    setPol() {
      for(this.y = 0; this.y < this.polygons.length; this.y++) {
        for (this.x = 0; this.x < this.polygons[this.y]['paths'].length; this.x++) {
          this.paths.push({
            lat: this.polygons[this.y]['paths'][this.x][0],
            lng: this.polygons[this.y]['paths'][this.x][1]
          })
        }
        this.polygonsIn.push(this.paths)
        this.paths = []
      }
    },
    setIcon(m) {
      if (m['icon'] !== '') {
      return {
        url: m['icon'],
        scaledSize: {width: 45, height: 45},
        labelOrigin: {x: 16, y: -10}
      }} else {
        return ''
      }
    },
    optinonT(polygon) {
      return {
        strokeColor: polygon['strokeColor'],
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: polygon['fillColor'],
        fillOpacity: 0.35,
      }
    },
  },
  data() {
    return {
      iop: true,
      point: null,
      openInfo: false,
      isPolygon: false,
      zoom: 3.3,
      coords: {lat: 65, lng: 100},
      base: {
        zoom: 3.3,
      },
      paths: [],
      polygonsIn: [],
      position: [],
      x: 0, y: 0,
      style: {
        width: 1000 + 'px',
        height: 600 + 'px',
      },
      optionsInfo: {
        pixelOffset: {
          width: 0, height: -45
        },
        maxWidth: 320,
        maxHeight: 320,
      },
      options: {
        mapId: "dba1793621449d63",
      },
      markers: null,
      polygons: null,
      regions: null,
      reserved: null,
    }
  }
}
</script>

<style scoped>
.pop {
  background: #e8dfdf;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
}
h4 {
  margin: 0 0 10px 0;
}
.imp {
  width: auto;
  height: 150px;
  padding: 10px;
}
.rec {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  margin: 10px 0 0 0;
  width: 99%;
  background: #f8f8f8;
}
.p {
  width: auto;
  height: auto;
  min-width: 8pc;
  min-height: 2pc;
}
.home {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  Padding-top: 74px;
  z-index: 0;
}
.map {
   align-self: center;
   border: 4mm ridge rgba(14, 105, 29, 0.6);
   margin: 15px 0 0 0;
 }
.openInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.openInfo:hover {
  cursor: pointer;
}
.infoImage {
  width: auto;
  height: 6pc;
}
.regions {
  display: flex;
  flex-direction: column;
  margin: 38px 0 0 0;
  background: #eeeeee;
  border-top: thick double #7c3232;
}
.sort:before {
  content:"\f041";
  font-family: FontAwesome;
  font-size: 30px;
  vertical-align:bottom;
  color: #dd3333;
  font-style: normal;
  margin: 0 10px 10px 10px;
}
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
.region {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin: 15px 15px 15px 15px;
}
.imag {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin: 15px 15px 15px 15px;
  width: 100px;
  height: 100px;
}
a {
  margin: 5px;
}
.jojo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.jojo:hover {
  cursor: pointer;
}
img {
  width: 50px;
  height: 50px;
  margin: 0 0 0 0;
}
.info {
  align-items: center;
  margin: 15px;
}
</style>
