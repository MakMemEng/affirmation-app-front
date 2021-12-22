<template>
  <affirmation-form-card>
    <template
      #affirmation-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
        type="text"
        @submit.prevent="newPost"
      >
        <affirmation-form-title
          :title.sync="params.title"
        />
        <affirmation-form-body
          :body.sync="params.body"
        />

        <v-card-text
          class="px-0"
        >
          <v-btn
            v-model="isValid"
            type="submit"
            :loading="loading"
            :disabled="!isValid || loading"
            block
            color="appblue"
            class="white--text"
          >
            投稿
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </affirmation-form-card>
</template>

<script>
export default {
  name: 'PagesNewAffirmation',
  layout: 'affirmation',
  data ({ $store }) {
    return {
      isValid: false,
      loading: false,
      title: '',
      body: '',
      params: { title: '', body: '' },
      errors: [],
      redirectPath: $store.state.loggedIn.rememberPath,
      loggedInHomePath: $store.state.loggedIn.homePath
    }
  },
  methods: {
    async newPost () {
      this.loading = true
      this.errors = []
      const url = '/api/v1/posts'
      if (this.isValid) {
        await this.$axios.$post(url, this.params)
          .then((response) => {
            this.title = response.title
            this.body = response.body
            this.$router.push('/affirmations')
          })
          .catch((e) => {
            this.errors = e.data.errors
          })
      }
      this.loading = false
    }
  }
}
</script>
