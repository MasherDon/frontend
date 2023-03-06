<template>
  <div class="modal">
    <form class="modal-content" onsubmit="return false">
      <div class="container">
        <div id="hop">
          <h1>{{ mode? Up : In }}</h1>
          <span @click="$emit('close')" class="close" title="Закрыть"><i id="X"></i></span>
        </div>
        <ul>
          <li v-for="(error, index) in this.errors" :key="index">
            {{ index }} - {{ typeof(error) === "object"? error[0].split('"')[0] : error }}
          </li>
        </ul>
        <h3 v-if="this.forgot" @click="fogo" title="Востаноить password">Забыли password?</h3>
        <p v-if="this.restore" title="Restore password">Введите код подтверждения пришедший на {{form.email}} и ваш новый password</p>
        <hr>
        <label for="name" v-if="mode"><b v-if="mode">Username</b></label>
        <input maxlength="30" type="text" v-model.trim="form.username" placeholder="Введите username" id="name" required v-if="mode">

        <label for="email" v-if="!restore"><b>Email</b></label>
        <input maxlength="30" type="email" v-if="!restore" v-model.trim="form.email" placeholder="Введите email" id="email" required>

        <label for="code"  v-if="restore"><b>Recovery code</b></label>
        <input maxlength="6" type="text" v-if="restore" v-model.trim="form.code" placeholder="Введите code" id="code" required>

        <label for="psw"><b>Password</b></label>
        <input maxlength="30" type="password" v-model.trim="form.password" placeholder="Введите password" id="psw" required>

        <div class="clearfix">
          <button type="button" @click="$emit('close')" class="cancelbtn">Закрыть</button>
          <button type="button" id="mod" @click="signMode" class="signup">{{ mode? In : Up }}</button>
          <button type="submit" @click="formSubmit" class="signup">Подтвердить</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'modalLogin',
  data() {
    return {
      mode: false,
      forgot: false,
      restore: false,
      Up: 'Регистрация',
      In: 'Вход',
      form: {
        username: '',
        email: '',
        password: '',
        code: '',
      },
      errors: null,
    }
  },
  methods: {
    fogo(){
      this.restore=true
      this.forgot=false
      this.errors=false
      this.reg()
    },
    signMode() {
      this.mode=!this.mode
      this.forgot=false
      this.restore=false
      this.errors=null
    },
    formSubmit() {
      if (this.mode) {
        this.signUp()
      } else {
        if (this.restore) {
          this.valid()
        } else {
          this.signIn()
        }
      }
    },
    async valid() {
      try {
        this.user = await fetch(this.$store.getters['site/getSettings']['ip']+`/user/${this.form.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'user': {
              'password': this.form.password,
              'code': this.form.code,
            }
          })
        });
        if (this.user.ok === true) {
          this.user = (await this.user.json())['user'];
          localStorage.removeItem('Authorization');
          localStorage.setItem('Authorization', `Token ${this.user['token'].split('"')[0]}`)
          this.$store.dispatch('user/setUser',  this.user);
          this.$emit('close')
          this.$router.go(0);
        }
        if (this.user.status === 422) this.errors = (await this.user.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
    async reg() {
      try {
        this.user = await fetch(this.$store.getters['site/getSettings']['ip']+`/users/${this.form.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (this.user.status === 422) {
          this.errors = (await this.user.json())['errors']
        }
      } catch (error) {
        console.log(error)
      }
    },
    async signIn() {
      try {
        this.user = await fetch(this.$store.getters['site/getSettings']['ip']+'/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'user': {
              'email': this.form.email,
              'password': this.form.password,
            }
          })
        });
        if (this.user.ok === true) {
          this.user = (await this.user.json())['user'];
          localStorage.removeItem('Authorization');
          localStorage.setItem('Authorization', `Token ${this.user['token'].split('"')[0]}`)
          this.$store.dispatch('user/setUser', this.user['user']);
          this.$emit('close')
          this.$router.go(0);
        }
        if (this.user.status === 422) {
          this.errors = (await this.user.json())['errors']
          if(!this.errors['email']) this.forgot = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    async signUp() {
      try {
        this.user = await fetch(this.$store.getters['site/getSettings']['ip']+'/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'user': {
              'username': this.form.username,
              'email': this.form.email,
              'password': this.form.password,
            }
          })
        });
        if (this.user.ok === true) {
          this.user = (await this.user.json())['user'];
          localStorage.removeItem('Authorization');
          localStorage.setItem('Authorization', `Token ${this.user['token'].split('"')[0]}`)
          this.$store.dispatch('user/setUser', this.user['user']);
          this.$emit('close')
          this.$router.go(0);
        }
        if (this.user.status === 422) this.errors = (await this.user.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
  }
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
#X:before {
  font-style: normal;
  content: "\f18e";
  font-family: FontAwesome;
  color: #030303;
  margin-right: 10px;
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
* {box-sizing: border-box}
input[type=email], input[type=password], input[type=text] {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  font-size: 14px;
}
input[type=email]:focus, input[type=text], input[type=password]:focus {
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
#mod {
  background-color: rgba(38, 67, 105, 100%);
}
button:hover {
  opacity:1;
}
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
  width: 30%;
}
.container {
  padding: 10px 16px 16px 16px;
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(150, 150, 150, 80%);
  padding-top: 30px;
}
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: thick double #7c3232;
  height: auto;
  border-radius: 15px;
  width: 600px;
}
hr {
  border: 2px solid #f1f1f1;
  margin-bottom: 25px;
}
.close {
  position: relative;
  margin: 15px 15px 0 0;
  font-size: 35px;
  font-weight: bold;
}
.close:hover, .close:focus {
  color: #f44336;
  cursor: pointer;
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
h3:hover {
  cursor: pointer;
}
</style>
