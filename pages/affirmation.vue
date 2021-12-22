<template>
  <v-container>
    <nuxt-child />

    {{ $store.state.affirmation.current }}

    <!-- 編集ボタン Dialog編集 -->
    <v-form
      ref="form"
      type="text"
      @submit.prevent="editConfirm"
    >
      <v-card-text
        class="px-0"
      >
        <v-btn
          type="submit"
          :loading="loading"
          color="appblue"
          class="white--text"
        >
          編集
        </v-btn>
      </v-card-text>
    </v-form>
    <!-- 編集確認ダイアログを追加 -->
    <v-dialog
      v-model="editDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title
          class="headline"
        >
          投稿内容編集
        </v-card-title>

        <affirmation-form-title
          :title.sync="params.title"
        />
        <affirmation-form-body
          :body.sync="params.body"
        />

        <v-card-text>
          内容を変更しますか？
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="editDialog = false"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="editPost()"
          >
            変更
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 削除ボタン -->
    <v-form
      ref="form"
      type="text"
      @submit.prevent="deleteConfirm()"
    >
      <v-card-text
        class="px-0"
      >
        <v-btn
          type="submit"
          :loading="loading"
          color="appblue"
          class="white--text"
        >
          削除
        </v-btn>
      </v-card-text>
    </v-form>

    <!-- 削除確認ダイアログを追加 -->
    <v-dialog
      v-model="deleteDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title
          class="headline"
        >
          削除確認
        </v-card-title>
        <v-card-text>
          本当に削除してもよろしいですか？
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="deleteDialog = false"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deletePost()"
          >
            <!-- to="/affirmations" -->
            削除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'PagesAffirmation',
  layout: 'affirmation',
  // falseを返すページのアクセスを制限する
  validate ({ store, route }) {
    return !!store.state.affirmation.current && route.name !== 'affirmation'
  },
  data () {
    return {
      loading: false,
      title: '',
      body: '',
      params: { title: '', body: '' },
      errors: [],
      deleteDialog: false,
      editDialog: false
    }
  },
  mounted () {
    const url = '/api/v1/posts/'
    this.$axios.get(url)
      .then((response) => {
        this.title = response.title
        this.body = response.body
      })
      .catch((e) => {
        this.errors = e.data.errors
      })
  },
  methods: {
    // 削除確認ダイアログ表示を追加
    deleteConfirm () {
      this.deleteDialog = true
    },
    // 編集確認ダイアログ表示を追加
    editConfirm () {
      this.editDialog = true
    },
    async deletePost () {
      this.loading = true
      const url = `/api/v1/posts/${this.$route.params.id}`
      await this.$axios.$delete(url, this.params)
        .then(() => {
          console.log('削除成功')
          this.$router.push('/affirmations')
        })
        .catch((e) => {
          this.errors = e.data.errors
          console.log('失敗')
        })
      this.loading = false
      this.deleteDialog = false
    },
    async editPost () {
      this.loading = true
      this.errors = []
      const url = `/api/v1/posts/${this.$route.params.id}`
      await this.$axios.$patch(url, this.params)
        .then((response) => {
          this.title = response.title
          this.body = response.body
        })
        .catch((e) => {
          this.errors = e.data.errors
        })
      this.loading = false
      this.editDialog = false
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true
      })
    }
  }
}
</script>
