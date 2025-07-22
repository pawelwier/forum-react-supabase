export async function getRecords(
  supabaseClient,
  tableName,
  columns = ['*'],
  cb
) {
  const columnNames = columns.join(', ')
  const { data } = await supabaseClient
    .from(tableName)
    .select(columnNames)
    .order('created_at')
  cb(data)
}

export function initChannel(
  supabaseClient,
  tableName,
  cb
) {
  supabaseClient.channel(`${tableName}-channel`)
    .on(
      'postgres_changes',
      { 
        event: '*',
        schema: 'public',
        table: tableName 
      },
      cb
    )
    .subscribe()
}
