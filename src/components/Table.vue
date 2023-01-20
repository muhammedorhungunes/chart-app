<template>
  <div className="overflow-x-auto relative m-2 ">
    <table
      className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" className="py-3 px-6">Date</th>
          <th scope="col" className="py-3 px-6">Amount</th>
          <th scope="col" className="py-3 px-6">Average Profit Previous 30 Days</th>
          <th scope="col" className="py-3 px-6">Average Sales Previous 30 Days</th>
        </tr>
      </thead>
      <tbody>
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          :key="value.date"
          v-for="value in item"
        >
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{value.date}}
          </th>
          <td className="py-4 px-6">{{value.amount}}</td>
          <td className="py-4 px-6">{{value.avgProfitPrev30Days}}</td>
          <td className="py-4 px-6">{{value.avgSalesPrev30Days}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ['item'],
};
</script>
