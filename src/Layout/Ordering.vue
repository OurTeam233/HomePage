<template>
  <div class="background">
    <!-- 头部 -->
    <div class="header">
      <div class="logo"></div>
      <div class="text">
        <div>首页</div>
        <div>首页</div>
        <div>首页</div>
        <div>首页</div>
        <div>首页</div>
      </div>
      <div class="exit">
        <el-button type="primary" @click="exit">退出登录</el-button>
      </div>
    </div>

<!--    <div class="images">-->
<!--      <el-carousel height="500px" indicator-position="none">-->
<!--        <el-carousel-item v-for="item in 4" :key="item">-->
<!--          <h3>{{ item }}</h3>-->
<!--        </el-carousel-item>-->
<!--      </el-carousel>-->
<!--    </div>-->

    <ul class="list" style="overflow:auto;height:calc(100vh - 89px)"  v-infinite-scroll="load">
      <li class="item" v-for="food in foods" :key="food.id">
        <img :src="food.image" class="img"/>
        <div class="name">{{ food.name }}</div>
      </li>
    </ul>
  </div>

</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {changeStoreStatus} from '../api/user.js';
import {
  adminMenuList,
  storeMenuList
} from '../utils/menuList.js';
import {getFood} from "@/api/food";

export default {

  //组件被创建
  created() {
    getFood(1).then((i) => {
      console.log(i)
      this.foods.push(...i.data.data.records)
    })
  },
  computed: {
    ...mapState({ // 从 state 中的到的计算属性
      activePath: state => state.activePath, // 已选中菜单
      tabList: state => state.tabList,  // tags菜单列表
      catch_components: state => state.catch_components,  // keepalive缓存
      userType: state => state.user.type
    })
  },
  data() {
    return {
      foods: [],
      current: 1
    }
  },
  methods: {
    load() {
      this.current++
      getFood(this.current).then((i) => {
        console.log(i)
        this.foods.push(...i.data.data.records)
      })
    },
    exit() {
      this.$store.commit('clearVUEX')
      //跳转到首页
      this.$router.push("/logout");
    }
  },
};
</script>
<style lang="less" scoped>
.background {
  background: #fff;
  height: 100%;
}


.header {
  display: flex;
  align-items: center;
  justify-content: right;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  height: 90px !important;
  padding: 0;

  .logo {
    flex: 2;
  }

  .text {
    flex: 4;
    display: flex;
    justify-content: space-around;
  }

  .exit {
    flex: 2;
    display: flex;
    justify-content: right;
    margin-right: 30px;
  }
}


.images {

}

.list {
  display: flex;
  flex-wrap: wrap;
  //align-items: center;
  margin: 0;
  justify-content: center;

  .item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px 50px;
    overflow: hidden;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;

    .img {
      height: 200px;
      width: 200px;
    }

    .name {
      margin-top: 20px;
    }


  }

}


.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>