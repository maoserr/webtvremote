import browser from "webextension-polyfill";
import {config, keybinds, options} from "./defaults";
import {Keybind, UserOpts, WebPageDef} from "./datatypes";

let curr_defs: WebPageDef[] | undefined
let curr_binds: Record<string, Keybind> | undefined
let curr_opts: UserOpts | undefined

async function getStored<T>(key: string, def: T):Promise<T>{
  let res:T
  let user_def = await browser.storage.sync.get(key)
  if (user_def.hasOwnProperty(key)
    && (user_def[key] != null)) {
    res = JSON.parse(<string>user_def[key]) as T
  } else {
    res = def
  }
  return res
}

export async function getDefinitions(): Promise<WebPageDef[]> {
  if (curr_defs) {
    return curr_defs
  }
  return await getStored('definition', config)
}

export async function getKeybinds(): Promise<Record<string, Keybind>> {
  if (curr_binds){
    return curr_binds
  }
  return await getStored('binds', keybinds)
}

export async function getOpts(): Promise<UserOpts> {
  if (curr_opts){
    return curr_opts
  }
  return await getStored('options', options)
}
