import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/projects')

export interface Source {
  text: string
  href?: string
}

export interface Fact {
  label: string
  value: string
  cite?: number
}

export interface ProjectFrontmatter {
  title: string
  order: number
  summary: string
  status: string
  role: string
  period: string
  logo?: string
  stack: string[]
  links?: { label: string; href: string }[]
  facts: Fact[]
  sources: Source[]
}

export interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
  content: string
}

function readProject(slug: string): Project | null {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  return { slug, frontmatter: data as ProjectFrontmatter, content }
}

export async function getProjectData(slug: string) {
  return readProject(slug)
}

export function getAllProjectSlugs() {
  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

export function getAllProjects(): Project[] {
  return getAllProjectSlugs()
    .map(readProject)
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}
