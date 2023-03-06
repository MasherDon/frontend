<template>
  <div class="region">
    <div class="tet">
      <div class="leftt">
        <div class="xoxo">
          <div id="yoxo"><img :src="this.region['intro']" alt="image"></div>
          <div class="tt">
            <h3>{{ this.region['name'] }}</h3>
            <a :href="tok===1?'#map':tok===2?'#pic':'#'"><button type="button"
                :style="mobo[tok]" @click="this.tokotok()">{{modo[tok]}}</button></a>
          </div>
        </div>
      </div>
      <div class="text" v-html="filt(this.region['put'])"></div>
      <div class="text" v-html="filt(this.region['info'])"></div>
    </div>
    <a name="map"></a>
    <div class="map" v-if="tok===1">
      <GMapMap
          :center="{lat: this.region['lat'], lng: this.region['lng']}"
          :zoom="3.5"
          map-type-id="terrain"
          :style="{width: 800 + 'px',height: 450 + 'px'}"
          :options="options"
      >
        <div :key="index" v-for="(polygon, index) in region['reserves']">
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
              <h3>{{ polygon['name'] }}</h3>
            </div>
          </GMapInfoWindow>
        </div>
      </GMapMap>
    </div>
    <a name="pic"></a>
    <div class="map" v-if="tok===2">
      <img class="imgmap" :src="this.region['map']" alt="map">
    </div>
    <div class="hr" v-if="region['reserves'].length>0"><hr class="hrd"></div>
    <div class="regions">
      <ul class="lists">
        <li class="list" v-for="(regio, index) in region['reserves']" :key="index">
          <div class="regionInfo">
            <div class="left">
              <div class="xoxo">
                <div class="yoxo"><img class="int" :src="regio['image']" alt="image"></div>
                <button @click="$router.push(`/reserve/${regio['Slog']}`)" type="button" class="signup">{{ regio['name'] }}</button>
              </div>
            </div>
            <div class="text" v-html="filt(regio['info'])"></div>
          </div>
          <hr v-if="index !== region['reserves'].length-1">
        </li>
      </ul>
    </div>
    <div class="hr" v-if="region['animals'].length>0"><hr class="hrd"></div>
    <div class="animal">
      <ul class="lists">
        <li class="list" v-for="(out, index) in region['animals']" :key="index">
          <div class="regionInfo">
            <div class="left">
              <div class="xoxo">
                <div class="yoxo"><img :src="out['image']" alt="image"></div>
                <button @click="$router.push(`/animal/${out['Slog']}`)" type="button" class="signup">{{ out['name'] }}</button>
              </div>
            </div>
            <div id="p" class="text" v-html="this.filt(out['put'])"></div>
          </div>
          <hr v-if="index !== region['animals'].length-1">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
export default {
  name: "MyRegions",
  beforeMount() {
    this.getRegions()
  },
  filters: {
    marked,
  },
  methods: {
    filt(text) {
      return marked(text)
    },
    goto(index) {
      if (this.isPolygon) {this.coords = this.polygonsIn[index][0]} else {this.coords = this.position[index]}
      this.zoom = 4.4
      this.point = index
    },
    isOpen(index) {
      return this.point === index
    },
    setIcon(m) {
      if (m['icon'] !== '') {
        return {
          url: m['icon'],
          scaledSize: {width: 35, height: 35},
          labelOrigin: {x: 16, y: -10}
        }} else {
        return ''
      }
    },
    setPol() {
      for(this.y = 0; this.y < this.region['reserves'].length; this.y++) {
        for (this.x = 0; this.x < this.region['reserves'][this.y]['paths'].length; this.x++) {
          this.paths.push({
            lat: this.region['reserves'][this.y]['paths'][this.x][0],
            lng: this.region['reserves'][this.y]['paths'][this.x][1],
          })
        }
        this.polygonsIn.push(this.paths)
        this.paths = []
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
    setPoint(index) {
      if(this.point === index) {this.point = null} else {this.point = index}
    },
    tokotok() {
      this.tok++
      if(this.tok > 2) this.tok=0
    },
    async getRegions() {
      try {
        this.region = await fetch(this.$store.getters['site/getSettings']['ip']+`/region/${this.$route.params.Slog}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (this.region.ok === true) {
          this.region = (await this.region.json())['region'];
        }
      } catch (error) {
        console.log(error)
      }
      this.setPol()
    }
  },
  data() {
    return {
      point: null,
      paths: [],
      polygonsIn: [],
      region: null,
      options: {
        draggable: false,
        zoomControl: false,
        fullscreenControl: false,
        mapId: "dba1793621449d63",
      },
      optionsInfo: {
        pixelOffset: {
          width: 0, height: -45
        },
        maxWidth: 320,
        maxHeight: 320,
      },
      mobo: [
        {'background-color': '#264369FF'},
        {'background-color': '#8f571e'},
        {'background-color': '#8d1c1c'}
      ],
      modo: ['Map', 'Picture', 'Back'],
      tok: 0,
    }
  },
}
</script>

<style scoped>
.tet{
 margin: 15px 15px 0 0;
}
.lists {
  margin: 0 0 8px 0;
}
.yoxo {
  margin: 15px;
  border: thick double #7c3232;
}
.signup {
  background-color: #4CAF50;
}
.int {
  height: 300px;
  width: auto;
}
.left {
  float:left;
  margin: 7px 0 7px 15px;
}
.leftt {
  float:left;
  margin: 7px 30px 7px 15px;
  background: #dadada;
}
.imgmap {
  height: 450px;
  width: auto;
  max-width: 900px;
}
.map {
  align-self: center;
  border: 4mm ridge rgba(14, 105, 29, 0.6);
}
img {
  width: 50px;
  height: 50px;
  margin: 0 0 0 0;
}
.region {
  margin: 15px 45px 15px 45px;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  Padding-top: 74px;
  z-index: 0;
}
.regionInfo {
  display: flex;
  flex-direction: row;
}
img {
  height: 300px;
  width: auto;
}
.text {
  text-align: justify;
  padding: 0 0 0 15px;
  text-indent: 20px;
  font-size: 16px;
  margin-top: 0.5em;
  margin-bottom: 1em;
  line-height: 1.5;
}
.xoxo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hrd {
  border: 2px solid #727272;
  margin: 15px 0 15px 0;
  width: 99%;
}
#yoxo {
  margin: 15px;
  border: thick double #7c3232;
}
button {
  color: white;
  padding: 14px 20px;
  margin: 8px 9px 8px 9px;
  border: none;
  cursor: pointer;
  min-width: 8pc;
  min-height: 2pc;
  height: auto;
  width: auto;
  opacity: 0.9;
}
button:hover {
  opacity:1;
}
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
h3 {
  width: auto;
  height: auto;
  min-width: 5pc;
  max-width: 10pc;
}
.tt {
  margin: 0 0 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.openInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.infoImage {
  width: auto;
  height: 8pc;
}
</style>
