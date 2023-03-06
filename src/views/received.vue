<template>
  <div id="T">
    <form class="modal-content" onsubmit="return false">
      <div class="container">
        <h1>Изменить password</h1>
        <b>{{ this.$route.params.email }}</b>
        <ul>
          <li v-for="(error, index) in this.errors" :key="index">
            {{ index }} - {{ typeof(error) === "object"? error[0].split('"')[0] : error }}
          </li>
        </ul>
        <hr>
        <label for="psw"><b>Password</b></label>
        <input maxlength="30" type="password" v-model.trim="password" placeholder="Введите новый password" name="psw" required>
        <div class="clearfix">
          <button type="submit" @click="this.valid()" class="signup">Подтвердить</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "receivedPas",
  data() {
    return {
      user: null,
      errors: null,
      password: '',
    }
  },
  methods: {
    async valid() {
      this.errors = null;
      try {
        this.user = await fetch(this.$store.getters['site/getSettings']['ip']+`/user/${this.$route.params.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'user': {
              'password': this.password,
              'code': this.$route.params.cod,
            }
          })
        });
        if (this.user.ok === true) {
          this.user = (await this.user.json())['user'];
          localStorage.removeItem('Authorization');
          localStorage.setItem('Authorization', `Token ${this.user['token'].split('"')[0]}`)
          this.$store.dispatch('user/setUser', this.user);
          await this.$router.push('/')
        }
        if (this.user.status === 422) this.errors = (await this.user.json())['errors']
      } catch (error) {
        console.log(this.errors)
      }
    },
  },
}
</script>

<style scoped>
* {box-sizing: border-box}
li:before {
  content: "\f071";
  font-family: FontAwesome;
  color: #af4848;
  margin-right: 10px;
}
li {
  list-style-type: none;
}
#T {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
input[type=password] {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  font-size: 14px;
}
input[type=password]:focus {
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
button:hover {
  opacity:1;
}
.container {
  padding: 10px 16px 16px 16px;
}
.modal-content {
  background-color: #fefefe;
  margin: 10% auto 25% auto;
  border: thick double #7c3232;
  height: auto;
  border-radius: 15px;
  width: 600px;
}
hr {
  border: 2px solid #f1f1f1;
  margin-bottom: 25px;
}
.clearfix:after {
  content: "";
  clear: both;
  display: table;
}
</style>
