const url = 'https://graphqlzero.almansi.me/api'

export default function request(query) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query),
  })
}
