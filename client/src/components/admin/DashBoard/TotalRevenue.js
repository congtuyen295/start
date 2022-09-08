import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import "moment/locale/vi";

export function TotalRevenue({ values }) {
  const { orders, dayInMonth } = values;
  const labels = [];
  for (let i = 0; i < dayInMonth; i++) {
    labels.push(i + 1);
  }

  const totals = labels.map((item) =>
    orders?.reduce((previousValue, currentValue) => {
      if (
        +moment(currentValue.updatedAt).toDate().toString().split(" ")[2] ===
          item && // ngày giao hàng thành công ứng với ngày nào trong tháng
        currentValue.status_order === 3
      )
        // 3 là đã giao
        return previousValue + currentValue.totalSum;
      return previousValue;
    }, 0)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Tổng doanh thu",
        data: totals,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Tổng doanh thu",
    },
  },
};
