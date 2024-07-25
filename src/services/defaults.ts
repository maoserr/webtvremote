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
  'BrowserHome': Keybind.home,
}

export const config: WebPageDef[] = [
  {
    name: 'Twitch',
    filts: [{hosts: ['twitch.tv']}],
    seldefs: [
      {
        name: 'close', selectors: [
          'button[aria-label="Close"]',
          'button[aria-label="Dismiss Mini Player"]',
        ]
      },
      {
        name: 'player', selectors: [
          'button[data-a-target="mini-overlay-play-pause-button"]',
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
        ],
        scrollIntoView: "center"
      },
      {
        name: 'browser', selectors: [
          'div.tw-hover-accent-effect a',
          'a.game-card__link',
        ],
        scrollIntoView: "center"
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
      {
        name: 'menu', selectors: [
          'div#start > yt-icon-button#guide-button > button.yt-icon-button',
          'div#contentContainer[opened] a#endpoint'
        ],
        scrollIntoView: "center"
      },
      {
        name: 'controls', selectors: [
          'div.ytp-miniplayer-scrim > button.ytp-miniplayer-close-button',
          'div.ytp-miniplayer-scrim > button.ytp-miniplayer-expand-watch-page-button',
          'div.ytp-miniplayer-play-button-container > button.ytp-play-button',
          'div#player button.ytp-large-play-button',
          'div#full-bleed-container button.ytp-large-play-button',
          'div.ytp-left-controls > button.ytp-play-button',
          'div.ytp-right-controls > button.ytp-size-button',
          'div.ytp-right-controls > button.ytp-fullscreen-button'
        ]
      },
      {name: 'chips', selectors: ['yt-chip-cloud-chip-renderer']},
      {name: 'thumbs', selectors: [
        'div#content a.ytd-thumbnail, div#content a.ytd-playlist-thumbnail'],
        scrollIntoView: "center"
      },
      {name: 'playlists', selectors: ['yt-thumbnail-view-model'],
        scrollIntoView: "center"
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

