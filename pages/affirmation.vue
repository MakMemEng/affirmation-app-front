<template>
  <div
    id="affirmation"
  >
    <v-container>
      <nuxt-child />

      <v-row
        class="justify-end"
      >
        <!-- コメントボタン -->
        <v-form
          ref="form"
          type="text"
          @submit.prevent="commentConfirm"
        >
          <v-card-text
            class="px-2"
          >
            <v-btn
              type="submit"
              :loading="loading"
              color="appblue"
              class="white--text"
            >
              コメント
            </v-btn>
          </v-card-text>
        </v-form>
        <!-- 編集ボタン -->
        <v-form
          ref="form"
          type="text"
          @submit.prevent="editConfirm"
        >
          <v-card-text
            class="px-2"
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
        <!-- 削除ボタン -->
        <v-form
          ref="form"
          type="text"
          @submit.prevent="deleteConfirm()"
        >
          <v-card-text
            class="px-2"
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
      </v-row>

      <!-- 編集確認ダイアログを追加 -->
      <v-dialog
        v-model="editDialog"
        persistent
        max-width="80%"
        width="550"
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
      <!-- コメント確認ダイアログを追加 -->
      <v-dialog
        v-model="commentDialog"
        persistent
        max-width="80%"
        width="550"
      >
        <v-card>
          <v-card-title
            class="headline"
          >
            コメント内容入力
          </v-card-title>

          <comment-form
            :comment.sync="comments.comment"
          />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="commentDialog = false"
            >
              キャンセル
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="commentPost()"
            >
              送信
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <v-container
      fill-height
    >
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title class="black--text">
            最近のコメント
          </v-card-title>

          <v-divider dark />

          <v-row
            align="center"
          >
            <v-col
              v-for="(comment, i) in recentComments"
              :key="`card-comment-${i}`"
              cols="12"
              :sm="card.sm"
              :md="card.md"
            >
              <!-- TODO -->
              <!-- TODO -->
              <!-- TODO -->
              <v-card
                block
                :height="card.height"
                :elevation="card.elevation"
                to="/affirmation/{route.params.id}/comments"
                class="v-btn text-capitalize"
              >
                <v-card-title
                  class="pb-1 d-block text-truncate"
                >
                  {{ comment.comment }}
                </v-card-title>
                <v-card-text
                  class="caption"
                >
                  <v-icon
                    size="14"
                  >
                    mdi-update
                  </v-icon>
                  {{ comment.updated_at }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PagesAffirmation',
  layout: 'affirmation',
  middleware: ['get-comment-list'],
  // falseを返すページのアクセスを制限する
  validate ({ store, route }) {
    return !!store.state.affirmation.current && route.name !== 'affirmation'
  },
  data () {
    return {
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 12,
        md: 16,
        height: 110,
        elevation: 4
      },
      tableHeaders: [
        {
          text: '内容',
          value: 'comment'
        },
        {
          text: '更新日',
          width: 150,
          value: 'updated_at'
        }
      ],
      loading: false,
      title: '',
      body: '',
      params: { title: '', body: '' },
      comments: { comment: '' },
      errors: [],
      deleteDialog: false,
      editDialog: false,
      commentDialog: false
    }
  },
  computed: {
    recentComments () {
      const copyComments = Array.from(this.$store.state.comment.list.comment)
      return copyComments.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  mounted () {
    const url = '/api/v1/posts/'
    this.errors = []
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
    commentConfirm () {
      this.commentDialog = true
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
    },
    async commentPost () {
      this.loading = true
      this.errors = []
      await this.$axios.$post(
        `/api/v1/posts/${this.$route.params.id}/comments`, this.comments
      )
        .then((response) => {
          this.comment = response.comment
        })
        .catch((e) => {
          this.errors = e.data.errors
        })
      this.loading = false
      this.commentDialog = false
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true
      })
    }
  }
}
</script>
