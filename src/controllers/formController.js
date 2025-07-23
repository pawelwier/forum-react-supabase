import { getAllRecords, getQueryRecords, initChannel } from "@/supabase/db-utils";

export async function getForms(sb) {
  return getAllRecords(sb, 'forms', ['id', 'name', 'label', 'description', 'url'])
}

export async function getFormByUrl(sb, url) {
  return getQueryRecords(sb, 'forms', ['url', url], ['label', 'description'])
}

export function initFormChannel(sb, cb) {
  initChannel(sb, 'forms', cb);
}