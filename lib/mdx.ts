import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const contentDirectory = path.join(process.cwd(), 'content/projects')

export async function getProjectData(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data as {
      title: string
      abstract: string
      role: string
      timeline: string
      theme: 'light' | 'dark'
      techStack: string[]
      repoLink?: string
      stats: { label: string; value: string }[]
      images?: string[]
    },
    content: content,
  }
}

export function getAllProjectSlugs() {
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames.map((fileName) => {
    return fileName.replace(/\.mdx$/, '')
  })
}
