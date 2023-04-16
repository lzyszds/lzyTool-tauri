export interface ParsingType {
  href: string,
  img: string,
  title: string,
  length: string,
  desc: string[]
}
export interface ListArrType {
  title: string,
  url: string,
  isHerald: string,
}
export interface DetailArrType {
  figure_pic: string,
  info_item_desc: string,
  info_item_even: string,
  info_item_role: string,
  result_title: string
}
export interface GetVideoUrlType {
  cid: string,
  fullTitle: string,
  title: string,
  pic: string,
  vid: string,
  page: number,
  isNoStoreWatchHistory: boolean,
}

export interface ListItem {
  docname: string,
  title: string,
  id: string,
  href: string,
  type: string,
  img: string,
}
