<template>
  <div class="add">
    <div v-if="disabled">
      <form class="yy" onsubmit="return false">
        <div><h2>Новая статься</h2></div>
        <div class="title">
          <input type="text" v-model="form.title" placeholder="Заголовок" required/>
          <input type="text" v-model="form.description" placeholder="Статься о..." required/>
        </div>
        <div class="info">
        <textarea cols="80" rows="20" placeholder="Содержание"  v-model="form.body" required>
        </textarea>
          <input v-on:keyup.enter="this.strok()" type="text" placeholder="Теги" v-model="teg"/>
          <div class="hh">
            <ul class="uu" v-for="(tag, index) in this.form.tagList" :key="index">
              <li v-if="tag"><div @click="this.strop(index)" class="jj">{{ tag }}</div></li>
            </ul>
          </div>
        </div>
        <div class="lop">
          <button type="button" @click="this.sign()">Сохранить</button>
          <button type="button" @click="disabled=false">Редактир</button>
        </div>
      </form>
    </div>
    <div class="yy" v-else>
      <div><h2>Редактор</h2></div>
      <div class="bobo">
        <tinymce-editor>
        </tinymce-editor>
      </div>
      <div class="lop">
        <button type="button" @click="this.sign()">Сохранить</button>
        <button type="button" @click="disabled=true">Статья</button>
      </div>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '../components/edit'
export default {
  name: "addArticle",
  beforeMount() {
    this.sot()
  },
  components: {
    TinymceEditor
  },
  data() {
    return {
      disabled: true,
      teg: '',
      form: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      put: null,
      x: 0,
    }
  },
  methods: {
    sot() {
      if (this.$route.params.tag !== ' ') {
        this.cr(this.$route.params.tag)
        this.form.tagList.push(this.$route.params.tag)
        this.add(this.$route.params.tag)
      }
    },
    async sign() {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+'/article',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
          body: JSON.stringify({
            'article': {
              'title': this.form.title,
              'description': this.form.description,
              'body': this.form.body,
              'tagList': this.form.tagList,
            }
          })
        });
        if (this.put.ok === true) {
          this.put = (await this.put.json())['article'];
          await this.$router.push(`/article/${this.put['slug']}`)
        }
        if (this.put.status === 422) this.errors = (await this.put.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async cr(tag) {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+'/tag',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'name': `${tag}`
          })
        });
      } catch (error) {
        console.log(this.errors)
      }
    },
    async add(tag) {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+'/tag/add/'+tag,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.log(this.errors)
      }
    },
    async del(tag) {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+'/tag/del/'+tag,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.log(this.errors)
      }
    },
    strop(index) {
      this.del(this.form.tagList[index])
      delete this.form.tagList[index]
      this.form.tagList[index] = undefined
    },
    strok() {
      this.cr(this.teg)
      this.form.tagList.push(this.teg)
      this.add(this.teg)
      this.teg = ''
    }
  }
}
</script>

<style scoped>
input[type=text], textarea {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  margin: 5px 0 20px 0;
  border: none;
  background: #e7e7e7;
  font-size: 14px;
}
input[type=text]:focus, textarea:focus {
  background-color: #ddd;
  outline: none;
}
textarea {
  resize: none;
}
.bobo {
  margin: 0 0 20px 0;
}
.title {
  width: 600px;
}
.info {
  width: 500px;
}
h2 {
  margin: 0 0 20px 0;
}
ul.uu li {
  display: inline;
  list-style-type: none;
}
ul.uu {
  margin-left: 0;
  padding-left: 0;
}
.jj {
  background: #cccccc;
  border-radius: 15px;
  padding: 5px;
  margin: 0 10px;
}
.hh {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
}
.yy {
  padding: 25px 20px 20px 0;
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e1e1e1;
}
.lop {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.add {
  min-height: 90vh;
  Padding-top: 74px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  margin: 0 15px 0 15px;
  border: none;
  cursor: pointer;
  width: 150px;
  opacity: 0.9;
}
button:hover {
  opacity:1;
}
</style>
