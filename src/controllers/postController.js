import { getAllRecords, initChannel } from "@/supabase/db-utils"

export async function getPosts(sb) {
  return getAllRecords(sb, 'posts', ['id', 'content', 'profiles (email)'])
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
  initChannel(sb, 'posts', cb)
}