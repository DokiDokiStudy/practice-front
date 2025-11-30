import type { DocsCategory } from "../model/types";

export const mockDocsData: DocsCategory[] = [
  {
    id: "docker",
    title: "도커",
    chapters: [
      {
        id: "1",
        title: "1장. 도커의 이해",
        steps: [
          {
            id: "2",
            title: "1.1 세팅 시작하기",
            content:
              "도커를 시작하기 위해서는 먼저 시스템에 도커를 설치해야 합니다. 공식 웹사이트에서 운영체제에 맞는 도커 데스크톱을 다운로드하여 설치할 수 있습니다.",
          },
          {
            id: "3",
            title: "1.2 컨테이너의 이해",
            content:
              "컨테이너는 애플리케이션과 그 의존성을 패키징하는 표준화된 소프트웨어 단위입니다. 가상머신과 달리 호스트 OS의 커널을 공유하여 가볍고 빠르게 실행됩니다.",
          },
        ],
      },
    ],
  },
  {
    id: "javascript",
    title: "자바스크립트",
    chapters: [
      {
        id: "4",
        title: "1장. 자바스크립트 기본",
        steps: [
          {
            id: "5",
            title: "1.1 변수와 상수",
            content:
              "자바스크립트에서는 let, const, var 키워드를 사용하여 변수를 선언합니다. let은 재할당 가능한 변수, const는 상수를 선언할 때 사용합니다.",
          },
          {
            id: "6",
            title: "1.2 함수와 조건문",
            content:
              "함수는 재사용 가능한 코드 블록입니다. function 키워드나 화살표 함수(=>)로 선언할 수 있으며, if/else, switch 등의 조건문으로 흐름을 제어합니다.",
          },
        ],
      },
    ],
  },
];
