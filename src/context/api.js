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
        value: item.max_bbs,
        color: getColor("bbs", item.max_bbs),
      },
      cms: {
        value: item.max_cms,
        color: getColor("cms", item.max_cms),
      },
      cbs: {
        value: item.max_cbs,
        color: getColor("cbs", item.max_cbs),
      },
      sbs: {
        value: item.max_sbs,
        color: getColor("sbs", item.max_sbs),
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
  const params = {
    year: targetYear,
    plant: targetCrop.title,
  };

  // const api = `/api/v1/weatherInfo/ajaxMinMaxValue`;
  // https://old.fireblight.org/fireblight/getMaryblyts?year=2021&plant=apple
  const api = `https://old.fireblight.org/fireblight/getMaryblyts`;
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
