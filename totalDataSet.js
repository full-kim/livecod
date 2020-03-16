// 업데이트 일시 함수(자동)
var updateTarget = document.getElementById("text-update-datetime");
updateTarget.innerHTML = koreaRegionalData[koreaRegionalData.length-1]['업데이트날짜'];

//세계지도에 표시할 데이터 추가, 아래 데이터는 메인페이지 최상단 데이터와 연결되어 있음(자동)
marker.push({
  "Name": "한국",
  "Name_en": "Korea, Republic of",
  "Name_ch": "韩国",
  "lat": 37.5456299,
  "lng": 126.9540667,
  "확진자수": koreaRegionalData[0]['확진자수'],
  "사망자수": koreaRegionalData[0]['사망자수'],
  "완치자수": koreaRegionalData[0]['격리해제수'],
  "십만명당발생율": koreaRegionalData[0]['십만명당발생율']
})


for (var i = 0; i < koreaRegionalData.length; i++) {
  if(koreaRegionalData[i]['지역이름'] == '제주'){
    marker.push({
      "Name": "제주",
      "Name_en": "Jeju",
      "Name_ch": "濟州",
      "lat": 33.50972,
      "lng": 126.52194,
      "확진자수": koreaRegionalData[i]['확진자수'],
      "사망자수": koreaRegionalData[i]['사망자수'],
      "완치자수": koreaRegionalData[i]['격리해제수'],
    })
    // console.log(koreaRegionalData[i]['확진자수'], koreaRegionalData[i]['사망자수'], koreaRegionalData[i]['격리해제수'])
  }
}

/////////////// 업데이트 방법 //////////////
// 1. 아래 데이터는 민감데이터로 크롤링에 의존하지 않는 데이터입니다.
//    긴급할 경우 아래 데이터만 수정하여 push 해주세요.
// 2. 크롤러_통합.py를 실행시키시고, 모두 push해주시면 됩니다.
//    크롤러_세계확진자.js, koreaRegionalData.js가 뽑힙니다.
// 3. 크롤러가 동작하지 않을 경우 수동업데이트해야 합니다.
// 4. 지역별 현황 사이트(질병관리본부 홈페이지) : http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=
// 5. 세계 현황 사이트 : https://www.worldometers.info/coronavirus/
//     개수가 많아 긴급할 경우 Top 5 정도만 업데이트 부탁드립니다.
////////////////////////////////////////////

// 존스홉킨스 : https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6
// https://www.worldometers.info/coronavirus/
// 질본 : http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=&brdGubun=&ncvContSeq=&contSeq=&board_id=&gubun=

// 선차트용 데이터 - 제주도청 제공
// 바울랩 메일 참고

var 입도객현황 = {
  날짜: ["19년평균", "2/3", "2/4", "2/5", "2/6", "2/8", "2/9", "2/10", "2/11", "2/12", "2/13", "2/16", "2/17", "2/18", "2/19", "2/20", "2/22", "2/23", "2/24", "2/25", "2/26", "2/27",
    "2/29",
    "3/1",
    "3/2",
    "3/3",
    "3/4",
    "3/5",
    "3/7",
    "3/8",
    "3/9",
    "3/10",
    "3/11",
    "3/12",
  ],
  내국인: [37150, 19209, 17633, 15873, 17184, 20488, 18959, 19074, 18922, 18720, 24409, 26120, 25105, 27135, 27247, 29316, 23732, 20508, 16379, 14567, 13978, 13318,
    14855, //2월 29일
    13402, //3월 1일
    15628, //3월 2일
    15668, //3월 3일
    14598, //3월 4일
    15727, //3월 5일
    16015, //3월 7일
    13672, //3월 8일
    15234, //3월 9일
    15637, //3월 10일
    17209, //3월 11일
    17600, //3월 12일
  ],
  외국인: [4729, 1866, 1285, 1247, 1280, 1127, 976, 906, 1003, 755, 793, 769, 639, 453, 623, 815, 762, 613, 524, 598, 351, 383,
    320, //2월 29일
    337, //3월 1일
    270, //3월 2일
    343, //3월 3일
    205, //3월 4일
    222, //3월 5일
    193, //3월 7일
    139, //3월 8일
    137, //3월 9일
    153, //3월 10일
    106, //3월 11일
    118, //3월 12일
  ],
  중국인: [2957, 755, 156, 116, 157, 86, 209, 66, 76, 103, 52, 186, 6, 12, 100, 7, 9, 7, 6, 6, 1, 24,
    33, //2월 29일
    69, //3월 1일
    61, //3월 2일
    54, //3월 3일
    24, //3월 4일
    18, //3월 5일
    13, //3월 7일
    10, //3월 8일
    10, //3월 9일
    5, //3월 10일
    2, //3월 11일
    5, //3월 12일
  ]
}

// This is a bad way to copy, but for now it will suffice.
// 네이버 지도 API가 로드된 후 marker를 수정하기 때문에 일단 copy를 진행하지만 수정이 필요한 코드입니다.
var _marker = JSON.parse(JSON.stringify(marker));


// 업데이트 시간
var 지역별확진자_업데이트_시간 = "";
for (var i = 0; i < koreaRegionalData.length; i++) {
  if(koreaRegionalData[i]['업데이트날짜']){
    지역별확진자_업데이트_시간 = koreaRegionalData[i]['업데이트날짜'];
  }
}
