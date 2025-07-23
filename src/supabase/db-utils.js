export async function getAllRecords(
  supabaseClient,
  tableName,
  columns = ['*']
) {
  const columnNames = columns.join(', ')
  const { data } = await supabaseClient
    .from(tableName)
    .select(columnNames)
    .order('created_at')
    
  return data
}

export async function getQueryRecords(
  supabaseClient,
  tableName,
  query,
  columns = ['*']
) {
  const columnNames = columns.join(', ')
  const { data } = await supabaseClient
    .from(tableName)
    .select(columnNames)
    .eq(...query)
    .order('created_at')

  return data
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
