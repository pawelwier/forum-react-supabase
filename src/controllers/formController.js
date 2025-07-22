import { getRecords, initChannel } from "@/supabase/db-utils";

export async function getForms(sb, cb) {
  await getRecords(sb, 'forms', ['id', 'name', 'label', 'description'], cb);
}

export function initFormChannel(sb, cb) {
  initChannel(sb, 'forms', cb);
}