<template>
  <v-app-bar
    app
    :dark="!isScrollPoint"
    :height="HomeAppBarHeight"
    :color="toolbarStyle.color"
    :elevation="toolbarStyle.elevation"
  >
    <app-logo
      @click.native="$vuetify.goTo('#scroll-top')"
    />
    <app-title
      class="hidden-mobile-and-down"
    />

    <v-spacer />

    <v-toolbar-items
      class="ml-2 hidden-ipad-and-down"
    >
      <v-btn
        v-for="(menu, i) in menus"
        :key="`menu-btn-${i}`"
        text
        :class="{ 'hidden-sm-and-down': (menu.title === 'about') }"
        @click="$vuetify.goTo(`#${menu.title}`)"
      >
        {{ $t(`menus.${menu.title}`) }}
      </v-btn>
    </v-toolbar-items>

    <before-login-app-bar-signup-button />
    <before-login-app-bar-login-button />

    <v-menu
      bottom
      nudge-left="110"
      nudge-width="100"
    >
      <template
        #activator="{ on }"
      >
        <v-app-bar-nav-icon
          class="hidden-ipad-and-up"
          v-on="on"
        />
      </template>
      <v-list
        dense
        class="hidden-ipad-and-up"
      >
        <v-list-item
          v-for="(menu, i) in menus"
          :key="`menu-list-${i}`"
          exact
          @click="$vuetify.goTo(`#${menu.title}`)"
        >
          <v-list-item-title>
            {{ $t(`menus.${menu.title}`) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// import AppSignupButton from '../App/AppSignupButton.vue'
export default {
  // components: { AppSignupButton },
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    imgHeight: {
      type: Number,
      default: 0
    }
  },
  data ({ $store }) {
    return {
      scrollY: 0,
      HomeAppBarHeight: $store.state.styles.HomeAppBarHeight
    }
  },
  computed: {
    isScrollPoint () {
      // 500 -56 = 446px超の場合、trueを返す
      return this.scrollY > (this.imgHeight - this.HomeAppBarHeight)
    },
    toolbarStyle () {
      const color = this.isScrollPoint ? 'white' : 'transparent'
      const elevation = this.isScrollPoint ? 4 : 0
      return { color, elevation }
    }
  },
  // Vue.new() => Vueインスタンス
  // マウントされた後 => Vueの実行準備が完全に整った後
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  // Vueインスタンスが破壊される前に実行
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      this.scrollY = window.scrollY
    }
  }
}
</script>
