# 김유미 | 포트폴리오

직접 구현한 프로젝트와 문제 해결 과정, 협업 경험을 정리한 개인 웹 포트폴리오입니다.

**공개 페이지:** https://youmjjang.github.io/About-me/

## 주요 프로젝트

1. **GIGANG (팀 프로젝트)** — 웹·DB·단말 이벤트를 연결해 보안 관제와 대응으로 이어지는 흐름을 구현했습니다. 팀 전체 결과와 개인 담당 범위를 구분해 소개합니다.
2. **HTTP Status Pattern Analyzer (개인 프로젝트)** — HTTP 상태코드별 반복 오류 패턴을 분석하고 먼저 확인할 로그를 제시하는 프로그램입니다. 연구와 실행 도구를 함께 소개합니다.
3. **Mini SOC (개인 프로젝트)** — Docker·Nginx 접근 로그를 Python으로 분석하고 탐지·경보·Flask 알림·일일 보고서로 연결했습니다.
4. **쉬엄쉬엄 (개인 프로젝트)** — 현재 위치나 검색 장소 주변의 벤치·쉼터·공원 후보를 조회하고 선택한 목적지까지 보행 경로를 확인하는 반응형 웹앱입니다.
5. **오늘의짐 (2인 팀 · 2일 해커톤 프로젝트)** — 철도·지하철 물품보관함 공공데이터와 네 구간 동선 비교로 보관함을 추천하고, Web Crypto API로 보관 정보를 브라우저에서 암호화해 저장하는 서비스입니다.

프로젝트 외에도 기술 적용 경험과 일하는 방식을 소개합니다.

## 오늘의짐 실제 화면과 링크

- **서비스:** https://oneurui-jim.vercel.app/
- **소스 저장소:** https://github.com/youmjjang/oneurui-jim
- **일정·보관 조건 입력 화면:** `assets/jim-search.png`
- **보관함 추천·동선 비교 결과:** `assets/jim-results.png`

2인 팀이 이틀 동안 공동 개발하고 서로의 기능을 점검했습니다. 보관함 위치뿐 아니라 짐 보관·회수를 포함한 전체 동선을 비교하며, 보관함 번호와 비밀번호는 Web Crypto API(PBKDF2, AES-GCM)를 이용해 암호화한 후 브라우저 로컬 저장소에 저장합니다.

## 쉬엄쉬엄 실제 화면과 링크

- **실행 사이트:** https://swieogalgot.vercel.app/
- **소스 저장소:** https://github.com/youmjjang/swieogalgot
- **실제 아이폰 휴식공간 목록:** `assets/swieogalgot-iphone-list.png`
- **실제 아이폰 보행 경로 화면:** `assets/swieogalgot-iphone-route.jpg`

쉬엄쉬엄의 장소 데이터는 OpenStreetMap과 TMAP 등 외부 정보에 기반합니다. 목록에 표시된 장소라고 해서 무료 이용, 착석 가능 여부 또는 실시간 개방 상태가 확인된 것은 아닙니다. 보행 경로 계산에 실패하면 직선거리를 실제 보행거리로 대신 표시하지 않는 설계입니다.

## 실행 및 수정

정적 HTML/CSS/JavaScript 포트폴리오로, `index.html`을 브라우저에서 열거나 GitHub Pages로 확인할 수 있습니다.

- `index.html` — 대표 프로젝트, 각 프로젝트 요약, 실제 구현 화면 및 외부 링크
- `styles.css` — 레이아웃과 반응형 디자인
- `script.js` — 이미지 확대 및 일부 화면 상호작용
- `assets/` — 프로젝트 실행 이미지
- `gigang.html`, `http-status-pattern-analyzer.html` 등 — 프로젝트 상세 설명

## 내용 표기 원칙

- 기획 목표와 구현 완료 기능을 구분합니다.
- 팀 공동 결과와 본인 담당 범위를 구분합니다.
- 시뮬레이션·모의 실험 수치를 실제 서비스 운영 성과로 표현하지 않습니다.
- 실제 구현 화면과 재구성·예시 이미지를 혼동하지 않도록 출처와 성격을 구분합니다.
