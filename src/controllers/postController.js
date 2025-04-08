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

export async function updatePost(sb, { content, id }) {
  await sb
    .from('posts')
    .update({ content })
    .eq('id', id)
}

export async function removePost(sb, id) {
  await sb
    .from('posts')
    .delete()
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