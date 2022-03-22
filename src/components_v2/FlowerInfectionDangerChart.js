import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const NoData = styled.div`
  font-size: 11px;
  color: white;
  background-color: gray;
  padding: 5px;
  border-radius: 5px;
  margin: 2px;
`;

const FlowerInfectionDangerChart = (props) => {
  const { title, data } = props;

  // let targetDates = [];
  // let series1 = [];
  // let series2 = [];
  // let series3 = [];
  // let series4 = [];

  const [options, setOptions] = useState({
    exporting: {
      // filename: `${stationName}_${growthDates.join("_")}`,
      filename: "hahah",
      chartOptions: {
        // specific options for the exported image
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      },
      fallbackToExportServer: false,
      buttons: {
        contextButton: {
          enabled: false,
        },
        exportButton: {
          text: "다운로드",
          // Use only the download related menu items from the default
          // context button
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
      menuItemDefinitions: {
        downloadPNG: {
          text: "다운로드 PNG",
        },
        downloadJPEG: {
          text: "다운로드 JPG",
        },
        downloadPDF: {
          text: "다운로드 PDF",
        },
        downloadSVG: {
          text: "다운로드 SVG",
        },
      },
    },
    chart: {
      type: "column",
      height: 300,
      width: 250,
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      categories: [],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      max: 4,
      title: {
        text: "꽃감염 위험단계",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        pointWidth: 10,
      },
    },
    series: [],
  });

  useEffect(() => {
    setOptions({
      ...options,
      xAxis: {
        categories: [
          "05-25",
          "05-26",
          "05-27",
          "05-28",
          "05-29",
          "05-30",
          "05-31",
          "06-01",
          "06-02",
          "06-03",
          "06-04",
          "06-05",
          "06-06",
          "06-07",
          "06-08",
          "06-09",
          "06-10",
          "06-11",
          "06-12",
          "06-13",
        ],
        crosshair: true,
      },
      series: [
        {
          name: "매우 위험",
          color: "red",
          data: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            4,
            4,
            "",
            "",
          ],
        },
        {
          name: "다소 높음",
          color: "yellow",
          data: [
            2,
            2,
            2,
            2,
            2,
            "",
            "",
            2,
            "",
            2,
            2,
            2,
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
        },
        {
          name: "위험",
          color: "orange",
          data: [
            "",
            "",
            "",
            "",
            "",
            3,
            3,
            "",
            3,
            "",
            "",
            "",
            3,
            3,
            3,
            3,
            "",
            "",
            3,
            3,
          ],
        },
        {
          name: "낮음",
          color: "green",
          data: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
        },
      ],
    });
  }, []);

  // if (!data || data.length < 1) {
  //   return <NoData>해당 데이터 없음</NoData>;
  // }

  // if (data) {
  //   const targetDateData = data.filter((item) => item.bir > 0);
  //   targetDates = targetDateData.map((item) => item.tm);
  //   series1 = targetDateData.map((item) => {
  //     if (item.bir == 1) {
  //       return item.bir;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   series2 = targetDateData.map((item) => {
  //     if (item.bir == 2) {
  //       return item.bir;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   series3 = targetDateData.map((item) => {
  //     if (item.bir == 3) {
  //       return item.bir;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   series4 = targetDateData.map((item) => {
  //     if (item.bir == 4) {
  //       return item.bir;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default FlowerInfectionDangerChart;
