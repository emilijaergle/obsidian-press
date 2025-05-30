// docs/vault/.vitepress/config.mjs
import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { SearchPlugin } from 'vitepress-plugin-search'

function formatTitle(name) {
  return name
    .replace(/^\d+_/, '')
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/^./, c => c.toUpperCase())
}

function getSidebarRecursive(dirPath, baseUrl = '') {
  const fullPath = path.resolve(__dirname, '..', dirPath)
  const entries = fs.readdirSync(fullPath, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))

  const items = entries.flatMap(entry => {
    const entryPath = path.join(dirPath, entry.name)
    const urlPath = path.join(baseUrl, entry.name.replace(/\.md$/, ''))

    if (entry.isDirectory()) {
      const children = getSidebarRecursive(entryPath, urlPath)
      if (children.length > 0) {
        return [{ text: formatTitle(entry.name), collapsed: true, items: children }]
      }
      return []
    }

    if (
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      entry.name !== 'index.md' &&
      !['about.md', 'contacts.md'].includes(entry.name)
    ) {
      return [{
        text: formatTitle(entry.name),
        link: `/${urlPath}`
      }]
    }

    return []
  })

  return items
}

export default defineConfig({
  title: 'Zinātava',
  description: 'Personīga zināšanu bāze',
  appearance: true, // ļauj tumšo režīmu
  themeConfig: {
    nav: [
      { text: 'Sākums', link: '/' },
      { text: 'Par Zinātavu', link: '/about' },
      { text: 'Kontakti', link: '/contacts' }
    ],
    sidebar: getSidebarRecursive('.'),
    footer: {
      message: 'Zināšanas ir spēks. Pieraksti tās.',
      copyright: '© 2025 Emīlija Ērgle'
    }
  },
  vite: {
    plugins: [SearchPlugin()]
  }
})
