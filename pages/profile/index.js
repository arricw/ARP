Page({
  data: {
    // 用户信息
    avatar: '/images/000.png',
    nickname: '微信用户',
    phone: '点击绑定手机号',

    // 订单状态
    orderStatusList: [
      { type: 1, text: '待付款', icon: 'balance-list', count: 2 },
      { type: 2, text: '待发货', icon: 'logistics', count: 1 },
      { type: 3, text: '待收货', icon: 'send-gift', count: 3 },
      { type: 4, text: '待评价', icon: 'comment', count: 0 }
    ],

    // 功能列表
    funcList: [
      {
        id: 1,
        title: '地址管理',
        icon: '/icons/address.png',
        url: '/pages/address/list'
      },
      { 
        id: 2, 
        title: '客服中心',
        icon: '/icons/service.png',
        url: '/pages/service/index'
      },
      { 
        id: 3, 
        title: '关于我们',
        icon: '/icons/about.png',
        url: '/pages/about/index'
      },
      { 
        id: 4, 
        title: '系统设置',
        icon: '/icons/setting.png',
        url: '/pages/settings/index'
      }
    ],
    // 助农政策入口
    policyList: [
      { id: 1, title: '补贴政策', icon: '/images/policy1.png', url: '/pages/policy/detail?id=1' },
      { id: 2, title: '贷款支持', icon: '/images/policy1.png', url: '/pages/policy/detail?id=2' },
      { id: 3, title: '技术培训', icon: '/images/policy1.png', url: '/pages/policy/detail?id=3' }
    ]
  },



  // 跳转方法
  navigateToPage(e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({ url })
  },

  // 跳转到编辑页
  navigateToEdit() {
    wx.navigateTo({ url: '/pages/profile/edit' })
  },

  // 查看订单列表
  navigateToOrderList(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({ url: `/pages/order/list?type=${type}` })
  },

  // 查看政策详情
  navigateToPolicy(e) {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({ url })
  },

  // 查看全部政策
  viewMorePolicies() {
    wx.navigateTo({ url: '/pages/policy/list' })
  }

})