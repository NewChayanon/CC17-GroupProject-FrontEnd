import { useState } from "react";
import { Line } from "react-chartjs-2";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, getDaysInMonth } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CustomLineChart = () => {
  const [startDate, setStartDate] = useState(new Date());

  const getDaysArray = (date) => {
    const daysInMonth = getDaysInMonth(date);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const data = {
    labels: getDaysArray(startDate),
    datasets: [
      {
        label: "Number of events",
        data: Array.from({ length: getDaysInMonth(startDate) }, () =>
          Math.floor(Math.random() * 6)
        ), // Example data
        borderColor: "#4CAF50", // Line color
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Fill color
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: format(startDate, "MMMM yyyy"),
          color: "#8B4513",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 6,
        title: {
          display: true,
          text: "Number of events",
          color: "#8B4513",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="relative w-full h-full bg-verylightyellow p-6 rounded-2xl">
      <div className="absolute top-4 right-4 z-10 bg-absolutewhite">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border p-1 rounded bg-absolutewhite"
        />
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomLineChart;
