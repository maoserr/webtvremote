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
}

// === Web page definition ===
/**
 * Define actionable elements
 */
export interface SelectorDef {
  name: string; // Name for this grouping
  selectors: string[]; // List of valid selectors
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
  seldefs: SelectorDef[]; // Selector definitions
}

// === Transport formats ===
/**
 * A group of selectable elements
 */
export interface Selectables {
  name: string;
  elements: HTMLElement[]
}
