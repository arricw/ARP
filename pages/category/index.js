Page({
  data: {
    activeTab: 0,
    tabs: [
      { id: 1, name: "蔬菜" },
      { id: 2, name: "水果" },
      { id: 3, name: "肉类" },
      { id: 4, name: "禽蛋" },
      { id: 5, name: "水产" },
      { id: 6, name: "粮油" },
      { id: 7, name: "干货" },
      { id: 8, name: "调料" }
    ],
    productList: [
      {
        id: 1,
        name: "有机西红柿",
        image: "/images/products/tomato.jpg",
        price: 12.8,
        sales: 2345,
        category: "蔬菜"
      },
      {
        id: 2,
        name: "海南芒果",
        image: "/images/products/mango.jpg",
        price: 25.0,
        sales: 1567,
        category: "水果"
      },
      {
        id: 3,
        name: "有机西红柿",
        image: "/images/products/tomato.jpg",
        price: 12.8,
        sales: 2345,
        category: "蔬菜"
      },
      {
        id: 4,
        name: "海南芒果",
        image: "/images/products/mango.jpg",
        price: 25.0,
        sales: 1567,
        category: "水果"
      }
    ],
    filteredProducts: []
  },

  onLoad() {
    const app = getApp();
    const categoryId = app.globalData.selectedCategoryId;
    if (categoryId) {
      const index = this.data.tabs.findIndex(tab => tab.id == categoryId);
      if (index!== -1) {
        this.setData({ activeTab: index });
      }
      this.filterProducts(this.data.activeTab);
    } else {
      // 默认显示第一个分类的商品
      this.filterProducts(0);
    }
  },
  onShow() {
    const app = getApp();
    const categoryId = app.globalData.selectedCategoryId;
    if (categoryId) {
      const index = this.data.tabs.findIndex(tab => tab.id == categoryId);
      if (index!== -1) {
        this.setData({ activeTab: index });
      }
      this.filterProducts(this.data.activeTab);
    } else {
      // 默认显示第一个分类的商品
      this.filterProducts(0);
    }
  },

  // 切换分类标签
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ activeTab: index });
    this.filterProducts(index);
  },

  // 商品筛选方法
  filterProducts(index) {
    const selectedCategory = this.data.tabs[index].name;
    const filtered = this.data.productList.filter(item => item.category === selectedCategory);
    this.setData({ filteredProducts: filtered });
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
});