/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const CustomBarChart = ({ buyersCount, storesCount }) => {
  const data = {
    labels: ["Buyers (w/o store)", "Stores"],
    datasets: [
      {
        label: "Acc Number",
        data: [buyersCount, storesCount],
        backgroundColor: ["#008000", "#806030"], // Green and brown colors
        barThickness: 95,
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
        color: "#545454",
        anchor: "end",
        align: "start",
        offset: -25,
        font: {
          size: 18,
        },
        formatter: (value) => `${value}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: buyersCount * 2 || 100,
        title: {
          display: true,
          text: "Acc Number",
          color: "#333",
          font: {
            size: 17,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Types of users",
          color: "#333",
          font: {
            size: 17,
            weight: "bold",
          },
        },
        ticks: {
          color: ["#008000", "#8B4513"],
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000, // Animation duration in milliseconds
      easing: "easeOutQuart", // Easing function
    },
  };

  return (
    <div className="w-full h-96 lg:w-1/2 mx-auto bg-verylightyellow p-2 rounded-2xl flex justify-center items-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CustomBarChart;
