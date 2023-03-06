<template>
  <div class="header">
    <div id="sos" @click="$router.push('/')" title="Главная страниа">
      <img id="im" src="../assets/images/1.png" alt="Логотип">
      <i id="us">Green Book</i>
    </div>
    <search/>
    <div id="user" v-if="this.login()">
      <i id="gl" @click="$router.push('/add')" title="Добавить" v-if="this.isAdmi()"></i>
      <i id="teb" @click="this.tablet()" title="Категории"></i>
      <i id="set" @click="isSetting=true; this.table=false" title="Настройки"></i>
      <i id="imUser" @click="$router.push(`/profile/${getUser['username']}`)" :title="this.getUser['username']"></i>
    </div>
    <div id="login" v-else>
      <i id="gog" @click="this.tablet()" title="Категории"></i>
      <i id="uy" @click="this.isLogin=true; this.table=false" title="Вход или регистраия"></i>
    </div>
  </div>
  <modalLogin
      v-if="this.isLogin"
      @close="this.isLogin=false"
  />
  <SettingUser
      v-if="this.isSetting"
      @close="this.isSetting=false"
  />
  <tableRou
      v-if="this.table"
      @close="this.table=false"
  />
</template>

<script>
import {mapGetters} from 'vuex'
import modalLogin from '../components/modalLogin';
import SettingUser from '../components/Setting';
import tableRou from '../components/table';
import search from '../components/search'
export default {
  name: 'MyHeader',
  components: {
    modalLogin,
    SettingUser,
    tableRou,
    search
  },
  data() {
    return {
      isLogin: false,
      isSetting: false,
      table: false,
      token: '',
      user: null,
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  methods: {
    isAdmi() {
       return this.getUser['rights'] < 2;
    },
    tablet() {
      this.table =!this.table
    },
    login() {
      if (localStorage.getItem('Authorization'))
      {
        this.token = localStorage.getItem('Authorization');
        this.sign();
        return !!this.getUser;
      } else {
        return false;
      }
    },
    async sign() {
      try {
        this.user = await fetch(this.$store.getters['site/getSettings']['ip']+'/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.token,
          },
        });
        if (this.user.ok === true) {
          this.$store.dispatch('user/setUser', (await this.user.json())['user']);
        }
        if (this.user.status === 401) localStorage.removeItem('Authorization');
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
#gl:before {
  font-size: 2pc;
  font-style: normal;
  content: "\f067";
  font-family: FontAwesome;
  color: #ffffff;
  align-self: center;
  line-height: 80px;
}
#teb:before {
  font-size: 2pc;
  font-style: normal;
  content: "\f0c9";
  font-family: FontAwesome;
  color: #ffffff;
  margin: 0 1pc 0 1pc;
  align-self: center;
  line-height: 80px;
}
#gog:before {
  font-size: 2pc;
  font-style: normal;
  content: "\f0c9";
  font-family: FontAwesome;
  color: #ffffff;
  margin: 0 7px 0 0;
  align-self: center;
  line-height: 80px;
}
#uy:before {
  font-size: 2pc;
  content: "\f090";
  font-style: normal;
  font-family: FontAwesome;
  color: #ffffff;
  margin: 0 0 0 7px;
  text-align: center;
  line-height: 80px;
}
#sos {
  display: flex;
  flex-direction: row;
  margin: 0 0 0 45px;
}
#us {
  padding: 0 0 0 15px;
  text-align: center;
  font-size: 25px;
  line-height: 70px;
  align-self: center;
  color: #ffffff;
}
#set:before {
  font-size: 2pc;
  font-style: normal;
  content: "\f013";
  font-family: FontAwesome;
  color: #ffffff;
  margin: 0 1pc 0 1px;
  align-self: center;
  line-height: 80px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  background: #842d2d;
  border-bottom: 4px solid #b2b2b2;
  top: 0;
  margin: 0;
  width: 100%;
  height: 70px;
  z-index: 1;
}
#im {
  align-self: center;
  height: 70px;
  width: auto;
}
#sos:hover {
  cursor: pointer;
}
#user {
  display: flex;
  flex-direction: row;
  align-self: center;
  height: 80px;
  width: auto;
  margin: 6px 45px 6px 0;
  background: #FFFFFF00;
  text-align: center;
  font-size: 21px;
  line-height: 90px;
  z-index: 1;
}
#user:hover {
  cursor: pointer;
}
#login {
  display: flex;
  flex-direction: row;
  align-self: center;
  padding-top: 12px;
  margin: 6px 45px 6px 0;
  background: #FFFFFF00;
  text-align: center;
  font-size: 24px;
  line-height: 90px;
  z-index: 1;
}
#login:hover {
  cursor: pointer;
}
#imUser:before {
  font-size: 2pc;
  font-style: normal;
  content: "\f007";
  font-family: FontAwesome;
  color: #ffffff;
  align-self: center;
  line-height: 80px;
}
</style>
