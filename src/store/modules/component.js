const state = {
  menu: {
    class: 'bg-primary text-grey-1'
  },
  header: {
    class: 'bg-primary text-grey-1'
  },
  separator: {
    class: 'bg-grey-1'
  },
  leftDrawer: {
    class: 'bg-primary text-grey-1'
  },
  item: {
    activeClass: 'text-blue-4'
  },
  leftDrawerExpansionItem: {
    expandIconClass: 'text-grey-1'
  },
  navbar: {
    class: 'bg-grey-2 text-grey-7',
    activeColor: 'grey-10',
    activeBgColor: 'grey-4'
  },
  page: {
    class: ''
  },
  pageHeader: {
    class: ''
  },

  teleport: {
    disabled: false,
    to: '#content'
  },

  dialogHeader: {
    class: 'bg-white text-grey-10 text-weight-bolder q-px-sm',
    bordered: true
  },
  dialogFooter: {
    class: 'bg-white text-grey-10 q-px-sm',
    bordered: true
  },
  dialogPageContainer: {
    class: 'bg-white'
  },
  dialogPage: {
    class: 'q-pa-md column q-gutter-y-md'
  },
  okButton: {
    class: 'bg-blue-9 text-grey-1'
  },
  cancelButton: {
    class: 'bg-red-9 text-grey-1'
  },
  confrimButton: {
    class: 'bg-primary text-primary'
  },
  // backToTopButton: {
  //   class: 'bg-transparent text-black',
  //   fabMini: true,
  //   icon: 'keyboard_arrow_up'
  // },

  input: {
    class: '',
    dense: true,
    outlined: true,
    square: true
  },
  select: {
    class: ''

  }
}

const getters = {
  dialog: state => state.teleport.disabled
    ? {
      persistent: true,
      square: true
    }
    : {
      persistent: true,
      seamless: true,
      maximized: true,
      square: true
    }
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
