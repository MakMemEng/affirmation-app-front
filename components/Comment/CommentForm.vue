<template>
  <v-text-field
    v-model="setComment"
    height="150"
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
    comment: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const max = 200
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
    setComment: {
      get () { return this.comment },
      set (newVal) { return this.$emit('update:comment', newVal) }
    }
  }
}
</script>
