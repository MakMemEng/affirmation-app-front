<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: 'affirmation',
  // falseを返すページのアクセスを制限する
  validate ({ route }) {
    return route.name !== 'affirmation'
  }
}
</script>
