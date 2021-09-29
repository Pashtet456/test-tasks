import { store } from 'src/store'

import AppMemoryGame from '@vue/AppMemoryGame.vue'

import Vue from 'vue'

export default async function initVueComponents () {
  const vueComponents = [
    { id: 'vue-memory', component: AppMemoryGame }
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
