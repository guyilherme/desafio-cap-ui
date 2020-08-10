<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="mr-2">DESAFIO CAPGEMINI</span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view class="inter"></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
  .inter {
    margin: 10px 200px;
  }
</style>
