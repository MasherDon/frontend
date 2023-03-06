<template>
  <div class="add">
    <div class="tag">
      <div class="top">
        <label>Категории: </label>
        <select v-model="id">
          <option v-for="(cla, index) in clas" :key="index" v-bind:value="index">{{ cla }}</option>
        </select>
      </div>
      <div class="list">
        <ul v-for="(lis, index) in tort[id]" :key="index">
          <li @click="this.setpos(index)" :style="`background:${stil[this.setStil(lis, index)]}`" class="tos">
            <b v-if="id===0">{{index+1}}.</b> {{ lis }}
          </li>
        </ul>
      </div>
      <div class="about">
        <a href="https://daringfireball.net/projects/markdown/">Справка <i class="fa-underline"></i></a>
        <a href="#">Справка <i class="fa-tag"></i></a>
      </div>
    </div>
    <div class="form" v-if="set!==null">
      <form class="imp" onsubmit="return false" v-if="this.gorod()" >
        <div v-if="(this.id === 0 || this.id === 1) && this.set === 0">
          <div v-if="id===1" class="hok">
            <label>Slog: </label>
            <input v-model="Slog" type="text" required>
          </div>
          <div class="hok">
            <label>name: </label>
            <input v-model="setIs.name" type="text" required>
          </div>
          <div class="hok">
            <label>image: </label>
            <input v-model="setIs.image" type="text" required>
          </div>
          <div class="hok">
            <label>put: </label>
            <textarea v-model="setIs.put" cols="80" rows="20" required>
            </textarea>
          </div>
          <div class="hok">
            <label>info: </label>
            <textarea v-model="setIs.info" cols="80" rows="20" required>
            </textarea>
          </div>
          <div class="hok">
            <label>clas: </label>
            <div>
              <div>Царство:<input v-model="setIs.clas[0]" type="text" ></div>
              <div>Тип:<input v-model="setIs.clas[1]" type="text" ></div>
              <div>Класс:<input v-model="setIs.clas[2]" type="text" ></div>
              <div>Отряд:<input v-model="setIs.clas[3]" type="text"></div>
              <div> Семейство:<input v-model="setIs.clas[4]" type="text"></div>
              <div>Род:<input v-model="setIs.clas[5]" type="text"></div>
              <div>Вид:<input v-model="setIs.clas[6]" type="text"></div>
            </div>
          </div>
          <div class="hok">
            <label>defend: </label>
            <div>
              <div>Статус: <input v-model="setIs.defend[0]" type="text"></div>
              <div>Класc: <input v-model="setIs.defend[1]" type="text"></div>
            </div>
          </div>
          <div class="hok">
            <label>label: </label>
            <input v-model="setIs.label" type="text">
          </div>
        </div>
        <div v-if="(this.id === 0 || this.id === 1) && this.set === 1">
          <div v-if="id===1" class="hor">
            <label>Slog: </label>
            <input v-model="Slog" type="text" required>
          </div>
          <div class="hok">
            <label>name: </label>
            <input v-model="setIs.name" type="text" required>
          </div>
          <div class="hok">
            <label>intro: </label>
            <input v-model="setIs.intro" type="text" required>
          </div>
          <div class="hok">
            <label>put: </label>
            <textarea v-model="setIs.put" cols="80" rows="20" required>
            </textarea>
          </div>
          <div class="hok">
            <label>info: </label>
            <textarea v-model="setIs.info" cols="80" rows="20" required>
            </textarea>
          </div>
          <div class="hok">
            <label>lat: </label>
            <input v-model="setIs.lat" type="number" required>
          </div>
          <div class="hok">
            <label>lng: </label>
            <input v-model="setIs.lng" type="number" required>
          </div>
          <div class="hok">
            <label>map: </label>
            <input v-model="setIs.map" type="text">
          </div>
          <div class="hok">
            <label>animals: </label>
            <ul v-for="(lis, bot) in setIs.animals" :key="bot" class="uu">
              <li>
                {{ bot+1 }} <input type="text" v-model="setIs.animals[bot]">
              </li>
            </ul>
            <button class="ud" type="button" @click="this.goros()">Delete</button>
            <button class="ud" type="button" @click="this.gojos()">Add</button>
          </div>
        </div>
        <div v-if="(this.id === 0 || this.id === 1) && this.set === 2">
          <div v-if="id===1" class="hor">
            <label>Slog: </label>
            <input v-model="Slog" type="text" required>
          </div>
          <div class="hok">
            <label>name: </label>
            <input v-model="setIs.name" type="text" required>
          </div>
          <div class="hok">
            <label>image: </label>
            <input v-model="setIs.image" type="text" required>
          </div>
          <div class="hok">
            <label>info: </label>
            <textarea v-model="setIs.info" cols="80" rows="20" required>
            </textarea>
          </div>
          <div class="hok">
            <label>icon: </label>
            <input v-model="setIs.icon" type="text">
          </div>
          <div class="hok">
            <label>Slog: </label>
            <input v-model="setIs.Slog" type="text">
          </div>
          <div class="hok">
            <label>fillColor: </label>
            <input v-model="setIs.fillColor" type="color">
          </div>
          <div class="hok">
            <label>strokeColor: </label>
            <input v-model="setIs.strokeColor" type="color">
          </div>
          <div class="hok">
            <label>reserves: </label>
            <ul v-for="(lis, bot) in setIs.paths" :key="bot" class="uu">
              <li>
                <div>lat: <input type="text" v-model="setIs.paths[bot][0]"></div>
                <div>lng: <input type="text" v-model="setIs.paths[bot][1]"></div>
              </li>
            </ul>
            <button class="ud" type="button" @click="this.gorop()">Delete</button>
            <button class="ud" type="button" @click="this.gojop()">Add</button>
          </div>
        </div>
        <div v-if="(this.id === 0 || this.id === 1) && this.set === 3">
          <div v-if="id===1" class="hor">
            <label>Slog: </label>
            <input v-model="Slog" type="text" required>
          </div>
          <div class="hok">
            <label>name: </label>
            <input v-model="setIs.name" type="text" required>
          </div>
          <div class="hok">
            <label>intro: </label>
            <input v-model="setIs.intro" type="text" required>
          </div>
          <div class="hok">
            <label>info: </label>
            <textarea v-model="setIs.info" cols="80" rows="20" required>
            </textarea>
          </div>
          <div class="hok">
            <label>put: </label>
            <textarea v-model="setIs.put" cols="80" rows="20" required>
            </textarea>
          </div>
          <div class="hok">
            <label>lat: </label>
            <input v-model="setIs.lat" type="number" required>
          </div>
          <div class="hok">
            <label>lng: </label>
            <input v-model="setIs.lng" type="number" required>
          </div>
          <div class="hok">
            <label>map: </label>
            <input v-model="setIs.map" type="text" required>
          </div>
          <div class="hok">
            <label>reserves: </label>
            <ul v-for="(lis, bot) in setIs.reserves" :key="bot" class="uu">
              <li>
                {{ bot+1 }} <input type="text" v-model="setIs.reserves[bot]" >
              </li>
            </ul>
            <button class="ud" type="button" @click="this.goros()">Delete</button>
            <button class="ud" type="button" @click="this.gojos()">Add</button>
          </div>
          <div class="hok">
            <label>reserves: </label>
            <ul v-for="(lis, bot) in setIs.animals" :key="bot" class="uu">
              <li>
                {{ bot+1 }} <input type="text" v-model="setIs.animals[bot]">
              </li>
            </ul>
            <button class="ud" type="button" @click="this.goroa()">Delete</button>
            <button class="ud" type="button" @click="this.gojoa()">Add</button>
          </div>
        </div>
        <div v-if="(this.id === 0 || this.id === 1) && this.set === 4">
          <div v-if="id===1" class="hor">
            <label>Slog: </label>
            <input v-model="Slog" type="text" required>
          </div>
          <div class="hok">
            <label>name: </label>
            <input v-model="setIs.name" type="text" required>
          </div>
          <div class="hok">
            <label>intro: </label>
            <input v-model="setIs.image" type="text" required>
          </div>
          <div class="hok">
            <label>info: </label>
            <textarea v-model="setIs.info" cols="80" rows="20" required>
            </textarea>
          </div>
          <div class="hok">
            <label>lat: </label>
            <input v-model="setIs.lat" type="number" required>
          </div>
          <div class="hok">
            <label>lng: </label>
            <input v-model="setIs.lng" type="number" required>
          </div>
          <div class="hok">
            <label>icon: </label>
            <input v-model="setIs.icon" type="text">
          </div>
          <div class="hok">
            <label>Slog: </label>
            <input v-model="setIs.Slog" type="text">
          </div>
          <div class="hok">
            <label>reserves: </label>
            <ul v-for="(lis, bot) in setIs.animals" :key="bot" class="uu">
              <li>
                {{ bot+1 }} <input type="text" v-model="setIs.animals[bot]">
              </li>
            </ul>
            <button class="ud" type="button" @click="this.goroa()">Delete</button>
            <button class="ud" type="button" @click="this.gojoa()">Add</button>
          </div>
        </div>
        <div v-if="this.id === 2">
          <div class="hor">
            <label>Slog: </label>
            <input v-model="Slog" type="text" required>
          </div>
        </div>
        <div v-if="this.id === 3">
          <div class="hor">
            <label>username: </label>
            <input v-model="username" type="text" required>
          </div>
        </div>
        <div v-if="this.id === 5 && (this.set === 0 || this.set === 1)" >
          <div class="hok">
            <div><label>animal: </label><input type="text" v-model="setIs.name" required></div>
            <div><label>reserve: </label><input type="text" v-model="setIs.reserve" required></div>
            <ul v-for="(lis, bot) in setIs.labels" :key="bot" class="uu">
              <li>
                <div><label>label: </label><input type="date" v-model="setIs.labels[bot]" required></div>
                <div><label>data: </label><input type="number" v-model="setIs.data[bot]" required></div>
              </li>
            </ul>
            <button class="ud" type="button" @click="this.goro()">Delete</button>
            <button class="ud" type="button" @click="this.gojo()">Add</button>
          </div>
        </div>
        <div v-if="this.id === 5 && this.set === 2" >
          <div class="hok">
            <div><label>animal: </label><input type="text" v-model="setIs.name" required></div>
            <div><label>reserve: </label><input type="text" v-model="setIs.reserve" required></div>
          </div>
        </div>
      </form>
    </div>
    <div class="setting" v-if="set!==null">
      <div class="erro">
        <ul>
          <li v-for="(error, index) in this.errors" :key="index" class="lip">
            {{ index }} - {{ typeof(error) === "object"? error[0].split('"')[0] : error }}
          </li>
        </ul>
      </div>
      <div>
        <button v-if="id === 0" type="submit" @click="this.signUp()">Добавить</button>
        <button v-if="id === 1" type="submit" @click="this.sign()" >Изменить</button>
        <button v-if="id === 2" type="submit" @click="this.signDe()">Удалить</button>
        <button v-if="id === 3" type="submit" @click="this.opts()">Отправить</button>
        <button v-if="id === 4" type="submit">Отправить</button>
        <button v-if="id === 5 && (set === 0 || set === 1)" @click="this.add()" type="submit">Обновить</button>
        <button v-if="id === 5 && set === 2" @click="this.del()" type="submit">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddIt',
  beforeMount() {
  },
  data() {
    return {
      hor: ['Животные','Растения','Грибы'],
      id: 0,
      ip: 0,
      set: null,
      Slog: '',
      errors: [],
      put: null,
      x: 0,
      clas: ['Добаить', 'Изменить', 'Удалить', 'Пользователи', 'Другое', 'Численность'],
      uto: [
        ['animal','reserve','map/polygon','region','map/marker'],
        ['animal','reserve','map/polygon','region','map/marker'],
        ['animal','reserve','map/polygon','region','map/marker'],
      ],
      toro: [1, 2, 3, 4],
      tort: [
        ['Добавть организм', 'Добавить заповедник', 'Добавить полигон', 'Добавить регион', 'Доюавить маркер',],
        ['Изменить организм', 'Изменить заповедник', 'Изменить полигон', 'Изменить регион', 'Изменить маркер'],
        ['Удалить организм', 'Удалить заповедник', 'Удалить полигон', 'Удалить регион', 'Удалить маркер'],
        ['Сделать admin', 'Сделать user', 'Ban article', 'Ban user'],
        ['Удалить article', 'Удалить comment'],
        ['Добавить', 'Изменить', 'Удалить'],
      ],
      stil: ['', '#b74d4d', '#c7bdbd'],
      setIs: null,
      username: '',
      form: {
        name: '',
        imag: '',
        paths: [[0, 0]],
        put: '',
        icon: '',
        Slog: '',
        fillColor: '',
        strokeColor: '',
        info: '',
        clas: ['','','','','','',''],
        defend: ['', ''],
        labels: [''],
        label: '',
        data: [0],
        intro: '',
        lat: 0,
        lng: 0,
        map: '',
        reserve: '',
        reserves: [''],
        animals: [''],
      },
      error: {},
    }
  },
  watch: {
    id: function () {
      this.set = null
      this.setIs = this.form
      this.errors = []
    },
  },
  methods: {
    gorod() {
      this.setIs = this.form
      return true
    },
    setJson() {
      if ((this.id === 0 || this.id === 1) && this.set === 0) {
        return {
          'animal': {
            'name': `${this.setIs.name}`,
            'image': `${this.setIs.image}`,
            'put': `${this.setIs.put}`,
            'info': `${this.setIs.info}`,
            'clas': this.setIs.clas,
            'defend': this.setIs.defend,
            'labels': this.setIs.labels,
            'label': `${this.setIs.label}`,
            'data': this.setIs.data,
          }
        }
      }
      if ((this.id === 0 || this.id === 1) && this.set === 1) {
        return {
          'reserve': {
            'name': `${this.setIs.name}`,
            'into': `${this.setIs.into}`,
            'put': `${this.setIs.put}`,
            'info': `${this.setIs.info}`,
            'lat': this.setIs.lat,
            'lng': this.setIs.lng,
            'map': `${this.setIs.map}`,
            'animals': this.setIs.animals,
          }
        }
      }
      if ((this.id === 0 || this.id === 1) && this.set === 2) {
        return {
          'polygon': {
            'paths': this.setIs.paths,
            'name': `${this.setIs.name}`,
            'image': `${this.setIs.into}`,
            'info': `${this.setIs.info}`,
            'icon': `${this.setIs.icon}`,
            'Slog': `${this.setIs.Slog}`,
            'fillColor': `${this.setIs.fillColor}`,
            'strokeColor': `${this.setIs.strokeColor}`,
          }
        }
      }
      if ((this.id === 0 || this.id === 1) && this.set === 3) {
        return {
          'region': {
            'name': `${this.setIs.name}`,
            'intro': `${this.setIs.intro}`,
            'info': `${this.setIs.info}`,
            'put': `${this.setIs.put}`,
            'lat': this.setIs.lat,
            'lng': this.setIs.lng,
            'map': `${this.setIs.map}`,
            'reserves': this.setIs.reserves,
            'animals': this.setIs.animals,
          }
        }
      }
      if ((this.id === 0 || this.id === 1) && this.set === 4) {
        return {
          'marker': {
            'name': `${this.setIs.name}`,
            'image': `${this.setIs.intro}`,
            'info': `${this.setIs.info}`,
            'lat': this.setIs.lat,
            'lng': this.setIs.lng,
            'icon': `${this.setIs.name}`,
            'slog': `${this.setIs.name}`,
          }
        }
      }
    },
    async add() {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+`/animal/${this.setIs.name}/${this.setIs.reserve}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
          body: JSON.stringify({
            animal: {
              labels: this.setIs.labels,
              data: this.setIs.data,
            }
          })
        });
        if (this.put.status === 422) this.errors = (await this.put.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async del() {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+`/animal/${this.setIs.name}/${this.setIs.reserve}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.put.status === 422) this.errors = (await this.put.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async signUp() {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+'/'+this.uto[this.id][this.set], {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
          body: JSON.stringify(this.setJson())
        });
        if (this.put.status === 422) this.errors = (await this.put.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async sign() {
      if (this.Slog === '') {
        this.error['Slog'] = 'не указанно'
      } else {
        try {
          this.put = await fetch(this.$store.getters['site/getSettings']['ip']+'/'+this.uto[this.id][this.set]+`/${this.Slog}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('Authorization'),
            },
            body: JSON.stringify(this.setJson())
          });
          if (this.put.status === 422) this.errors = (await this.put.json())['errors']
        } catch (error) {
          console.log(this.errors)
        }
      }
    },
    async signDe() {
      if (this.Slog === '') {
        this.error['Slog'] = 'не указанно'
      } else {
        try {
          this.put = await fetch(this.$store.getters['site/getSettings']['ip']+'/'+this.uto[this.id][this.set]+`/${this.Slog}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('Authorization'),
            },
          });
          if (this.put.status === 422) this.errors = (await this.put.json())['errors']
        } catch (error) {
          console.log(this.errors)
        }
      }
    },
    async opts() {
      if (this.username === '') {
        this.error['username'] = 'не указанно'
      } else {
        try {
          console
          this.put = await fetch(this.$store.getters['site/getSettings']['ip']+`/user/${this.username}/${this.toro[this.set]}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('Authorization'),
            },
          });
          if (this.put.status === 422) this.errors = (await this.put.json())['errors']
        } catch (error) {
          console.log(this.errors)
        }
      }
    },
    goron() {
      if (this.setIs.data.labels > 1) {
        this.setIs.data.pop()
      }
    },
    gojon() {
      this.setIs.data.push(0)
    },
    goro() {
      if (this.setIs.labels.length > 1) {
        this.setIs.labels.pop()
        this.setIs.data.pop()
      }
    },
    gojo() {
      this.setIs.labels.push('')
      this.setIs.data.push(0)
    },
    gojoa() {
      this.setIs.animals.push('')

    },
    goroa() {
      if (this.setIs.animals.length > 1) {
        this.setIs.animals.pop()
      }
    },
    gorop() {
      if (this.setIs.paths.length > 1) {
        this.setIs.paths.pop()
      }
    },
    gojop() {
      this.setIs.paths.push([0, 0])
    },
    goros() {
      if (this.setIs.reserves.length > 1) {
        this.setIs.reserves.pop()
      }
    },
    gojos() {
      this.setIs.reserves.push('')
    },
    setpos(index) {
      this.set = index;
    },
    setStil(lis, index) {
      if(lis === 'Сделать admin' || lis === 'Удалить admin') {
        if(this.$store.getters['user/getUser']['rights'] !== 0) { return 1 }
      }
      if(index === this.set) {
        return 2
      }
      return 0;
    },
  }
}
</script>

<style scoped>
i {
  font-style: normal;
  font-family: FontAwesome,serif;
}
a {
  margin: 5px 10px;
}
.about {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
}
.lip {
  margin: 5px 0 0 0;
}
button {
  margin: 10px;
}
.erro {
  margin: 15px;
  min-height: 100px;
}
.setting {
  width: auto;
}
.yof {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 15px;
}
.hok {
  padding: 10px;
  margin: 15px;
  border-top: 2px solid #c0c5c5;
}
.form {
  overflow-y: scroll;
  padding: 15px 15px 0 15px;
  width: 700px;
  border-right: 2px solid #c0c5c5;
  max-height: 88vh;
}
input {
  margin: 10px;
  width: 350px;
}
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
textarea {
  resize: none;
}
.imp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  min-height: 90vh;
  Padding-top: 74px;
  z-index: 0;
}
.tag {
  border-right: 2px solid #c0c5c5;
  width: 220px;
  height: auto;
  padding: 15px;
}
.tos:hover {
  cursor: pointer;
}
</style>
