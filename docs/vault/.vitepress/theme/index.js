import DefaultTheme from 'vitepress/theme'
import CustomLayout from './Layout.vue'
import TagFilter from './TagFilter.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('TagFilter', TagFilter)
  },
  Layout: CustomLayout
}
