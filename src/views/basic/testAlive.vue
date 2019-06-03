<template>
  <div class="hello">
    <h1>Vue</h1>
    <h2>{{msg}}</h2>
    <input placeholder="输入框" />
  </div>
</template>

<script>
    export default {
        name: "test-alive",
      data() {
        return {
          msg:''
        }
      },
    }
</script>

<style scoped>

</style>
