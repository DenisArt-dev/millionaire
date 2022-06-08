<template>

  <span class="colors">
    <span class="colors__1"></span>
    <span class="colors__2"></span>
    <span class="colors__3"></span>
    <span class="colors__4"></span>
    <span class="colors__5"></span>
    <span class="colors__6"></span>
    <span class="colors__W"></span>
    <span class="colors__B"></span>
    <span class="colors__R"></span>
  </span>

  <cmp-header></cmp-header>

  <div class="container">
    <router-view></router-view>
  </div>

</template>

<script>

export default {
  data() {
    return {
      
    }
  },

  created () {
    this.$store.commit('getSaveData');
  },

  mounted () {
    this.$store.commit('setColors');
    this.$store.commit('setCategory');
  }

}

</script>
