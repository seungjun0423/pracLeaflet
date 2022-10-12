export const targetCrops = [
  { id: 1, title: "apple", titleKo: "사과" },
  { id: 2, title: "pear", titleKo: "배" },
];

export const fireblightStatus = [
  {
    id: 1,
    titleKo: "꽃 감염 위험도",
    title: "bir",
    statusList: [
      {
        id: 101,
        value: null,
        titleKo: "기간 아님/해당 없음",
        color: "#EAEAEA",
      },
      { id: 102, value: 1.0, titleKo: "낮음", color: "#008000" },
      { id: 103, value: 2.0, titleKo: "다소 낮음", color: "#FFFF00" },
      { id: 104, value: 3.0, titleKo: "위험", color: "#FFA500" },
      { id: 105, value: 4.0, titleKo: "매우 위험", color: "#FF0000" },
    ],
  },
  {
    id: 2,
    titleKo: "꽃 병징 출현",
    title: "bbs",
    statusList: [
      // {
      //   id: 201,
      //   value: null,
      //   titleKo: "기간 아님/해당 없음",
      //   color: "#EAEAEA",
      // },
      // { id: 202, value: 1, titleKo: "출현", color: "#A768AE" },
      // { id: 203, value: 2, titleKo: "출현 없음", color: "#008000" },
      { id: 202, value: 1, titleKo: "출현 가능성 높음", color: "#A768AE" },
      { id: 203, value: null, titleKo: "출현 가능성 낮음", color: "#008000" },
    ],
  },
  {
    id: 3,
    titleKo: "궤양 활성 출현",
    title: "cms",
    statusList: [
      // { id: 301, value: 0, titleKo: "기간 아님/해당 없음", color: "#EAEAEA" },
      // { id: 302, value: 1, titleKo: "출현", color: "#A768AE" },
      // { id: 303, value: 2, titleKo: "출현 없음", color: "#008000" },
      { id: 302, value: 1, titleKo: "출현 가능성 높음", color: "#A768AE" },
      { id: 303, value: null, titleKo: "출현 가능성 낮음", color: "#008000" },
    ],
  },
  {
    id: 4,
    titleKo: "궤양 가지 마름 출현",
    title: "cbs",
    statusList: [
      // {
      //   id: 401,
      //   value: null,
      //   titleKo: "기간 아님/해당 없음",
      //   color: "#EAEAEA",
      // },
      // { id: 402, value: 1, titleKo: "출현", color: "#A768AE" },
      // { id: 403, value: 2, titleKo: "출현 없음", color: "#008000" },
      { id: 402, value: 1, titleKo: "출현 가능성 높음", color: "#A768AE" },
      { id: 403, value: null, titleKo: "출현 가능성 낮음", color: "#008000" },
    ],
  },
  {
    id: 5,
    titleKo: "신초 병징 출현",
    title: "sbs",
    statusList: [
      // {
      //   id: 401,
      //   value: null,
      //   titleKo: "기간 아님/해당 없음",
      //   color: "#EAEAEA",
      // },
      // { id: 402, value: 1, titleKo: "출현", color: "#A768AE" },
      // { id: 403, value: 2, titleKo: "출현 없음", color: "#008000" },
      { id: 402, value: 1, titleKo: "출현 가능성 높음", color: "#A768AE" },
      { id: 403, value: null, titleKo: "출현 가능성 낮음", color: "#008000" },
    ],
  },
];