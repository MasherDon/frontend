<template>
  <div class="region">
    <div class="tet">
      <div class="leftt">
        <div class="xoxo">
          <div class="yoxo"><img :src="this.reserve['intro']" alt="image"></div>
          <div class="tt">
            <h4>{{ this.reserve['name'] }}</h4>
            <div class="bot">
              <div class="ll"><b>{{this.put?this.put['numb']:0}}</b> <i id="sta" @click="$router.push(`/articles/${this.reserve['Slog']}`)" class="i"></i></div>
              <i id="add" @click="$router.push(`/article/add/${this.reserve['Slog']}`)" class="i"></i>
            </div>
            <a :href="tok===1?'#pic':'#'"><button type="button"
                  :style="mobo[tok]" @click="this.tokotok()">{{modo[tok]}}</button></a>
          </div>
        </div>
      </div>
      <div class="text" v-html="this.filt(this.reserve['put'])"></div>
      <div class="text" v-html="this.filt(this.reserve['info'])"></div>
    </div>
    <a name="pic"></a>
    <div class="map" v-if="tok===1">
      <img class="imgmap" :src="this.reserve['map']" alt="map">
    </div>
    <div class="hr" v-if="this.reserve['animals'].length>0"><hr class="hrd"></div>
    <div class="animal">
      <ul class="lists">
        <li class="list" v-for="(out, index) in this.reserve['animals']" :key="index">
          <div class="regionInfo">
            <div class="left">
              <div class="xoxo">
                <div class="yoxo"><img :src="out['image']" alt="image"></div>
                <button @click="$router.push(`/animal/${out['Slog']}`)" type="button" class="signup">{{ out['name'] }}</button>
              </div>
            </div>
            <div id="p" class="text" v-html="this.filt(out['put'])"></div>
          </div>
          <hr v-if="index !== this.reserve['animals'].length-1">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
export default {
  name: "reserveI",
  beforeMount() {
    this.getReserve()
    this.cr()
  },
  filters: {
    marked,
  },
  methods: {
    filt(text) {
      return marked(text)
    },
    async getReserve() {
      try {
        this.reserve = await fetch(this.$store.getters['site/getSettings']['ip']+`/reserve/${this.$route.params.Slog}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (this.reserve.ok === true) {
          this.reserve = (await this.reserve.json())['reserve'];
        }
      } catch (error) {
        console.log(error)
      }
    },
    async cr() {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+'/tag/'+this.$route.params.Slog,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (this.put.ok === true) {
          this.put = (await this.put.json());
        }
      } catch (error) {
        console.log(this.errors)
      }
    },
    tokotok() {
      this.tok++
      if(this.tok > 1) this.tok=0
    },
  },
  data() {
    return {
      reserve: null,
      mobo: [
        {'background-color': '#8f571e'},
        {'background-color': '#8d1c1c'}
      ],
      modo: ['Picture', 'Back'],
      tok: 0,
      put: null,
    }
  },
}
</script>

<style scoped>
a {
  margin: 0 10px 0 0;
}
h4 {
  margin: 0 0 0 15px;
}
.i {
  margin: 0 10px 0 10px;
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 30px;
  vertical-align:bottom;
  color: #dd3333;
}
.i:hover {
  cursor: pointer;
}
#sta {
  padding: 5px 0 0 0;
}
#sta:before {
  content:"\f1ea";
}
#add:before {
  content:"\f044";
}
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
.yoxo {
  margin: 15px 15px 15px 15px;
  border: thick double #7c3232;
}
.imgmap {
  height: 450px;
  width: auto;
  max-width: 900px;
}
.ll {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.map {
  align-self: center;
  border: 4mm ridge rgba(14, 105, 29, 0.6);
}
.left {
  float:left;
  margin: 0 0 7px 15px;
}
.leftt {
  float:left;
  margin: 7px 30px 7px 15px;
  background: #dadada;
}
.bot {
  display: flex;
  flex-direction: row;
}
.region {
  margin: 15px 45px 15px 45px;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  Padding-top: 74px;
  z-index: 0;
}
.tet{
  margin: 15px 15px 0 0;
}
img {
  height: 300px;
  width: auto;
}
.text {
  text-align: justify;
  text-indent: 20px;
  font-size: 16px;
  margin-top: 0.5em;
  margin-bottom: 1em;
  padding: 0 0 0 15px;
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
.yoxo {
  margin: 15px;
  border: thick double #7c3232;
}
button {
  background-color: rgba(38, 67, 105, 100%);
  color: white;
  padding: 14px 20px;
  margin: 8px 9px 8px 30px;
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
h4 {
  width: auto;
  height: auto;
  min-width: 5pc;
  max-width: 10pc;
}
.tt {
  margin: 0 0 15px 0;
  background: #d9d3d3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
