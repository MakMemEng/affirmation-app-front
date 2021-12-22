<template>
  <v-text-field
    v-model="setBody"
    height="250"
    :rules="rules"
    :counter="max"
    label="内容を入力"
    :placeholder="placeholder ? 'ここに具体的な内容を入力' : undefined"
    outlined
  />
</template>

<script>
export default {
  props: {
    body: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const max = 400
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
    setBody: {
      get () { return this.body },
      set (newVal) { return this.$emit('update:body', newVal) }
    }
  }
}
</script>
