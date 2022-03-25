import axios from "axios";

import { fireblightStatus } from "../data/fireblightOptionData";

const getRefinedFBSpots = (data) => {
  const getColor = (itemTitle, value) => {
    const targetSymptom = fireblightStatus.filter(
      (item) => item.title == itemTitle
    )[0];
    if (targetSymptom) {
      const targetStatus = targetSymptom.statusList.filter(
        (item) => item.value == value
      )[0];
      if (targetStatus) {
        return targetStatus.color;
      }
    }
    return null;
  };

  return data.map((item) => {
    return {
      id: item.st_id,
      stationCode: item.code,
      stationName: item.name,
      stationType: item.type,
      lon: item.coords ? parseFloat(item.coords.split(",")[0]) : 127.7669,
      lat: item.coords ? parseFloat(item.coords.split(",")[1]) : 35.9078,
      bir: {
        value: item.max_bir,
        color: getColor("bir", item.max_bir),
      },
      bbs: {
        value: item.bbs_last_appeared_status,
        color: getColor("bbs", item.bbs_last_appeared_status),
      },
      cms: {
        value: item.cms_last_appeared_status,
        color: getColor("cms", item.cms_last_appeared_status),
      },
      cbs: {
        value: item.cbs_last_appeared_status,
        color: getColor("cbs", item.cbs_last_appeared_status),
      },
      sbs: {
        value: item.sbs_last_appeared_status,
        color: getColor("sbs", item.sbs_last_appeared_status),
      },
    };
  });
};

export const getFBSpots = async (
  setDataCallBack,
  setLoadingCallBack,
  targetCrop,
  targetYear,
  targetDate
) => {
  // const params = {
  //   year: targetYear,
  //   plant: targetCrop.title,
  // };

  // // const api = `/api/v1/weatherInfo/ajaxMinMaxValue`;
  // // https://old.fireblight.org/fireblight/getMaryblyts?year=2021&plant=apple
  // const api = `https://old.fireblight.org/fireblight/getMaryblyts`;

  const params = {
    // date: new Date(targetDate).toISOString().slice(0, 10),
    date: targetDate
      ? new Date(targetDate).toISOString().slice(0, 10)
      : `${targetYear}-01-01`,
    "filter-date-type": "yearType",
    plant: targetCrop.title,
  };

  // const api = `https://fireblight.org/fireblight/getMaryblyts`;
  const api = `/fireblight/getMaryblyts`;

  try {
    setLoadingCallBack(true);
    await axios.get(api, { params: { ...params } }).then((response) => {
      const data = response.data;
      // console.log(getRefinedFBSpots(data));
      setDataCallBack(getRefinedFBSpots(data));
    });
  } catch (e) {
    console.log(e);
  }
  setLoadingCallBack(false);
};

const getRefinedStationFBReport = (data) => {
  let result = {
    chartData: null,
    bbsDates: [],
    cmsDates: [],
    cbsDates: [],
    sbsDates: [],
  };

  const birDates = data.filter((item) => item.bir > 0);
  const birType1Dates = birDates.map((item) => {
    if (item.bir == 1) {
      return 1;
    } else {
      return null;
    }
  });
  const birType2Dates = birDates.map((item) => {
    if (item.bir == 2) {
      return 2;
    } else {
      return null;
    }
  });
  const birType3Dates = birDates.map((item) => {
    if (item.bir == 3) {
      return 3;
    } else {
      return null;
    }
  });
  const birType4Dates = birDates.map((item) => {
    if (item.bir == 4) {
      return 4;
    } else {
      return null;
    }
  });

  result.chartData = {
    birDates: birDates.map((item) => item.tm),
    birType1Dates: [...birType1Dates],
    birType2Dates: [...birType2Dates],
    birType3Dates: [...birType3Dates],
    birType4Dates: [...birType4Dates],
  };

  result.bbsDates = data
    .filter((item) => item.bbs !== null)
    .map((item, index) => {
      return { id: `bbs_${index}`, date: item.tm };
    });
  result.cmsDates = data
    .filter((item) => item.cms !== null)
    .map((item, index) => {
      return { id: `bbs_${index}`, date: item.tm };
    });
  result.cbsDates = data
    .filter((item) => item.cbs !== null)
    .map((item, index) => {
      return { id: `bbs_${index}`, date: item.tm };
    });
  result.sbsDates = data
    .filter((item) => item.sbs !== null)
    .map((item, index) => {
      return { id: `bbs_${index}`, date: item.tm };
    });

  // console.log(result);
  return result;
};

export const getStationFBReport = async (
  setDataCallBack,
  setLoadingCallBack,
  targetCrop,
  targetYear,
  targetDate,
  spotInfo
) => {
  const params = {
    begin: `${targetYear}-01-01`,
    until: `${targetYear}-12-31`,
    plant: targetCrop.title,
    lat: spotInfo.lat,
    lon: spotInfo.lon,
  };

  const api = `/fireblight/getMaryblyt`;

  try {
    setLoadingCallBack(true);
    await axios.get(api, { params: { ...params } }).then((response) => {
      const data = response.data;
      // console.log(getRefinedStationFBReport(data));
      setDataCallBack(getRefinedStationFBReport(data));
    });
  } catch (e) {
    console.log(e);
  }
  setLoadingCallBack(false);
};
