export default async ({ store, $axios }) => {
  // プロジェクト一覧が存在しない場合
  if (!store.state.affirmation.list.length) {
    await $axios.$get('/api/v1/posts')
      .then(posts => store.dispatch('getAffirmationList', posts))
  }
}
