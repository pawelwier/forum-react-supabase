export async function getPosts(sb, cb) {
  const { data } = await sb
    .from('posts')
    .select(`
      id,
      content,
      profiles (email)
    `)
    .order('created_at')

  cb(data)
}

export async function updatePost(sb, { id, content }) {
  await sb
    .from('posts')
    // TODO: get real update content
    .update({ content: `${content} edited` })
    .eq('id', id)
}

export function initPostChannel(sb, cb) {
  sb.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { 
        event: '*',
        schema: 'public',
        table: 'posts' 
      },
      cb
    )
    .subscribe()
}