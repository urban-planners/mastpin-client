import "./ExportOverlay.css";
import { useDispatch, useSelector } from "react-redux";
import { showExportDisplay } from "../../../redux/actions";
import MapOverlay from "./Template";
import { useState } from "react";
import { PresentationInterface } from "../../../types";
import jsPDF from "jspdf";
import { generateMapImage } from "../../../utils";
import { Chart, registerables } from "chart.js";

const ExportOverlay = () => {
  const dispatch = useDispatch();

  const simulation = useSelector(
    (state: any) => state.result.simulation,
  ) as PresentationInterface;
  const evaluation = useSelector(
    (state: any) => state.result.evaluation,
  ) as PresentationInterface;
  const hasSimulation = useSelector((state: any) => state.result.hasSimulation);
  const hasEvaluation = useSelector((state: any) => state.result.hasEvaluation);
  const title = useSelector((state: any) => state.project.details.title);

  const [loading, setLoading] = useState(false);
  const [addMap, setAddMap] = useState(true);
  const [name, setName] = useState(title);

  const exportHandler = async () => {
    setLoading(true);

    try {
      const doc = new jsPDF("p", "mm", "a4");
      let yPos = 20;
      let currentPage = 1;
      const pageHeight = doc.internal.pageSize.height;
      const chartHeight = 120; // Set a fixed height for the charts

      doc.setFontSize(20);
      doc.text(title, 105, yPos, { align: "center" });
      yPos += 20;

      if (addMap) {
        const mapImage = await generateMapImage();
        if (mapImage) {
          doc.addImage(mapImage, "JPEG", 15, yPos, 180, 120);
          yPos += 140;
        }

        if (yPos > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
          currentPage++;
        }
      }

      if (hasSimulation) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Optimization", 105, yPos, { align: "center" });
        yPos += 15;
        yPos = renderData(doc, simulation, yPos, pageHeight);
      }

      if (hasEvaluation) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Evaluation", 105, yPos, { align: "center" });
        yPos += 15;
        yPos = renderData(doc, evaluation, yPos, pageHeight);
      }

      // Add charts
      if (hasSimulation && hasEvaluation) {
        const chartData = [
          {
            label: "Coverage",
            simulationValue: simulation.coverage,
            evaluationValue: evaluation.coverage,
          },
          {
            label: "Signal Strength",
            simulationValue: simulation.signal_strength,
            evaluationValue: evaluation.signal_strength,
          },
          {
            label: "Load Disparity",
            simulationValue: simulation.load_std,
            evaluationValue: evaluation.load_std,
          },
        ];

        for (const chartDatum of chartData) {
          if (yPos + chartHeight > pageHeight) {
            doc.addPage();
            yPos = 20;
            currentPage++;
          }

          const chartImage = await createChartImage(chartDatum);
          doc.addImage(chartImage, "JPEG", 15, yPos, 180, chartHeight);
          yPos += chartHeight + 10; // Add some spacing between charts
        }
      }

      // Save PDF only if content is rendered
      if (currentPage > 1 || hasSimulation || hasEvaluation) {
        doc.save(`${name}.pdf`);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <MapOverlay
      title={"Export Analysis"}
      onClickX={() => dispatch(showExportDisplay(false))}
    >
      <div className="map__share__container map__export__container">
        <div className="map__share__content map__export__content">
          <div className="map__export__content__item">
            <label>
              <input
                type="checkbox"
                checked={addMap}
                onChange={() => setAddMap(!addMap)}
              />
              Add Map
            </label>
          </div>
          <div className="map__export__content__item">
            <label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder="Enter file name"
                type="text"
              />
            </label>
          </div>
          <button
            className="map__export__button"
            disabled={loading}
            onClick={exportHandler}
          >
            Export
          </button>
        </div>
      </div>
    </MapOverlay>
  );
};

export default ExportOverlay;

const createChartImage = async (chartDatum: {
  label: string;
  simulationValue: number;
  evaluationValue: number;
}): Promise<string> => {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const image = (await new Promise((resolve, reject) => {
    Chart.register(...registerables);

    // Set canvas dimensions according to chart size
    canvas.width = 200; // Adjust width as needed
    canvas.height = 150; // Adjust height as needed
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [chartDatum.label],
        datasets: [
          {
            label: "Optimization",
            data: [chartDatum.simulationValue],
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192)",
          },
          {
            label: "Evaluation",
            data: [chartDatum.evaluationValue],
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

    // Check if chart is drawn
    if (!chart) {
      reject(new Error("Chart rendering failed"));
    }

    // Wait for chart animation to finish
    setTimeout(() => {
      const imageData = canvas.toDataURL("image/png");
      resolve(imageData);
    }, 500); // Adjust timeout as needed
  })) as string;
  document.body.removeChild(canvas);
  return image;
};

const renderData = (
  doc: jsPDF,
  data: Record<string, any>,
  yPos: number,
  pageHeight: number,
): number => {
  const keys = Object.keys(data);
  const lineHeight = 7; // Increased line spacing
  const maxWidth = 170; // Maximum width for text before wrapping
  const fontSize = 10;

  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "normal"); // Use a regular font for data

  keys.forEach((key, index) => {
    let formattedKey = key.replace(/_/g, " ").replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    let value = data[key];
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    const textLines = doc.splitTextToSize(
      `${formattedKey}: ${value}`,
      maxWidth,
    );
    const heightNeeded = textLines.length * lineHeight;

    // Check if there is enough space on the current page, if not, add a new page
    if (yPos + heightNeeded > pageHeight - 20) {
      doc.addPage();
      yPos = 20; // Reset yPos for new page
    }

    // Render the text
    textLines.forEach((line: string) => {
      doc.text(line, 20, yPos);
      yPos += lineHeight;
    });

    // Add some spacing between key-value pairs
    if (index !== keys.length - 1) {
      yPos += 5;
    }
  });

  return yPos + 10; // Add some padding after rendering data
};
