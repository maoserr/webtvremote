import {Keybind, UserOpts, WebPageDef} from "./datatypes";

export const options: UserOpts = {
  runStartup: true,
  fullScreen: true
}

export const keybinds: Record<string, Keybind> = {
  'ArrowDown': Keybind.next,
  'ArrowUp': Keybind.prev,
  'ArrowRight': Keybind.grpNext,
  'ArrowLeft': Keybind.grpPrev,
}

export const config: WebPageDef[] = [
  {
    name: 'Twitch',
    filts: [{hosts: ['twitch.tv']}],
    seldefs: [
      {name: 'close', selectors: ['button[aria-label="Close"]']},
      {
        name: 'player', selectors: [
          'button[data-a-target="player-play-pause-button"]',
          'button[data-a-target="player-fullscreen-button"]',
          'button[data-a-target="mini-overlay-play-pause-button"]',
        ]
      },
      {
        name: 'topnav', selectors: [
          'a[data-a-target="following-link"]',
          'a[data-a-target="browse-link"]',
        ]
      },
      {
        name: 'sidenav', selectors: [
          'button[data-a-target="side-nav-arrow"]',
          'a.side-nav-card',
        ]
      },
      {
        name: 'browser', selectors: [
          'div.tw-hover-accent-effect a',
          'a.game-card__link',
        ]
      },
      {
        name: 'chat', selectors: [
          'button[data-a-target="right-column__toggle-collapse-btn"]',
        ]
      },
    ]
  },
  {
    name: 'any', filts: [{hosts: ['.*']}], seldefs: [
      {
        name: 'actionable', selectors: [
          'a:not([disabled])',
          'button:not([disabled])',
          'input[type=text]:not([disabled])',
          '[tabindex]:not([disabled]):not([tabindex="-1"])'
        ]
      }
    ]
  }
]

