<template>
  <v-app>
    <!-- toolbar -->
    <logged-in-app-bar
      clipped-left
    >
      <template
        #navigation-toggle-button
      >
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
        />
      </template>
    </logged-in-app-bar>

    <!-- navigation drawer -->
    <affirmation-navigation-drawer
      :drawer.sync="drawer"
    />

    <!-- main content -->
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutsAffirmation',
  middleware: ['authentication', 'get-affirmation-list', 'get-affirmation-current'],
  data () {
    return {
      drawer: null
    }
  }
}
</script>
