export function serialize(obj) {
  let queryString = ""
  for (let key in this.$route.query) {
    queryString += `&${key}=${this.$route.query[key]}`
  }
  return queryString
}