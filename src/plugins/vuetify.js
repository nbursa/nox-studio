import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@/style/index.styl'
import { sr, en } from '@/lang'

export const preset = {
  breakpoint: {
    mobileBreakpoint: 600,
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    }
  },
  icons: {
    iconfont: 'mdi',
    values: {}
  },
  lang: {
    current: 'sr',
    locales: { en, sr },
    t: undefined
  },
  rtl: false,
  theme: {
    dark: true,
    default: 'light',
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: false,
      minifyTheme: undefined,
      themeCache: undefined
    },
    themes: {
      light: {
        primary: '#1e0000',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#fff',
        // info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      },
      // light: {
      //   primary: '#1976D2',
      //   secondary: '#424242',
      //   accent: '#82B1FF',
      //   error: '#FF5252',
      //   info: '#2196F3',
      //   success: '#4CAF50',
      //   warning: '#FB8C00'
      // },
      // dark: {
      //   primary: '#1e0000',
      //   secondary: '#424242',
      //   accent: '#FF4081',
      //   error: '#FF5252',
      //   info: '#2196F3',
      //   success: '#4CAF50',
      //   warning: '#FB8C00'
      // }
      dark: {
        noxdark: '#1E1E1E',
        primary: '#FB8C00',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      }
    }
  }
}

Vue.use(Vuetify)

export default new Vuetify({
  preset
})
