<template>
  <div class="modal">
    <form class="modal-content" onsubmit="return false">
      <div class="container">
        <div id="hop">
          <h1>Настройки</h1>
          <span @click="$emit('close')" class="close" title="Закрть"><i id="X"></i></span>
        </div>
        <ul>
          <li v-for="(error, index) in this.errors" :key="index">
            {{ index }} - {{ typeof(error) === "object"? error[0].split('"')[0] : error }}
          </li>
        </ul>
        <hr>
        <label for="image" ><b >Image</b></label>
        <input maxlength="60" @change="this.to" type="text" v-model.trim="form.image" placeholder="Введите url image" id="image" required/>

        <label for="email"><b>Email</b></label>
        <input maxlength="30" type="email" v-model.trim="form.email" placeholder="Введите new email" id="email" required/>

        <label for="psw"><b>Password</b></label>
        <input maxlength="30" type="password" v-model.trim="form.password" placeholder="Введите new password" id="psw"/>

        <label for="bio"><b>Bio</b></label>
        <textarea maxlength="1000" v-model="form.bio" placeholder="О вас..." id="bio" cols="30" rows="6"/>

        <div class="clearfix">
          <button @click="logout" type="button" class="cancelbtn"><i id="logy"></i>Выход</button>
          <button @click="set" type="button" class="signup"><i id="hh"></i>Востановить</button>
          <button @click="update" type="submit" class="signup"><i id="upd"></i>Обновить</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SettingUser",
  mounted() {
    this.getForm()
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      getSetting: 'site/getSettings'
    }),
  },
  data() {
    return {
      form: {
        email: '',
        image: '',
        bio: '',
        password: '',
      },
      errors: null,
      user: null,
      errorImage: false,
      toto: true,
    }
  },
  methods: {
    getForm() {
      this.form.email = this.getUser['email'];
      this.form.image = this.getUser['image'];
      this.form.bio = this.getUser['bio'];
      return true
    },
    async logout() {
      localStorage.removeItem('Authorization')
      this.$store.dispatch('user/deleteUser')
      this.$emit('close')
      this.$router.go(0);
    },
    set() {
      this.form.email = this.getUser['email']
      this.form.image = this.getUser['image']
      this.form.bio = this.getUser['bio']
    },
    to() {
        this.errorImage = new Image()
        this.errorImage.src = this.form.image
        this.errorImage.onerror = () => {
          this.toto = false
        }
        this.errorImage.onload = () => {
          this.toto = true
        }
    },
    async update() {
      if (this.form.password === '') this.form.password=undefined
      if (this.form.bio === '') this.form.bio=undefined
      if (!this.toto && this.form.image[this.form.image.length - 1] !== '?') this.form.image += '?'
      try {
        this.user = await fetch(this.$store.getters['site/getSettings']['ip']+'/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
          body: JSON.stringify({
            'user': {
              'image': this.form.image,
              'bio': this.form.bio,
              'email': this.form.email,
              'password': this.form.password,
            }
          })
        });
        if (this.user.ok === true) {
          this.user = (await this.user.json())['user'];
          localStorage.removeItem('Authorization');
          localStorage.setItem('Authorization', `Token ${this.user['token'].split('"')[0]}`)
          this.$store.dispatch('user/setUser', this.user);
          this.$emit('close')
          this.$router.go(0);
        }
        if (this.user.status === 422) {
          this.errors = (await this.user.json())['errors']
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
#hop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
h1{
  margin-bottom: 5px;
  padding-left: 25px;
}
#upd:before {
  font-style: normal;
  content: "\f0c7";
  font-family: FontAwesome;
  color: #ffffff;
  margin-right: 10px;
}
#hh:before {
  font-style: normal;
  content: "\f021";
  font-family: FontAwesome;
  color: #ffffff;
  margin-right: 10px;
}
#logy:before {
  font-style: normal;
  content: "\f08b";
  font-family: FontAwesome;
  color: #ffffff;
  margin-right: 10px;
}
#X:before {
  font-style: normal;
  content: "\f18e";
  font-family: FontAwesome;
  color: #030303;
  margin-right: 10px;
}
#X:hover {
  cursor: pointer;
  fill: #cc5d5d;
}
li:before {
  content: "\f071";
  font-family: FontAwesome;
  color: #af4848;
  margin-right: 10px;
}
li {
  list-style-type: none;
}
ul {
  margin-top: 0;
}
textarea {
  resize: none;
}
* {box-sizing: border-box}
input[type=email], input[type=password], input[type=text], textarea {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  margin: 5px 0 20px 0;
  border: none;
  background: #f1f1f1;
  font-size: 14px;
}
input[type=email]:focus, input[type=text], input[type=password], textarea:focus {
  background-color: #ddd;
  outline: none;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 9px;
  border: none;
  cursor: pointer;
  width: 30%;
  opacity: 0.9;
}
.signup {
  float: right;
}
button:hover {
  opacity:1;
}
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
  float: left;
  width: 30%;
}
.container {
  padding: 5px 16px 16px 16px;
}
.modal {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(150, 150, 150, 80%);
  padding-top: 0;
  z-index: 2;
}
.modal-content {
  background-color: #fefefe;
  margin: 3pc auto 15% auto;
  border: thick double #7c3232;
  height: auto;
  border-radius: 15px;
  width: 600px;
}
hr {
  border: 1px solid #f1f1f1;
}
.close {
  position: relative;
  margin: 15px 15px 0 0;
  font-size: 35px;
  font-weight: bold;
}
.clearfix:after {
  content: "";
  clear: both;
  display: table;
}
@media screen and (max-width: 100px) {
  .cancelbtn {
    width: 100%;
  }
}
</style>
