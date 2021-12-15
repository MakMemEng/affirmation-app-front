<template>
  <v-text-field
    v-model="setTitle"
    :rules="rules"
    :counter="max"
    label="タイトルを入力"
    :placeholder="placeholder ? 'タイトル名' : undefined"
    outlined
  />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const max = 30
    return {
      max,
      rules: [
        // 入力必須
        v => !!v || '',
        // 書式チェック
        v => (!!v && max >= v.length) || `${max}文字以内で入力してください`
      ]
    }
  },
  computed: {
    setTitle: {
      get () { return this.title },
      set (newVal) { return this.$emit('update:title', newVal) }
    }
  }
}
</script>
