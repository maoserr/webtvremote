// === User options ===
export interface UserOpts {
  runStartup: boolean;
  fullScreen: boolean;
}

// === Key Bindings ===
export enum Keybind {
  next = "next",
  prev = "prev",
  grpNext = "grpNext",
  grpPrev = "grpPrev",
  home = "Home",
}

// === Web page definition ===
/**
 * Define actionable elements
 */
export interface SelectorDef {
  name: string; // Name for this grouping
  selectors: string[]; // List of valid selectors
  scrollIntoView?: "center" | "start" | "end" | "nearest"
}

/**
 * How to identify a web page/url
 */
export interface Identifier {
  hosts: string[];  // Valid hosts, can be wildstar *
  hrefs?: string[]; // href regex
  selectors?: string[]; // A list of selector definitions that should exists
}

/**
 * A definition for a web page/url.
 */
export interface WebPageDef {
  name: string; // Name for this definition
  filts: Identifier[]; // Filter definition for this web page (E.G. how to identify)
  MenuItems: Record<string,string>; // List of top menu items
  videoSelectors: SelectorDef; // Identify main playing video order
  browseables: SelectorDef[]; // Main browseable content
  sidebar: SelectorDef[]; // Chat/Comment/Additional info/etc
  continuation: SelectorDef[]; // Continue previous playing video
}

// === Transport formats ===
/**
 * A group of selectable elements
 */
export interface Selectables {
  name: string;
  elements: HTMLElement[]
}
