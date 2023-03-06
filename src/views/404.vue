<template>
  <div class="not-found">
    <h1>404 Not Found</h1>
    <h2>Упс.. Не туда</h2>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
  .not-found {
    Padding-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    color: #9b9b9b;
    z-index: 0;
  }
  h1 {
    color: #ffffff;
    font-size: 70px;
    margin-bottom: 20px;
  }
  h2 {
    color: #ffffff;
    font-size: 40px;
    margin-bottom: 20px
  }
</style>
