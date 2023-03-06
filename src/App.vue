<template>
  <MyHeader/>
  <router-view/>
  <myHuter/>
</template>

<script>
import MyHeader from './components/MyHeader'
import {mapActions, mapGetters} from "vuex";
import myHuter from "@/components/huter";
export default {
  name: "App",
  components: {
    MyHeader,
    myHuter,
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      getSetting: 'site/getSettings'
    }),
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser',
    }),
  },
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  background: #ececec;
}
</style>
