// 默认头像 URL
const DEFAULT_AVATAR_URL = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
// 腾讯位置服务密钥，需要替换为你自己的密钥
const TENCENT_MAP_KEY = 'X6ZBZ-IGIKQ-P6K5F-BNO2D-KIPMJ-2IFHA';
// 请求超时时间（毫秒）
const REQUEST_TIMEOUT = 5000; 

Page({
  data: {
    locationName: '未定位', // 初始化定位状态
    // 轮播图数据
    bannerList: [
      { id: 1, image: "/images/banner1.jpg" },
      { id: 2, image: "/images/banner2.jpg" }
    ],
    // 商品分类
    categories: [
      { id: 1, name: "蔬菜", icon: "/icons/vegetable.png" },
      { id: 2, name: "水果", icon: "/icons/fruit.png" },
      { id: 3, name: "肉类", icon: "/icons/meat.png" },
      { id: 4, name: "禽蛋", icon: "/icons/egg.png" },
      { id: 5, name: "水产", icon: "/icons/seafood.png" },
      { id: 6, name: "粮油", icon: "/icons/oil.png" },
      { id: 7, name: "干货", icon: "/icons/dried.png" },
      { id: 8, name: "调料", icon: "/icons/seasoning.png" }
    ],
    // 助农政策数据
    policyList: [
      { 
        id: 1, 
        title: "2023年农业补贴申请指南", 
        cover: "/images/policy1.png",
        date: "2023-08-15",
        content: "具体政策内容..." 
      },
      { 
        id: 2, 
        title: "乡村振兴专项贷款政策", 
        cover: "/images/policy2.png",
        date: "2023-08-10",
        content: "贷款申请流程..." 
      }
    ],
    // 热销商品
    productList: [
      { 
        id: 1, 
        name: "有机西红柿", 
        image: "/images/product1.jpg",
        price: 12.8,
        sales: 2345
      },
      { 
        id: 2, 
        name: "海南芒果", 
        image: "/images/product2.jpg",
        price: 29,
        sales: 2001
      }
    ],
    // 模拟倒计时
    countdown: "02:30:45",
    page: 1,
    pageSize: 10
  },
  
  onLoad() {
    // 可以根据实际情况决定是否在页面加载时就获取位置
    // this.getUserLocation();
    this.loadProducts();
  },
  loadProducts() {
    const { page, pageSize } = this.data;
    // 替换为实际的商品数据请求接口
    wx.request({
      url: `https://your-api.com/products?page=${page}&pageSize=${pageSize}`,
      success: (res) => {
        const newProducts = res.data.data;
        this.setData({
          productList: this.data.productList.concat(newProducts),
          page: page + 1
        });
      }
    });
  },

  // 搜索输入事件处理函数
  onSearchInput(e) {
    console.log('搜索关键词:', e.detail.value);
  },

  // 跳转到分类页
  navigateToCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    console.log('点击的分类 ID:', categoryId);
    const app = getApp();
    app.globalData.selectedCategoryId = categoryId;
    wx.switchTab({
      url: '/pages/category/index'
    });
  },

  // 查看商品详情

  viewProductDetail(e) {
    const productId = e.target.dataset.id || e.currentTarget.dataset.id;
    if (productId) {
      wx.navigateTo({ 
        url: `/pages/product/detail?id=${productId}`
      });
    }
  },

  // 获取用户位置
  getUserLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const cacheKey = `${latitude}-${longitude}`;
        const cachedAddress = wx.getStorageSync(cacheKey);
        if (cachedAddress) {
          this.setData({
            locationName: cachedAddress
          });
        } else {
          // 调用腾讯位置服务的逆地址解析 API
          this.reverseGeocoder(latitude, longitude);
        }
      },
      fail: (err) => {
        console.error('定位失败:', err);
        wx.showToast({
          title: '定位失败，请检查权限或网络',
          icon: 'none'
        });
      }
    });
  },

  // 逆地址解析
  reverseGeocoder(latitude, longitude) {
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${TENCENT_MAP_KEY}`;
    wx.request({
      url: url,
      timeout: REQUEST_TIMEOUT,
      success: (res) => {
        if (res.data.status === 0) {
          const city = res.data.result.address_component.city;
          this.setData({
            locationName: city
          });
          const cacheKey = `${latitude}-${longitude}`;
          wx.setStorageSync(cacheKey, city);
        } else {
          console.error('逆地址解析失败', res.data.message);
          wx.showToast({
            title: '地址解析失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('请求失败', err);
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  },


  // 查看所有助农政策
  viewAllPolicies() {
    console.log('查看所有助农政策');
    // 这里可以添加跳转到助农政策列表页的逻辑
  },

  // 查看助农政策详情
  viewPolicyDetail(e) {
    const policyId = e.currentTarget.dataset.id;
    console.log('查看助农政策详情，ID:', policyId);
    // 这里可以添加跳转到助农政策详情页的逻辑
  },

  // 查看所有热销产品
  viewAllProducts() {
    console.log('查看所有热销产品');
    // 这里可以添加跳转到热销产品列表页的逻辑
  },

  // 搜索按钮点击事件处理函数
  onSearch() {
    const searchInput = this.data.searchInput;
    console.log('执行搜索，关键词:', searchInput);
    // 这里可以添加实际的搜索逻辑，例如跳转到搜索结果页
  }
});