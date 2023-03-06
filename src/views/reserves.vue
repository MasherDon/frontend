<template>
  <div class="regions">
    <ul class="lists">
      <li class="list" v-for="(reserve, index) in reserves" :key="index">
        <div class="regionInfo">
          <div class="left">
            <div class="xoxo">
              <div class="yoxo"><img :src="reserve['intro']" alt="image"></div>
              <button @click="$router.push(`/reserve/${reserve['Slog']}`)" type="button" class="signup">{{ reserve['name'] }}</button>
            </div>
          </div>
          <div id="p" class="text" v-html="this.filt(reserve['put'])"></div>
        </div>
        <hr v-if="index !== reserves.length-1">
      </li>
    </ul>
    <div class="next" v-if="this.toro()">
      <button type="button" @click="nam++; this.getRegions()">Еще?</button>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
export default {
  name: "reservesI",
  beforeMount() {
    this.getRegions()
  },
  filters: {
    marked,
  },
  methods: {
    toro() {
      if (this.isNot) {
        return this.regio.length % 5 === 0
      } else {
        return false
      }
    },
    filt(text) {
      return marked(text)
    },
    async getRegions() {
      try {
        this.reserves = await fetch(this.$store.getters['site/getSettings']['ip']+`/reserves/${this.nam}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (this.reserves.ok === true) {
          this.reserves = (await this.reserves.json())['reserves'];
          if (this.reserves.length < 1) this.isNot = false
          for (this.x = 0; this.x < this.reserves.length; this.x++) {
            this.regio.push(this.reserves[this.x]);
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  data() {
    return {
      isNot: true,
      x: 0,
      regio: [],
      reserves: null,
      nam: 0,
    }
  },
}
</script>

<style scoped>
.next {
  background: #dad7d7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left {
  float:left;
  margin: 7px 7px 7px 0;
}
.regions {
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
#p {
  margin: 30px 15px 0 0;
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
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 9px;
  border: none;
  cursor: pointer;
  min-width: 8pc;
  min-height: 2pc;
  height: auto;
  width: auto;
  opacity: 0.9;
}
.text {
  text-indent: 20px;
  font-size: 16px;
  margin-top: 0.5em;
  margin-bottom: 1em;
}
button:hover {
  opacity:1;
}
hr {
  margin-top: 20px
}
</style>
