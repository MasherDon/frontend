<template>
  <div class="article">
    <div class="had">
      <h1>{{put['title']}}</h1>
      <div class="aut">
        <img class="id" :src="put['author']['image']" alt="avatar" @click="$router.push(`/profile/${put['author']['username']}`)">
        <div style="cursor: pointer;" @click="$router.push(`/profile/${put['author']['username']}`)">
          <h3>{{ put['author']['username'] }}</h3>
          <b>{{ put['updateAt'] }}</b>
        </div>
        <div class="per">
          <div><i @click="this.set()" class="fa-user-plus" v-if="isAdd"></i></div>
          <div><i @click="this.del()" class="fa-user-times" v-if="isDel"></i></div>
        </div>
        <div class="per">
          <div v-if="isli">{{put['favoritesCount']}}  <i @click="this.sets()" style="color:#c0adad" class="fa-thumbs-up"></i></div>
          <div v-if="isdli">{{put['favoritesCount']}}  <i @click="this.dels()" style="color:#842d2d" class="fa-thumbs-up"></i></div>
        </div>
        <div class="per">
          <div v-if="ismod"><i @click="$router.push(`/article/up/${put['slug']}`)" class="fa-pencil-square"></i></div>
        </div>
        <div class="per">
          <div v-if="ismod"><i @click="this.delart()" class="fa-trash"></i></div>
        </div>
      </div>
    </div>
    <div class="bod">
      <div class="text" v-html="filt(put['body'])"/>
      <div class="hh">
        <ul class="uu" v-for="(tag, index) in this.put['tagList']" :key="index">
          <li v-if="tag" style="cursor: pointer">
            <div class="jj" @click="$router.push(`/articles/${tag}`)">{{ tag }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="hu">
      <form class="newcom">
        <div class="op" onsubmit="return false">
          <textarea cols="80" rows="7" placeholder="Содержание"  v-model="comment" required>
          </textarea>
        </div>
        <div class="au">
          <div class="aut" @click="$router.push(`/profile/${this.fig()}`)">
            <img class="id" :src="this.fi()" alt="avatar">
            <h3>{{ this.fig() }}</h3>
          </div>
          <button class="hot" type="button" @click="this.newcom()">Сохранить</button>
        </div>
      </form>
      <div class="com" v-if="comme">
        <ul class="uu" v-for="(comment, index) in this.comme" :key="index">
          <li>
            <div/>
            <div class="newcom" v-if="comment">
              <div class="op">
                <div class="text" v-html="filt(comment['body'])"/>
              </div>
              <div class="au">
                <div class="aut" @click="$router.push(`/profile/${comment['author']['username']}`)">
                  <img class="id" :src="comment['author']['image']" alt="avatar">
                  <div style="cursor: pointer;">
                    <h3>{{ comment['author']['username'] }}</h3>
                    <b>{{ comment['createAt'] }}</b>
                  </div>
                </div>
                <div class="per" v-if="this.cont(comment['author']['username'])">
                  <i class="fa-trash" @click="this.delcom(index)"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
export default {
  name: "MyArticle",
  beforeMount() {
    this.sign()
  },
  filters: {
    marked,
  },
  data() {
    return {
      isAdd: false,
      isDel: false,
      isli: false,
      isdli: false,
      ismod: false,
      put: null,
      like: null,
      fall: null,
      newco: null,
      comme: [],
      comment: '',
      x: 0,
    }
  },
  methods: {
    cont(gog) {
      return this.$store.getters['user/getUser']['username'] === gog || this.$store.getters['user/getUser']['rights'] < 2
    },
    fig() {
      return this.$store.getters['user/getUser']['username']
    },
    fi() {
      return this.$store.getters['user/getUser']['image']
    },
    filt(text) {
      return marked(text)
    },
    pro() {
      if (this.$store.getters['user/getUser']) {
        if (this.$store.getters['user/getUser']['username'] !== this.put['author']['username']) {
          if(this.put['author']['fallowing']) {
            this.isDel = true
            this.isAdd = false
          } else {
            this.isAdd = true
            this.isDel = false
          }
          if(this.put['favorited']) {
            this.isdli = true
            this.isli = false
          } else {
            this.isli = true
            this.isdli = false
          }
        }
        if (this.$store.getters['user/getUser']['username'] === this.put['author']['username'] || this.$store.getters['user/getUser']['rights'] < 2) {
          this.ismod = true
        }
      }
    },
    async delart() {
      try {
        this.newco = await fetch(this.$store.getters['site/getSettings']['ip']+`/article/${this.put['slug']}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.newco.ok === true) {
          await this.$router.push(`/`)
        }
        if (this.newco.status === 422) this.errors = (await this.newco.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async delcom(index) {
      try {
        this.newco = await fetch(this.$store.getters['site/getSettings']['ip']+`/article/${this.put['slug']}/comments/${index}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.newco.ok === true) {
          this.com()
        }
        if (this.newco.status === 422) this.errors = (await this.newco.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async newcom() {
      try {
        this.newco = await fetch(this.$store.getters['site/getSettings']['ip']+`/article/${this.put['slug']}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
          body: JSON.stringify({
            'comment': {
              'body': this.comment,
            }
          })
        });
        if (this.newco.ok === true) {
          this.comme.push((await this.newco.json())['comment']);
          this.comment = ''
        }
        if (this.newco.status === 422) this.errors = (await this.newco.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async com() {
      try {
        this.comme = await fetch(this.$store.getters['site/getSettings']['ip']+`/article/${this.put['slug']}/comments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.comme.ok === true) {
          this.comme = (await this.comme.json())['comments'];
        }
        if (this.comme.status === 422) this.errors = (await this.comme.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async sign() {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+`/article/${this.$route.params.slug}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.put.ok === true) {
          this.put = (await this.put.json())['article'];
        }
        if (this.put.status === 422) this.errors = (await this.put.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
      this.pro()
      this.com()
    },
    async set() {
      try {
        this.fall = await fetch(this.$store.getters['site/getSettings']['ip']+'/profile/'+this.put['author']['username']+'/follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.fall.ok === true) {
          this.isAdd = false
          this.isDel = true
        }
        if (this.fall.status === 422) this.errors = (await this.fall.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async del() {
      try {
        this.fall = await fetch(this.$store.getters['site/getSettings']['ip']+'/profile/'+this.put['author']['username']+'/follow', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.fall.ok === true) {
          this.isAdd = true
          this.isDel = false
        }
        if (this.fall.status === 422) this.errors = (await this.fall.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async sets() {
      try {
        this.like = await fetch(this.$store.getters['site/getSettings']['ip']+'/article/'+this.put['slug']+'/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.like.ok === true) {
          this.isli = false
          this.isdli = true
          this.put['favoritesCount']++
        }
        if (this.like.status === 422) this.errors = (await this.like.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async dels() {
      try {
        this.like = await fetch(this.$store.getters['site/getSettings']['ip']+'/article/'+this.put['slug']+'/favorite', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.like.ok === true) {
          this.isli = true
          this.isdli = false
          this.put['favoritesCount']--
        }
        if (this.like.status === 422) this.errors = (await this.like.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
  }
}
</script>

<style scoped>
.op {
  width: 700px;
  min-height: 120px;
}
.com {
  display: flex;
  flex-direction: column-reverse;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 9px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
}
button:hover {
  opacity:1;
}
.newcom {
  min-height: 220px;
  border: 1px solid #454d4d;
  border-radius: 5px;
  padding: 13px 43px 13px 13px;
}
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
  border-radius: 15px;
  padding: 15px;
  border: none;
  resize: none;
}
.hu {
  margin: 15px 0 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
.bod {
  min-height: 200px;
  border-bottom: 2px solid #b7c9b7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hh {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
}
.jj {
  background: #cccccc;
  border-radius: 15px;
  padding: 5px;
  margin: 0 10px;
}
ul.uu li {
  display: inline;
  list-style-type: none;
}
ul.uu {
  margin-left: 0;
  padding-left: 0;
}
.per {
  margin: 25px 0 0 40px;
}
.per:hover {
  cursor: pointer;
}
i {
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 30px;
  color: #842d2d;
}
h1 {
  margin: 15px 25px 25px 15px;
}
h3 {
  margin: 10px 0 15px 0;
}
.id {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 15px 0 0;
  cursor: pointer;
}
.aut {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
.au {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.had {
  padding: 25px 0 25px 75px;
  height: 150px;
  background: #e5dada;
  border-bottom: 2px solid #c4b1b1;
}
.article {
  min-height: 90vh;
  Padding-top: 74px;
  display: flex;
  flex-direction: column;
}
</style>
