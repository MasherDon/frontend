<template>
  <div class="profile">
    <div class="img">
      <div class="go">
        <div class="gg"><img :src="prof['image']" id="img" alt="avatar"></div>
        <h3>{{ prof['username'] }}</h3>
        <h3> rights: {{ sos[prof['rights']] }}</h3>
      </div>
      <div class="toro">
        <i class="fa-quote-left"></i> <div class="bio">
          <div v-html="this.filt(prof['bio'])" class="text"/>
        </div> <i id="lo" class="fa-quote-right"></i>
      </div>
    </div>
    <div class="for">
      <div class="bot">
        <div class="str">
          <div @click="this.gog()" class="b" :style="isSta?jprd:''"><button type="button">Понравилось</button></div>
          <div @click="this.artsf()" class="b" :style="isLike?jprd:''"><button type="button">Статьи</button></div>
        </div>
        <div class="per">
          <div><i @click="set()" class="fa-user-plus" v-if="isAdd"></i></div>
          <div><i @click="del()" class="fa-user-times" v-if="isDel"></i></div>
        </div>
      </div>
      <div>
        <div v-if="isLike">
          <div class="artic" v-for="(article, index) in this.articles.val" :key="index">
            <div class="art" v-if="article">
              <div class="op">
                <div class="op" @click="$router.push(`/profile/${article['author']['username']}`)">
                  <img class="id" :src="article['author']['image'] " alt="avatar">
                  <div style="cursor: pointer">
                    <h4>{{ article['author']['username'] }}</h4>
                    <b>{{ article['updateAt'] }}</b>
                  </div>
                </div>
                <div v-if="this.yot(article)" style="cursor: pointer">
                  <div v-if="!article['favorited']">{{article['favoritesCount']}}  <i @click="this.sets(article)" style="color:#c0adad" class="fa-thumbs-up"></i></div>
                  <div v-if="article['favorited']">{{article['favoritesCount']}}  <i @click="this.dels(article)" style="color:#842d2d" class="fa-thumbs-up"></i></div>
                </div>
              </div>
              <div style="cursor: pointer" @click="$router.push(`/article/${article['slug']}`)">
                <h3>{{ article['title'] }}</h3>
                <b>{{ article['description'] }}</b>
              </div>
              <div class="hh" style="cursor: pointer">
                <ul class="uu" v-for="(tag, index) in article['tagList']" :key="index">
                  <li v-if="tag"><div class="pp" @click="$router.push(`/articles/${tag}`)">{{ tag }}</div></li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="this.articles.val.length%5===0&&this.articles.val.length!==0" class="add"><button type="button" @click="this.doro()">Еще?</button></div>
        </div>
        <div v-if="isSta">
          <div class="artic" v-for="(article, index) in this.fead.val" :key="index">
            <div class="art" v-if="article">
              <div class="op">
                <div class="op" @click="$router.push(`/profile/${article['author']['username']}`)">
                  <img class="id" :src="article['author']['image'] " alt="avatar">
                  <div style="cursor: pointer">
                    <h4>{{ article['author']['username'] }}</h4>
                    <b>{{ article['updateAt'] }}</b>
                  </div>
                </div>
                <div v-if="this.yot(article)" style="cursor: pointer">
                  <div v-if="!article['favorited']">{{article['favoritesCount']}}  <i @click="this.sets(article)" style="color:#c0adad" class="fa-thumbs-up"></i></div>
                  <div v-if="article['favorited']">{{article['favoritesCount']}}  <i @click="this.dels(article)" style="color:#842d2d" class="fa-thumbs-up"></i></div>
                </div>
              </div>
              <div style="cursor: pointer" @click="$router.push(`/article/${article['slug']}`)">
                <h3>{{ article['title'] }}</h3>
                <b>{{ article['description'] }}</b>
              </div>
              <div class="hh" style="cursor: pointer">
                <ul class="uu" v-for="(tag, index) in article['tagList']" :key="index">
                  <li v-if="tag"><div class="pp" @click="$router.push(`/articles/${tag}`)">{{ tag }}</div></li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="this.fead.val.length%5===0&&this.fead.val.length!==0" class="add"><button type="button" @click="this.dono()">Еще?</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {marked} from "marked";
export default {
  name: "profileMy",
  beforeMount() {
    this.signUp()
    this.pro()
  },
  filters: {
    marked,
  },
  data() {
    return {
      jprd: 'border-bottom: 2px solid #690000;',
      like: null,
      isSta: false,
      isLike: false,
      prof: null,
      isAdd: false,
      isDel: false,
      put: null,
      x: 0,
      articles: {
        val: [],
        offset: 0,
        limit: 5,
      },
      sos: ['root', 'admin', 'user', 'user(ban)', 'ban'],
      fead: {
        val: [],
        offset: 0,
        limit: 5,
      },
      favorited: '',
      author: '',
    }
  },
  methods: {
    yot(article) {
      return this.$store.getters['user/getUser']['username'] !== article['author']['username']
    },
    async getFead() {
      this.favorited=this.$route.params.username
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+
            `/article?offset=${this.fead.offset}&limit=${this.fead.limit}&favorited=${this.favorited}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.put.ok === true) {
          this.put = (await this.put.json())['articles']
          for (this.x = 0; this.x < this.put.length; this.x++) {
            this.fead.val.push(this.put[this.x])
          }
        }
        if (this.put.status === 422) this.errors = (await this.put.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async sets(article) {
      try {
        this.like = await fetch(this.$store.getters['site/getSettings']['ip']+'/article/'+article['slug']+'/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.like.ok === true) {
          article['favorited'] = true
          article['favoritesCount']++
        }
        if (this.like.status === 422) this.errors = (await this.like.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async dels(article) {
      try {
        this.like = await fetch(this.$store.getters['site/getSettings']['ip']+'/article/'+article['slug']+'/favorite', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.like.ok === true) {
          article['favorited'] = false
          article['favoritesCount']--
        }
        if (this.like.status === 422) this.errors = (await this.like.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async getArticle() {
      this.author=this.$route.params.username
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+
            `/article?offset=${this.articles.offset}&limit=${this.articles.limit}&author=${this.author}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.put.ok === true) {
          this.put = (await this.put.json())['articles']
          for (this.x = 0; this.x < this.put.length; this.x++) {
            this.articles.val.push(this.put[this.x])
          }
        }
        if (this.put.status === 422) this.errors = (await this.put.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    gog() {
      this.isSta=true
      this.isLike=false;
      this.fead = {
        val: [],
        offset: 0,
        limit: 5,
      }
      this.getFead()
    },
    artsf() {
      this.isLike=true;
      this.isSta=false;
      this.articles = {
        val: [],
        offset: 0,
        limit: 5,
      }
      this.getArticle()
    },
    doro() {
      this.articles.offset = this.articles.offset + 5
      this.getArticle()
    },
    dono() {
      this.fead.offset = this.fead.offset + 5
      this.getFead()
    },
    pro() {
      if (this.$store.getters['user/getUser']) {
        if (this.$store.getters['user/getUser']['username'] !== this.$route.params.username) {
          if(this.prof['fallowing']) {
            this.isDel = true
            this.isAdd = false
          } else {
            this.isAdd = true
            this.isDel = false
          }
        }
      }
    },
    filt(text) {
      return marked(text)
    },
    async signUp() {
      try {
        this.prof = await fetch(this.$store.getters['site/getSettings']['ip']+'/profile/'+this.$route.params.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.prof.ok === true) {
          this.prof = (await this.prof.json())['profile'];
        }
        if (this.prof.status === 422) this.errors = (await this.prof.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async set() {
      try {
        this.like = await fetch(this.$store.getters['site/getSettings']['ip']+'/profile/'+this.$route.params.username+'/follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.like.ok === true) {
          this.isAdd = false
          this.isDel = true
        }
        if (this.like.status === 422) this.errors = (await this.like.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async del() {
      try {
        this.like = await fetch(this.$store.getters['site/getSettings']['ip']+'/profile/'+this.$route.params.username+'/follow', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.like.ok === true) {
          this.isAdd = true
          this.isDel = false
        }
        if (this.like.status === 422) this.errors = (await this.like.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
  },
}
</script>

<style scoped>
.artic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px 0 0 0;
}
.art {
  width: 50%;
  padding: 15px;
  margin: 5px;
  background: #e8e8e8;
  border-radius: 15px;
}
.op {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0 10px 0;
}
.id {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 15px 0 0;
  cursor: pointer;
}
h4 {
  margin: 5px 0 15px 0;
}
h3 {
  margin: 5px 0 15px 0;
}
.b {
  margin: 0 15px 0 15px;
}
.hh {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
}
ul.uu li {
  display: inline;
  list-style-type: none;
}
ul.uu {
  margin: 5px 0 0 0;
  padding: 5px 0 0 0;
}
.pp {
  background: #cccccc;
  border-radius: 15px;
  min-width: 50px;
  padding: 5px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
}
button {
  border: none;
  background: #e5bfbf;
  font-size: 20px;
  cursor: pointer;
  margin: 0 25px 0 25px;
}
.bot {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0 15px 0;
  background: #e5bfbf;
  height: 35px;
}
i {
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 20px;
  color: #842d2d;
}
#lo {
  position: relative;
  top: 160px;
}
.str {
  display: flex;
  flex-direction: row;
}
.toro {
  display: flex;
  flex-direction: row;
}
.text {
  text-align: justify;
  font-size: 16px;
  margin-top: 0.5em;
  margin-bottom: 1em;
  line-height: 1.5;
}
.bio {
  min-width: 250px;
  max-width: 400px;
  min-height: 150px;
  max-height: 250px;
  width: auto;
  height: auto;
  background: #e7e0e0;
  border-radius: 5%;
  padding: 15px;
}
.profile {
  min-height: 90vh;
  Padding-top: 74px;
  display: flex;
  flex-direction: column;
}
.img {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background: #e0d6d6;
}
.go {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0 30px 0;
}
.per:hover {
  cursor: pointer;
}
.for {
  border-top: 3px solid #d7c9c9;
}
#img {
  border-radius: 50%;
}
</style>
