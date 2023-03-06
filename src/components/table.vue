<template>
  <div class="widget">
    <h3 class="widget-title"><i id="title"></i>Маршруты</h3>
    <ul class="widget-list">
      <li @click="$router.push('/')">Главная карта</li>
      <li @click="$router.push('/regions')">Регионы</li>
      <li @click="$router.push('/reserves')">Заповеднки</li>
      <li @click="$router.push('/animals')">
        <i class="fa-leaf" v-if="hos===0"></i><i class="fa-paw" v-if="hos===1"></i><i class="fa-tree" v-if="hos===2"></i>
        Организмы</li>
      <li @click="$router.push('/articles/ ')">Статьи</li>
      <li v-if="this.getUser" @click="$router.push('/article/add/ ')">Новая статья</li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "tableRou",
  beforeMount() {
    this.jof()
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  data() {
    return {
      hos: 0,
    }
  },
  methods: {
    jof() {
      this.hos = Math.floor(Math.random() * 3)
    }
  }
}
</script>

<style scoped>
* {box-sizing: border-box; margin: 0;}
.widget {
  position: fixed;
  width: 300px;
  height: auto;
  top: 74px;
  right: 0;
  padding: 20px;
  border: 5px solid #e76262;
  background: #fff;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  z-index: 1;
}
img {
  height: 300px;
  width: auto;
}
.widget h3 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: normal;
  color: #454d4d;
}
.widget ul {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 250px;
}
.widget li {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 15px;
  margin-bottom: 15px;
}
.widget li:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.widget a {
  text-decoration: none;
  color:  #616a6b;
  display: inline-block;
}
.widget li:before {
  font-family: FontAwesome,serif;
  font-size: 20px;
  vertical-align:bottom;
  color: #982525;
  margin-right: 14px;
}
i {
  font-size: 25px;
  color: #982525;
  font-family: FontAwesome,serif;
  font-style: normal;
  margin: 0 8px 0 0;
}
li:hover {
  color: #ff0000;
  cursor: pointer;
}
#title:before {
  font-size: 25px;
  content:"\f277";
}
.widget li:nth-child(1):before {content:"\f279";}
.widget li:nth-child(2):before {content:"\f08d";}
.widget li:nth-child(3):before {content:"\f041";}
.widget li:nth-child(5):before {content:"\f1ea";}
.widget li:nth-child(6):before {content:"\f040";}
</style>
