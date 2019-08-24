import * as fb from 'firebase'

class Ad {
  constructor (title, description, promo = false, imageSrc = '', owner, id = null) {
    this.title = title
    this.description = description
    this.promo = promo
    this.imageSrc = imageSrc
    this.owner = owner
    this.id = id
  }
}
export default {
  state: {
    ads: [
      { title: 'First ad',
        description: 'First descriprion',
        promo: true,
        imageSrc: 'https://pbs.twimg.com/profile_banners/4871894043/1501574458/1500x500',
        id: '100'
      },
      { title: 'Second ad',
        description: 'Second descriprion',
        promo: true,
        imageSrc: 'https://pbs.twimg.com/profile_banners/898283342/1522457199/1500x500',
        id: '101'
      },
      { title: 'Third ad',
        description: 'Third descriprion',
        promo: false,
        imageSrc: 'https://pbs.twimg.com/profile_banners/2223740214/1406833965/1500x500',
        id: '102'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          payload.promo,
          payload.imageSrc,
          getters.user.id
        )
        const ad = await fb.database().ref('ads').push(newAd)
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
