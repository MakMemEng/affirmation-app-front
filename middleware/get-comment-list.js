export default async ({ store, $axios, route }) => {
  // await $axios.$get('/api/v1/comments')
  await $axios.$get(`/api/v1/posts/${route.params.id}/comments`)
    .then(comments => store.dispatch('getCommentList', comments))
}
