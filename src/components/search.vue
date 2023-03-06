<template>
  <div id="search">
    <input v-model.trim="search" id="imp" type="search" title="Поиск" placeholder="Поиск по...">
  </div>
  <div class="search" v-if="issearch && this.tost()">
    <div class="user" v-for="(test, index) in this.post[0]['user']" :key="index">
      <div class="col" @click="$router.push(`/profile/${test['username']}`);search=''">
        <div class="li">
          <div class="to">
            {{test['username']}}
          </div>
          <div class="to" v-if="test['bio'].indexOf(search)!==-1">
            {{ this.sub(test['bio']) }}
          </div>
        </div>
        <div class="li">тип: user</div>
      </div>
    </div>
    <div class="user" v-for="(test, index) in this.post[1]['tag']" :key="index">
      <div class="col" @click="$router.push(`/articles/${test['name']}`);search=''">
        <div class="li">
          <div class="to">
            {{test['name']}}
          </div>
          <div class="to">
            {{ test['numb'] }}
          </div>
        </div>
        <div class="li">тип: tag</div>
      </div>
    </div>
    <div class="user" v-for="(test, index) in this.post[2]['article']" :key="index">
      <div class="col" @click="$router.push(`/article/${test['slog']}`);search=''">
        <div class="li">
          <div class="to">
            {{test['title']}}
          </div>
          <div class="to">
            {{test['description']}}
          </div>
          <div class="to" v-if="test['body'].indexOf(search)!==-1">
            {{this.sub(test['body'])}}
          </div>
        </div>
        <div class="li">тип: article</div>
      </div>
    </div>
    <div class="user" v-for="(test, index) in this.post[3]['comment']" :key="index">
      <div class="col">
        <div class="li">
          <div class="to" v-if="test['body'].indexOf(search)!==-1">
            {{this.sub(test['body'])}}
          </div>
        </div>
        <div class="li">тип: comment</div>
      </div>
    </div>
    <div class="user" v-for="(test, index) in this.post[4]['reserve']" :key="index">
      <div class="col" @click="$router.push(`/reserve/${test['Slog']}`);search=''">
        <div class="li">
          <div class="to">
            {{test['Slog']}}
          </div>
          <div class="to">
            {{test['name']}}
          </div>
        </div>
        <div class="li">тип: reserve</div>
      </div>
    </div>
    <div class="user" v-for="(test, index) in this.post[5]['animal']" :key="index">
      <div class="col" @click="$router.push(`/animal/${test['Slog']}`);search=''">
        <div class="li">
          <div class="to">
            {{test['Slog']}}
          </div>
          <div class="to">
            {{test['name']}}
          </div>
        </div>
        <div class="li">тип: animal</div>
      </div>
    </div>
    <div class="user" v-for="(test, index) in this.post[6]['region']" :key="index">
      <div class="col" @click="$router.push(`/region/${test['Slog']}`);search=''">
        <div class="li">
          <div class="to">
            {{test['Slog']}}
          </div>
          <div class="to">
            {{test['name']}}
          </div>
        </div>
        <div class="li">тип: region</div>
      </div>
    </div>
    <div class="user" v-for="(test, index) in this.post[7]['polygon']" :key="index">
      <div class="col" @click="$router.push(`/reserve/${test['Slog']}`);search=''">
        <div class="li">
          <div class="to">
            {{test['Slog']}}
          </div>
          <div class="to">
            {{test['name']}}
          </div>
        </div>
        <div class="li">тип: polygon</div>
      </div>
    </div>
    <div class="user" v-for="(test, index) in this.post[8]['marker']" :key="index">
      <div class="col" @click="$router.push(`/region/${test['Slog']}`);search=''">
        <div class="li">
          <div class="to">
            {{test['Slog']}}
          </div>
          <div class="to">
            {{test['name']}}
          </div>
        </div>
        <div class="li">тип: marker</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchMy",
  data() {
    return {
      post: null,
      issearch: false,
      search: '',
      set: null,
      x: 0,
    }
  },
  beforeMount() {
  },
  watch: {
    search: function () {
      if (this.search.length > 1) {
        this.issearch = true
        clearTimeout(this.set)
        this.set = setTimeout(()=> this.sear(), 1500)
      } else {
        this.issearch = false
      }
    },
  },
  methods: {
    tost() {
      return this.post[0]['user'].length>0 || this.post[1]['tag'].length>0 || this.post[2]['article'].length>0
      || this.post[3]['comment'].length>0 || this.post[4]['reserve'].length>0 || this.post[5]['animal'].length>0
      || this.post[6]['region'].length>0 || this.post[7]['polygon'].length>0 || this.post[8]['marker'].length>0
    },
    sub(test) {
      this.x = test.indexOf(this.search)
      return test.substr(this.x-8, this.x+8)
    },
    async sear() {
      try {
        this.post = await fetch(this.$store.getters['site/getSettings']['ip']+'/search/'+this.search, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (this.post.ok === true) {
          this.post = (await this.post.json())
          console.log(this.post)
        }
        if (this.post.status === 422) this.errors = (await this.post.json())['search']
      } catch (error) {
        console.log(this.errors)
      }
    },
  },
}
</script>

<style scoped>
.to {
  display: flex;
  flex-direction: row;
  margin: 0 10px 0 10px;
}
.li {
  display: flex;
  flex-direction: row;
  margin: 0 15px 0 15px;
}
.col {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 5px 0;
  cursor: pointer;
  background: #e3e3e3;
  border: 2px solid #690000;
  min-height: 40px;
}
.search {
  overflow-y: auto;
  max-height: 88vh;
  position: fixed;
  background-color: rgba(150, 150, 150, 30%);
  border-radius: 15px;
  padding: 10px;
  width: 50%;
  height: auto;
  top: 80px;
  left: 25%;
  font-family: 'Roboto', sans-serif;
  z-index: 1;
}
#imp {
  height: 3pc;
  width: 33%;
  padding-left: 1pc;
  border-radius: 42px;
  border: 4px solid #9a2f2f;
  background: #e7e7e7;
  outline: none;
  position: relative;
  transition: .3s linear;
}
#imp:focus {
  border: 4px solid #690000;
}
#search {
  display: block;
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  margin: 15px 33% 15px 33%;;
}
</style>
