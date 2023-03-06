<template>
  <div class="organ">
    <div class="men">
      <div class="tor"><i class="icon" @click="isPos=!isPos"></i></div>
      <div v-if="isPos">
        <div class="bind">
          <button type="button" @click="int=0" :style="`background:${gog[0][this.int===0?1:0]}`"><i class="icon1"></i>Животные</button>
          <button type="button" @click="int=1" :style="`background:${gog[1][this.int===1?1:0]}`"><i class="icon2"></i>Растения</button>
          <button type="button" @click="int=2" :style="`background:${gog[2][this.int===2?1:0]}`"><i class="icon3"></i>Грибы</button>
        </div>
        <div class="rov">
          <div>
            <label>Тип: </label>
            <select v-model="tip">
              <option v-for="(cla, index) in top.tip" :key="index" v-bind:value="cla">{{ cla }}</option>
            </select>
          </div>
          <div>
            <label>Класс: </label>
            <select v-model="this.class">
              <option v-for="(cla, index) in top.class" :key="index" v-bind:value="cla">{{ cla }}</option>
            </select>
          </div>
          <div>
            <label>Отряд: </label>
            <select v-model="otr">
              <option v-for="(cla, index) in top.otr" :key="index" v-bind:value="cla">{{ cla }}</option>
            </select>
          </div>
          <div>
            <label>Семейство: </label>
            <select v-model="fam">
              <option v-for="(cla, index) in top.fam" :key="index" v-bind:value="cla">{{ cla }}</option>
            </select>
          </div>
          <div>
            <label>Род: </label>
            <select v-model="rod">
              <option v-for="(cla, index) in top.rod" :key="index" v-bind:value="cla">{{ cla }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="animal">
      <ul class="lists">
        <li class="list" v-for="(out, index) in this.jj[this.int]" :key="index">
          <div class="regionInfo">
            <div class="left">
              <div class="xoxo">
                <div class="yoxo"><img :src="out['image']" alt="image"></div>
                <button @click="$router.push(`/animal/${out['Slog']}`)" type="button"
                        :style="`background:${gog[this.int][this.int===0?1:0]}`">{{ out['name'] }}</button>
              </div>
            </div>
            <div id="p" class="text" v-html="this.filt(out['put'])"></div>
          </div>
          <hr v-if="index !== this.jj[this.int].length-1">
        </li>
      </ul>
      <div class="next" v-if="this.toro()">
        <button type="button" @click="nam[int]++; this.getAnimal()" :style="`background:${gog[this.int][1]}`">Еще?</button>
      </div>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
export default {
  name: "animalsI",
  beforeMount() {
    if (this.int === 0) this.getAnimal()
  },
  filters: {
    marked,
  },
  methods: {
    toro() {
      if (this.isNot[this.int]) {
        return (this.jj[this.int].length % 5 === 0) && (this.jj[this.int].length !== 0)
      } else {
        return false
      }
    },
    filt(text) {
      return marked(text)
    },
    async getAnimal() {
      try {
        this.animals = await fetch(this.$store.getters['site/getSettings']['ip']+`${this.teg[this.int]}${this.nam[this.int]}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (this.animals.ok === true) {
          this.animals = (await this.animals.json())['animals'];
          if (this.animals.length < 1) this.isNot[this.int] = false
          for (this.x = 0; this.x < this.animals.length; this.x++) {
            this.jj[this.int].push(this.animals[this.x]);
          }
          for (this.x = 0; this.x < this.animals.length; this.x++) {
            this.top.tip.push(this.animals[this.x]['clas'][1]);
            this.top.class.push(this.animals[this.x]['clas'][2]);
            this.top.otr.push(this.animals[this.x]['clas'][3]);
            this.top.fam.push(this.animals[this.x]['clas'][4]);
            this.top.rod.push(this.animals[this.x]['clas'][5]);
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  data() {
    return {
      top: {
        tip: [],
        class: [],
        otr: [],
        fam: [],
        rod: [],
      },
      tip: '',
      class: '',
      otr: '',
      fam: '',
      rod: '',
      isNot: [true, true, true],
      x: 0,
      nam: [0, 0, 0],
      animals: null,
      isPos: false,
      teg: ['/animals/', '/plant/', '/mushrooms/'],
      int: 0,
      jj: [[],[],[]],
      gog: [['rgb(121,37,37,0.3)','rgb(121,37,37,0.8)'],
        ['rgba(37,121,41,0.3)','rgb(37,121,41,0.8)'],
        ['rgb(114,68,21,0.3)','rgb(114,68,21,0.8)']]
    }
  }
}
</script>

<style scoped>
.rov {
  background: #efe8e8;
  margin: 15px;
  height: 50px;
}
.next {
  background: #dad7d7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.organ {
  margin: 15px 45px 15px 45px;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  Padding-top: 74px;
  z-index: 0;
}
.rov {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.men {
  background: #e7e1e1;
}
.tor {
  margin: 20px;
}
.icon:before {
  content:'\f103';
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 25px;
  color: #454d4d;
  vertical-align:bottom;
  cursor: pointer;
}
.icon1:before {
  margin: 0 10px 0 0;
  content:'\f1b0';
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 25px;
  color: #454d4d;
  vertical-align:bottom;
}
.icon2:before {
  margin: 0 10px 0 0;
  content:'\f1bb';
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 25px;
  color: #454d4d;
  vertical-align:bottom;
}
.icon3:before {
  margin: 0 10px 0 0;
  content:'\f06c';
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 25px;
  color: #454d4d;
  vertical-align:bottom;
}
.bind {
  margin: 0 0 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
button {
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
.animal {
  margin: 0 0 0 0;
}
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
.regionInfo {
  display: flex;
  flex-direction: row;
}
.left {
  float:left;
  margin: 7px 7px 7px 0;
}
.xoxo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.yoxo {
  margin: 15px;
  border: thick double #7c3232;
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
</style>
