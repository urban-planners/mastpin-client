import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { PresentationInterface } from "../../../../types";

const CompareResultsChart = ({
  label,
  simulationValue,
  evaluationValue,
}: {
  label: string;
  simulationValue: number;
  evaluationValue: number;
}) => {
  const [chart, setChart] = useState<Chart | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    Chart.register(...registerables);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d") as CanvasRenderingContext2D;
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [label],
          datasets: [
            {
              label: "Optimization",
              data: [simulationValue],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192)",
            },
            {
              label: "Evaluation",
              data: [evaluationValue],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      setChart(newChartInstance);
    }
  }, [label, simulationValue, evaluationValue]);

  return <canvas ref={chartRef} />;
};

export default CompareResultsChart;
