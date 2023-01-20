<template>
  <Login v-if="isLogin === false"></Login>
  <h1 v-if="isLogin === true">Selected Day</h1>
  <select v-model="selected" @change="getStoreSales()" v-if="isLogin === true">
    <option disabled value="">Please select one</option>
    <option>60</option>
    <option>30</option>
    <option>14</option>
    <option>7</option>
  </select>
  <ColumnChart
    v-if="isLogin === true"
    :xAxis="chart.xAxis"
    :series="chart.series"
  />
  <Table v-if="isLogin === true" :item="chart.data"></Table>
</template>

<script>
import Login from "./components/Login.vue";
import Table from "./components/Table.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { ColumnChart } from "vuejs3-highcharts";

export default {
  name: "App",
  components: {
    Login,
    ColumnChart,
    Table,
  },
  data() {
    return {
      chart: {
        xAxis: {
          categories: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007],
        },
        series: [
          {
            name: "FbaAmount",
            color: "#03bbd4",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          },
          {
            name: "FbmAmount",
            color: "#f7a35c",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
          },
        ],
        data: [],
      },
      selected: ''
    };
  },
  setup() {
    const store = useStore();
    return {
      isLogin: computed(() => store.state.isLogin),
      nowIslogin: computed(() => store.getters.nowIslogin),
      loginStore: () => store.dispatch("login"),
      logout: () => store.dispatch("logout"),
      auth: () => store.dispatch("auth"),
      getAuth: computed(() => store.getters.getAuth),
    };
  },
  methods: {
    async getStoreSales() {
      const postData = {
        marketplace: this.getAuth.Data.user.store[0].marketplaceName,
        sellerId: this.getAuth.Data.user.store[0].storeId,
        requestStatus: 0,
        day: this.selected,
        excludeYoYData: true,
      };

      try {
        var result = "";
        await fetch(`https://iapidev.eva.guru/data/daily-sales-overview/`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuth.Data.token}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(postData), // body data type must match "Content-Type" header
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            result = data;
          });
        var arrayCategory = [];
        var arrayFbaAmount = [];
        var arrayFbmAmount = [];
        result?.Data.item.forEach((element) => {
          arrayCategory.push(element.date);
          arrayFbaAmount.push(element.fbaAmount);
          arrayFbmAmount.push(element.fbmAmount);
          console.log(element);
        });
        this.chart.xAxis.categories = arrayCategory;

        this.chart.series[0].data = arrayFbaAmount;
        this.chart.series[1].data = arrayFbmAmount;
        this.chart.data = result.Data.item;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
