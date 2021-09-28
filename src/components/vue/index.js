import { store } from 'src/store'

import TheExample from '@vue/TheExample.vue'

import Vue from 'vue'

export default async function initVueComponents () {
  const vueComponents = [
    { id: 'vue-example', component: TheExample }
  ]

  for (const item of vueComponents) {
    const node = document.getElementById(item.id)

    if (!node) {
      continue
    }

    new Vue({
      store,
      render: h => h(item.component)
    }).$mount(`#${item.id}`)
  }
}
