import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const rootDir = 'docs/vault'
const output = []

function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walk(fullPath)
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(content)
      const relative = fullPath.replace(`${rootDir}/`, '').replace(/\\/g, '/')
      const link = '/' + relative.replace(/\.md$/, '')
      output.push({
        title: data.title || path.basename(file, '.md'),
        tags: data.tags || [],
        url: link
      })
    }
  }
}

walk(rootDir)
fs.writeFileSync('docs/vault/tagged-pages.json', JSON.stringify(output, null, 2))
console.log('✅ tagged-pages.json created.')
