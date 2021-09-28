import '~/index.scss'
import 'src/plugins/sprite.js'
import initVueComponents from '@vue'

async function init () {
  try {
    initVueComponents()
    console.log('init')
  } catch (e) {
    console.log(e.message)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
