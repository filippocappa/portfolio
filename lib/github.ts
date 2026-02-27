export async function getLatestCommitDate(repo: string = 'filippocappa/portfolio') {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!res.ok) return null
    
    const data = await res.json()
    if (data && data.length > 0) {
      const commitDate = new Date(data[0].commit.author.date)
      return commitDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase()
    }
    return null
  } catch (error) {
    console.error('Failed to fetch GitHub commit date:', error)
    return null
  }
}
