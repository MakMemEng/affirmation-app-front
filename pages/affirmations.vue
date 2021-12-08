<template>
  <div
    id="affirmations"
  >
    <v-parallax>
      <v-img
        :src="homeImg"
        alt="homeImg"
        :aspect-ratio="16/9"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
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
              <v-card-title
                class="white--text"
              >
                最近のアファメーション
              </v-card-title>

              <v-divider
                dark
                class="mb-4"
              />

              <v-row
                align="center"
              >
                <!-- アファメーションの追加 -->
                <v-col
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-btn
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                  >
                    <!-- ↑ @clicked="createAffirmation" -->
                    <div>
                      <v-icon
                        size="24"
                        color="myblue"
                        class="my-2"
                      >
                        mdi-plus
                      </v-icon>
                      <div
                        class="caption myblue--text"
                      >
                        アファメーションを追加
                      </div>
                    </div>
                  </v-btn>
                </v-col>

                <!-- 最近のアファメーション -->
                <v-col
                  v-for="(affirmation, i) in recentAffirmations.slice(0, 2)"
                  :key="`card-affirmation-${i}`"
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-card
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    :to="$my.affirmationLinkTo(affirmation.id)"
                    class="v-btn text-capitalize"
                  >
                    <v-card-title
                      class="pb-1 d-block text-truncate"
                    >
                      {{ affirmation.title }}
                    </v-card-title>
                    <v-card-text
                      class="caption"
                    >
                      <v-icon
                        size="14"
                      >
                        mdi-update
                      </v-icon>
                      {{ $my.dataFormat(affirmation.updated_at) }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-parallax>

    <!-- 全てのアファメーション -->
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title>
            全てのアファメーション
          </v-card-title>

          <v-divider
            class="mb-4"
          />

          <v-data-table
            :headers="tableHeaders"
            :items="recentAffirmations"
            item-key="id"
            hide-default-footer
          >
            <template
              #[`item.title`]="{ item }"
            >
              <nuxt-link
                :to="$my.affirmationLinkTo(item.id)"
                class="text-decoration-none"
              >
                {{ item.title }}
              </nuxt-link>
            </template>
            <template
              #[`item.updated_at`]="{ item }"
            >
              {{ $my.dataFormat(item.updated_at) }}a
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import homeImg from '~/assets/images/logged-in/home.png'
export default {
  name: 'DefaultLoggedIn',
  layout: 'logged-in',
  middleware: ['get-affirmation-list'],
  data () {
    return {
      homeImg,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 110,
        elevation: 4
      },
      tableHeaders: [
        {
          text: '名前',
          value: 'title'
        },
        {
          text: '更新日',
          width: 150,
          value: 'updated_at'
        }
      ]
      // ,
      // affirmations: []
    }
  },
  // method: {
  //   async createAffirmation () {
  //     const url = '/api/v1/post'
  //     const affirmation = {
  //       title: this.title,
  //       body: this.body
  //     }
  //     await this.$axios.$post(url, { affirmation })
  //       .then(response => this.createSuccessful(response))
  //       .catch(error => this.createFailure(error))

  //     const response = this.$axios
  //       .$get(url)
  //       .catch((error) => {
  //         console.log('response error', error)
  //         return false
  //       })
  //     this.affirmation = response.data.affirmations
  //   }
  // },
  computed: {
    recentAffirmations () {
      const copyAffirmations = Array.from(this.$store.state.affirmation.list)
      return copyAffirmations.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
#affirmations {
  .v-parallax__content {
    padding: 0;
  }
}
</style>
