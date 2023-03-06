<template>
  <div class="organ">
    <div class="animal">
      <div class="left">
        <div class="xoxo">
          <div class="yoxo"><img :src="this.img()" alt="pic"></div>
          <div class="tit">
            <h3>{{ this.animal['name'] }}</h3>
            <div class="bot">
              <div class="ll"><b>{{this.put?this.put['numb']:0}}</b> <i id="sta" @click="$router.push(`/articles/${this.get()}`)" class="i"></i></div>
              <i id="add" @click="$router.push(`/article/add/${this.get()}`)" class="i"></i>
            </div>
          </div>
          <div v-if="this.animal['clas'].length>1">
            <ul class="list" v-for="(clas, index) in this.animal['clas']" :key="index">
              <li>{{this.class[index]}}: {{clas}}</li>
            </ul>
          </div>
          <div class="st"><p>Охранный статус:</p>
            <p>{{this.animal['defend'][0]}} [{{this.animal['defend'][1]}}]</p>
          </div>
        </div>
      </div>
      <div class="text" v-html="this.filt(this.animal['put'])"></div>
      <div class="text" v-html="this.filt(this.animal['info'])"></div>
    </div>
    <div v-if="this.animal['reserve'].length > 0" class="ggg">
      <div class="kk">
        <b>Заповедники:</b>
        <div class="jj">
          <div v-for="(test, index) in this.animal['reserve']" :key="index">
            <button class="ug" type="button" @click="$router.push(`/reserve/${test}`)">{{ test }}</button>
          </div>
        </div>
      </div>
      <div class="ii" v-if="this.animal['reserve'].length > 1">
        <button class="hop" type="button" @click="roo=!roo"><i class="fa-area-chart"></i>{{!roo?'График по заповедникам':'Общий график'}}</button>
      </div>
    </div>
    <div class="hr"><hr class="hrd"></div>
    <div class="graphic">
      <div class="ram" v-if="!roo">
        <Line
            :chart-data="this.setGraphic()"
            :chart-options="chartOptions"
            :width="1000"
            :height="400"
        />
      </div>
      <div class="ram" v-else>
        <Line
            :chart-data="this.setGraf()"
            :chart-options="Options"
            :width="1000"
            :height="400"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
import {Line} from "vue-chartjs";
import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
export default {
  name: "animalI",
  components: { Line },
  data() {
    return {
      class: ['Царство','Тип','Класс','Отряд','Семейство','Род','Вид'],
      animal: null,
      labels: [],
      data: [],
      chartOptions: {
      },
      Options: {
      },
      put: null,
      x: 0,
      y: 0,
      datasets: [],
      roo: false,
    }
  },
  beforeMount() {
    this.getAnimal()
    this.cr()
    this.cop()
  },
  filters: {
    marked,
  },
  methods: {
    get() {
      if (this.animal) {
        return this.animal['Slog']
      }
    },
    img() {
      if (this.animal) {
        return this.animal['image']
      }
    },
    cop() {
      if (this.animal) {
        for (this.x in this.animal['labels']) {
          for (this.y in this.animal['labels'][this.x]) {
            if (this.labels.indexOf(this.animal['labels'][this.x][this.y]) === -1) {
              this.labels.push(this.animal['labels'][this.x][this.y])
              this.data.push(Number(this.animal['data'][this.x][this.y]))
            } else {
              this.data[this.labels.indexOf(this.animal['labels'][this.x][this.y])] +=
                   Number(this.animal['data'][this.x][this.y])
            }
          }
        }
      }
    },
    setGraphic() {
      return {
        labels: this.labels,
        datasets: [{
          label: this.animal['label'],
          data: this.data,
          fill: false,
          borderColor: 'rgb(147,55,55)',
          backgroundColor: '#ffffff',
        }]
      }
    },
    setGraf() {
      this.datasets = []
      for(this.x in this.animal['data']) {
        this.datasets.push({
          label: this.animal['reserve'][this.x],
          data: this.animal['data'][this.x],
          fill: false,
          borderColor: 'rgb(147,55,55)',
          backgroundColor: '#ffffff',
        })
      }
      return {
        labels: this.labels,
        datasets: this.datasets,
      }
    },
    filt(text) {
      return marked(text)
    },
    async getAnimal() {
      try {
        this.animal = await fetch(this.$store.getters['site/getSettings']['ip']+`/animal/${this.$route.params.Slog}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (this.animal.ok === true) {
          this.animal = (await this.animal.json())['animal'];
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
  },
}
</script>

<style scoped>
i {
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 20px;
  margin: 3px 10px 3px 3px;
  color: #690000;
}
.ll {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.ii {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hop {
  border: none;
  padding: 10px;
  background: #d7c6c6;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
}
.ug {
  margin: 10px 10px 0 0;
  border: none;
  background: #e1e1e1;
  min-height: 25px;
  min-width: 50px;
  cursor: pointer;
}
.kk {
  margin: 15px 0 0 50px;
}
.ggg {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.jj {
  display: flex;
  flex-direction: row;
}
.ram {
  margin: 30px 0 30px 0;
  background: #e3dcdc;
}
.graphic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h3 {
  margin: 0 0 0 15px;
}
.bot {
  display: flex;
  flex-direction: row;
  margin: 0 0 0 45px;
  padding: 5px;
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
  padding: 2px 0 0 0;
}
#sta:before {
  content:"\f1ea";
}
#add:before {
  content:"\f044";
}
.st {
  text-align: center;
  max-width: 20pc;
}
.list {
  text-align: center;
  text-indent: 20px;
  font-size: 16px;
  margin-top: 0.5em;
  margin-bottom: 1em;
  line-height: 1;
}
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
.organ {
  margin: 15px 45px 15px 45px;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  Padding-top: 74px;
  z-index: 0;
}
.animal {
  margin: 15px 15px 0 0;
}
.left {
  float:left;
  margin: 7px 15px 7px 15px;
  background: #dadada;
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
.yoxo {
  margin: 15px;
  border: thick double #7c3232;
}
.tit {
  background: #d9d3d3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.xoxo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
