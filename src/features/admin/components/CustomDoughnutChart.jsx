/* eslint-disable react/prop-types */
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend, ChartDataLabels);

const CustomDoughnutChart = ({ buyersCount, storesCount, buyerAndSellerCount }) => {
  const percentageBuyers = (buyersCount / buyerAndSellerCount) * 100;
  const percentageStores = (storesCount / buyerAndSellerCount) * 100;

  const data = {
    labels: ["Buyers\n(w/o store)\n", "Stores"],
    datasets: [
      {
        data: [percentageBuyers, percentageStores], // Percentage values
        backgroundColor: ["#008000", "#806030"], // Green and brown colors
        hoverBackgroundColor: ["#006400", "#654321"], // Darker green and brown for hover effect
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: true,
        color: "white",
        formatter: (value, context) => {
          return `${context.chart.data.labels[context.dataIndex]}: ${value.toFixed(1)}%`;
        },
        font: {
          size: 17,
          weight: "",
        },
      },
    },
    cutout: "42%",
  };

  return <Doughnut data={data} options={options} />;
};

export default CustomDoughnutChart;
