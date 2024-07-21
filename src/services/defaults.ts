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
  'Home': Keybind.home,
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
    name: 'Youtube',
    filts: [{hosts: ['youtube.com']}],
    seldefs: [
      {name: 'menu', selectors: [
        'div#start > yt-icon-button#guide-button > button.yt-icon-button',
        'div#contentContainer[opened] a#endpoint'
        ]},
      {
        name: 'controls', selectors: [
          'div.ytp-left-controls > button.ytp-play-button',
          'div.ytp-right-controls > button.ytp-size-button',
          'div.ytp-right-controls > button.ytp-fullscreen-button'
        ]
      },
      {name: 'chips', selectors: ['yt-chip-cloud-chip-renderer']},
      {name: 'thumbs', selectors: ['div#content a.ytd-thumbnail, div#content a.ytd-playlist-thumbnail']},
      {name: 'playlists', selectors: ['yt-thumbnail-view-model']},
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

