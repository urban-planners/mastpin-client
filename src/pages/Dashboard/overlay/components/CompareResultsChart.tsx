import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";

const CompareResultsChart = ({
  label,
  simulationValue,
  evaluationValue,
}: {
  label: string;
  simulationValue: number;
  evaluationValue: number;
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    Chart.register(...registerables);
  }, []);

  useEffect(() => {
    let newChartInstance: Chart | null = null;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d") as CanvasRenderingContext2D;
      newChartInstance = new Chart(ctx, {
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
    }
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [label, simulationValue, evaluationValue]);

  return <canvas ref={chartRef} />;
};

export default CompareResultsChart;
