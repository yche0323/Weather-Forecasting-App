// src/components/ScrollableLineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  TimeScale,
  TooltipItem,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  TimeScale
);

interface TemperatureLineChartProps {
  data: number[];
  labels: string[];
  dataLabel: string;
  unit: string;
}

const LineChart: React.FC<TemperatureLineChartProps> = ({
  data,
  labels,
  dataLabel,
  unit,
}) => {
  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0);
    return newTime;
  };

  let temp_arr: number[] = data;
  temp_arr = temp_arr.map((num) => parseFloat(num.toFixed(1)));
  const minY = Math.floor(Math.min(...temp_arr));
  const maxY = Math.ceil(Math.max(...temp_arr));

  const chartData = {
    datasets: [
      {
        label: dataLabel,
        borderColor: "rgba(0, 0, 0, 1)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        data: labels.map((item, index) => {
          return {
            x: parseTime(item),
            y: temp_arr[index],
          };
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "hour" as const,
          tooltipFormat: "HH:mm",
          displayFormats: {
            hour: "HH:mm",
          },
        },
      },
      y: {
        min: minY,
        max: maxY,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const yData = context.parsed.y as number;
            return `${dataLabel}: ${yData}${unit}`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "1700px",
        height: "250px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "skyblue",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
