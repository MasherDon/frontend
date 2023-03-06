<template>
  <div class="articles">
    <div class="for">
      <div class="bot">
        <div class="str">
          <div @click="this.gog()" class="b" :style="isSta?jprd:''"><button type="button">Лента</button></div>
          <div @click="this.artsf()" class="b" :style="isLike?jprd:''"><button type="button">Все статьи</button></div>
          <div :style="jprd"><button type="button" v-if="istag">#{{ this.tag }}</button></div>
        </div>
      </div>
      <div class="tag">
        <div class="top"><b>Топ 10</b></div>
        <div class="li" v-for="(tag, index) in this.tags" :key="index">
          <div @click="this.ipko(tag)" class="jj" style="cursor: pointer">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLike || istag">
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
              <li v-if="tag"><div class="pp" @click="this.ipko(tag)">{{ tag }}</div></li>
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
              <li v-if="tag"><div class="pp" @click="this.ipko(tag)">{{ tag }}</div></li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="this.fead.val.length%5===0&&this.fead.val.length!==0" class="add"><button type="button" @click="this.dono()">Еще?</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "articlesMy",
  beforeMount() {
    this.getTag()
    this.korpo()
  },
  data() {
    return {
      jprd: 'border-bottom: 2px solid #690000;',
      like: null,
      isSta: true,
      isLike: false,
      istag: false,
      tag: '',
      tags: null,
      put: null,
      x: 0,
      articles: {
        val: [],
        offset: 0,
        limit: 5,
      },
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
    gog() {
      this.isSta=true
      this.isLike=false;
      this.istag=false;
      this.tag='';
      this.fead = {
        val: [],
        offset: 0,
        limit: 5,
      }
      this.getFead()
    },
    ipko(tag) {
      this.tag=tag
      this.istag=true
      this.isSta=false
      this.isLike=false
      this.articles = {
        val: [],
        offset: 0,
        limit: 5,
      }
      this.getArticle()
    },
    artsf() {
      this.isLike=true;
      this.isSta=false;
      this.istag=false;
      this.tag='';
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
    async getFead() {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+
            `/article/feed?offset=${this.fead.offset}&limit=${this.fead.limit}`,{
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
    async getArticle() {
      try {
        this.put = await fetch(this.$store.getters['site/getSettings']['ip']+
            `/article?offset=${this.articles.offset}&limit=${this.articles.limit}&tag=${this.tag}&author=${this.author}&favorited=${this.favorited}`,{
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
    async getTag() {
      try {
        this.tags = await fetch(this.$store.getters['site/getSettings']['ip']+`/tag`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        if (this.tags.ok === true) {
          this.tags = (await this.tags.json())['tags'];
        }
        if (this.put.status === 422) this.errors = (await this.put.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    korpo() {
      if (this.$route.params.tag===' ') {
        this.tag = ''
        this.getFead()
      } else {
        this.tag = this.$route.params.tag
        this.getArticle()
        this.isSta = false
        this.isLike = false
      }
      this.istag = this.tag !== ''
    },
  }
}
</script>

<style scoped>
.top {
  position: absolute;
  top: 5px; left: 100px;
  margin: 5px 0 15px 0;
}
.add {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 5px;
}
i {
  font-style: normal;
  font-family: FontAwesome,serif;
  font-size: 25px;
}
h4 {
  margin: 5px 0 15px 0;
}
h3 {
  margin: 5px 0 15px 0;
}
.op {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0 10px 0;
}
.art {
  //min-width: 500px;
  //max-width: 800px;
  width: 50%;
  padding: 15px;
  margin: 5px;
  background: #e8e8e8;
  border-radius: 15px;
}
.id {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 15px 0 0;
  cursor: pointer;
}
.hh {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
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
ul.uu li {
  display: inline;
  list-style-type: none;
}
ul.uu {
  margin: 5px 0 0 0;
  padding: 5px 0 0 0;
}
.artic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px 0 0 0;
}
.jj {
  background: #cccccc;
  border-radius: 15px;
  width: auto;
  min-width: 50px;
  padding: 5px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
}
.tag {
  background: #ece5e5;
  border-radius: 15px;
  position: absolute;
  top: 170px; left: 20px;
  display: flex;
  flex-flow: row wrap;
  min-width: 200px;
  max-width: 300px;
  width: auto;
  min-height: 250px;
  height: auto;
  padding: 40px 5px 0 5px;
}
button {
  border: none;
  background: #e5bfbf;
  font-size: 20px;
  cursor: pointer;
  margin: 0 25px 0 25px;
}
.articles {
  min-height: 90vh;
  Padding-top: 74px;
  display: flex;
  flex-direction: column;
}
.for {
  border-top: 3px solid #d7c9c9;
}
.bot {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 0 15px 0;
  background: #e5bfbf;
  height: 35px;
}
.str {
  display: flex;
  flex-direction: row;
}
</style>
