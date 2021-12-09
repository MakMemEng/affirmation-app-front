<template>
  <v-container>
    {{ $store.state.affirmation.current }}
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  name: 'PagesAffirmation',
  layout: 'affirmation',
  // falseを返すページのアクセスを制限する
  validate ({ store, route }) {
    return !!store.state.affirmation.current && route.name !== 'affirmation'
  }
}
</script>
