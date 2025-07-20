export async function getForms(sb, cb) {
  const { data } = await sb
    .from('forms')
    .select(`
      id,
      name,
      label,
      description
    `)
    .order('created_at')

  cb(data)
}

export function initFormChannel(sb, cb) {
  sb.channel('custom-forms-channel')
    .on(
      'postgres_changes',
      { 
        event: '*',
        schema: 'public',
        table: 'forms' 
      },
      cb
    )
    .subscribe()
}