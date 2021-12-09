<template>
  <v-container>
    <v-btn
      v-if="!!currentAffirmation"
      small
      plain
      color="primary"
      :to="$my.affirmationLinkTo(currentAffirmation.id, dashboardPath)"
    >
      <v-icon
        left
      >
        mdi-chevron-double-left
      </v-icon>
      {{ $my.pageTitle(dashboardPath) }}に戻る
    </v-btn>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  name: 'PagesAccount',
  layout: 'logged-in',
  // falseを返すページのアクセスを制限する
  validate ({ route }) {
    return route.name !== 'account'
  },
  data () {
    return {
      dashboardPath: 'affirmation-id-dashboard'
    }
  },
  computed: {
    currentAffirmation () {
      return this.$store.state.affirmation.current
    }
  }
}
</script>
