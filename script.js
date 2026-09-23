const tabs = [...document.querySelectorAll('.tab')];
const panels = [...document.querySelectorAll('.strength-panel')];

function activateTab(tab) {
  const targetId = tab.dataset.target;

  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.setAttribute('tabindex', active ? '0' : '-1');
  });

  panels.forEach((panel) => {
    const active = panel.id === targetId;
    panel.hidden = !active;
    panel.classList.toggle('is-visible', active);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex]);
  });
});

const imageDialog=document.querySelector('.image-dialog');
document.querySelectorAll('.shot-open').forEach(button=>button.addEventListener('click',()=>{
 const source=button.querySelector('img'); const target=document.querySelector('#expanded-image');
 target.src=source.src;target.alt=source.alt;document.querySelector('#image-label').textContent=source.alt;
 imageDialog.showModal();
}));
document.querySelector('#close-image').addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('click',e=>{if(e.target===imageDialog){const r=imageDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)imageDialog.close();}});

// Portfolio detail expansion — 2026.09.23
const portfolioDetailStyle = document.createElement('style');
portfolioDetailStyle.textContent = `
  .portfolio-detail-wrap{padding:22px 20px 24px}
  .portfolio-detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:16px}
  .portfolio-detail-card{padding:16px;border:1px solid rgba(120,94,70,.18);background:rgba(255,255,255,.72)}
  .portfolio-detail-card b{display:block;margin-bottom:7px;color:#8b5f3d;font-size:.72rem;letter-spacing:.08em}
  .portfolio-detail-card p{margin:0;line-height:1.75}
  .portfolio-problem-flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:10px;align-items:stretch;margin-top:4px}
  .portfolio-problem-step{padding:16px;border:1px solid rgba(120,94,70,.18);background:#fff}
  .portfolio-problem-step span{display:block;margin-bottom:7px;color:#a56335;font-size:.68rem;font-weight:800;letter-spacing:.06em}
  .portfolio-problem-step strong{display:block;margin-bottom:7px;line-height:1.45}
  .portfolio-problem-step p{margin:0;font-size:.84rem;line-height:1.7}
  .portfolio-problem-arrow{display:flex;align-items:center;color:#a56335;font-weight:900}
  .portfolio-detail-note{margin:14px 0 0;padding:12px 14px;border-left:3px solid #8b5f3d;background:rgba(139,95,61,.08);font-size:.82rem;line-height:1.7}
  @media(max-width:760px){
    .portfolio-detail-grid{grid-template-columns:1fr}
    .portfolio-problem-flow{grid-template-columns:1fr}
    .portfolio-problem-arrow{justify-content:center;transform:rotate(90deg);min-height:12px}
  }
`;
document.head.appendChild(portfolioDetailStyle);

const detailData = {
  nexusguard: {
    summary: '자세히 보기 · 내가 한 일 / 문제 해결',
    html: `
      <div class="portfolio-detail-wrap">
        <div class="portfolio-detail-grid">
          <section class="portfolio-detail-card"><b>WHAT I DID</b><p>Chrome 확장에서 웹 방문·파일 선택·붙여넣기 길이 이벤트를 수집하고, Windows Agent에서 사용자·PC·시각 정보를 더해 중앙 API로 전달하는 흐름을 구현했습니다. 로컬 경고창도 담당했습니다.</p></section>
          <section class="portfolio-detail-card"><b>MY SCOPE</b><p>Endpoint Agent · Chrome 확장 · 로컬 경고가 제 담당 범위입니다. 팀 대시보드·중앙 서버·상관분석 엔진은 다른 팀원의 담당 영역과 구분해 표시했습니다.</p></section>
        </div>
        <div class="portfolio-problem-flow">
          <section class="portfolio-problem-step"><span>01 / PROBLEM</span><strong>브라우저 이벤트만으로는 분석 맥락이 부족</strong><p>사이트 방문이나 파일 선택 사실만으로는 어느 PC와 사용자의 이벤트인지 중앙에서 구분하기 어려웠고, 서버 연결이 잠깐 끊기면 이벤트 전달도 불안정할 수 있었습니다.</p></section>
          <div class="portfolio-problem-arrow">→</div>
          <section class="portfolio-problem-step"><span>02 / FIX</span><strong>Agent에서 정보 보강 + 재전송</strong><p>로컬 Agent가 사용자·PC·시각 정보를 보강하도록 분리하고, 전송 실패 시 최대 200건을 임시 큐에 두고 5초 간격으로 다시 보내도록 구성했습니다. 같은 사이트의 경고는 30초 간격으로 제한했습니다.</p></section>
          <div class="portfolio-problem-arrow">→</div>
          <section class="portfolio-problem-step"><span>03 / RESULT</span><strong>수집부터 중앙 전달까지 한 흐름으로 연결</strong><p>브라우저 행동을 구조화된 보안 이벤트로 바꾸고, 일시적인 연결 실패가 있어도 다시 전달할 수 있는 Endpoint 수집 흐름을 만들었습니다.</p></section>
        </div>
        <p class="portfolio-detail-note"><strong>범위:</strong> 파일 선택은 업로드 시도를 의미하며 실제 정보 유출을 확정하지 않습니다. 파일 본문과 붙여넣은 원문은 중앙으로 보내지 않고 필요한 메타데이터만 사용했습니다.</p>
      </div>`
  },
  logsentinel: {
    summary: '자세히 보기 · 내가 한 일 / 문제 해결',
    html: `
      <div class="portfolio-detail-wrap">
        <div class="portfolio-detail-grid">
          <section class="portfolio-detail-card"><b>WHAT I DID</b><p>인증 로그 업로드, 반복 로그인 실패·다중 계정 공격·실패 후 성공 패턴 탐지, 종합 위험도 계산, 웹 대시보드와 보고서 출력을 연결했습니다.</p></section>
          <section class="portfolio-detail-card"><b>VERIFY</b><p>저장소의 샘플 CSV를 다시 업로드해 유효 로그 8건, 로그인 실패 7건, 탐지 이벤트 3건, 종합 위험도 55/100이 나오는 실행 흐름을 확인했습니다.</p></section>
        </div>
        <div class="portfolio-problem-flow">
          <section class="portfolio-problem-step"><span>01 / PROBLEM</span><strong>데이터 구조를 바꾼 뒤 KeyError 발생</strong><p>개별 score를 제거하고 종합 위험도로 구조를 바꾸는 과정에서 요약 모듈 일부가 예전 키를 계속 참조해 실행 중 오류가 발생했습니다.</p></section>
          <div class="portfolio-problem-arrow">→</div>
          <section class="portfolio-problem-step"><span>02 / FIX</span><strong>호출 경로를 따라 참조를 통일</strong><p>오류가 발생한 위치만 고치는 대신 위험도 값이 전달되는 경로를 따라가며 예전 참조를 찾고, 웹 화면과 요약 모듈이 같은 종합 위험도 값을 사용하도록 수정했습니다.</p></section>
          <div class="portfolio-problem-arrow">→</div>
          <section class="portfolio-problem-step"><span>03 / RESULT</span><strong>화면과 분석 결과의 일관성 확보</strong><p>같은 분석 결과가 모듈마다 다른 구조로 처리되는 문제를 줄였고, 수정 후 샘플 로그를 다시 실행해 전체 흐름을 검증했습니다.</p></section>
        </div>
        <p class="portfolio-detail-note"><strong>추가 개선:</strong> 긴 로그에서 그래프가 과도하게 늘어나는 문제는 탐지용 원본 데이터는 유지하고 시각화용 데이터만 별도로 정리했습니다.</p>
      </div>`
  },
  minisoc: {
    summary: '자세히 보기 · 내가 한 일 / 문제 해결',
    html: `
      <div class="portfolio-detail-wrap">
        <div class="portfolio-detail-grid">
          <section class="portfolio-detail-card"><b>WHAT I DID</b><p>Nginx 접근 로그 파싱, HTTP 오류·Brute Force·Password Spraying·Night Login 탐지, 경보 JSON 저장, Flask /alert 수신, 사건 기록, 대시보드와 Markdown 일일 보고서를 하나의 흐름으로 연결했습니다.</p></section>
          <section class="portfolio-detail-card"><b>FROM DEMO TO LIVE</b><p>처음에는 sample_server.log를 한 번 읽는 방식이었지만, 이후 Docker Nginx의 access.log에 새로 추가되는 줄만 계속 읽는 live_monitor.py를 추가했습니다.</p></section>
        </div>
        <div class="portfolio-problem-flow">
          <section class="portfolio-problem-step"><span>01 / PROBLEM</span><strong>한 번 읽는 샘플만으로는 실시간 관제 흐름이 약함</strong><p>샘플 파일을 분석하고 종료되는 구조에서는 실제 웹 요청이 들어온 뒤 탐지와 대시보드 반영까지 이어지는 과정을 확인하기 어려웠습니다.</p></section>
          <div class="portfolio-problem-arrow">→</div>
          <section class="portfolio-problem-step"><span>02 / FIX</span><strong>증분 로그 감시와 반복 경보 제어</strong><p>실행 이후 새로 생긴 로그만 읽는 지속 감시 기능을 추가하고, 같은 경보가 계속 쌓이지 않도록 5분 쿨다운을 적용했습니다. 시간창이 없던 Password Spraying 조건도 300초 기준으로 보완했습니다.</p></section>
          <div class="portfolio-problem-arrow">→</div>
          <section class="portfolio-problem-step"><span>03 / RESULT</span><strong>실제 404 요청 → 탐지 → 대시보드까지 확인</strong><p>Docker Nginx에 존재하지 않는 경로를 요청해 404 로그를 만들고, http_error 탐지 → /alert 전달 → 사건 저장 → 대시보드 반영 순서를 직접 확인했습니다.</p></section>
        </div>
        <p class="portfolio-detail-note"><strong>실행 범위:</strong> 계정 잠금과 IP 차단은 안전한 실습을 위한 시뮬레이션입니다. LLM API가 없거나 실패하면 규칙 기반 fallback을 사용하도록 구성했습니다.</p>
      </div>`
  },
  capstone: {
    summary: '자세히 보기 · 내가 한 일 / 문제 해결',
    html: `
      <div class="portfolio-detail-wrap">
        <div class="portfolio-detail-grid">
          <section class="portfolio-detail-card"><b>WHAT I DID</b><p>2인 팀에서 장소 검색과 자동완성 결과를 앱 화면에 연결하는 부분을 구현했습니다. Retrofit으로 API 응답을 받고 RecyclerView/Adapter를 통해 검색 결과를 보여주고 선택할 수 있도록 구성했습니다.</p></section>
          <section class="portfolio-detail-card"><b>SERVICE FLOW</b><p>목적지와 도착 희망 시각을 입력하고, 위치·경로 정보를 이용해 이동 시간을 계산한 뒤 출발해야 할 시각을 안내하는 흐름으로 화면과 기능을 정리했습니다.</p></section>
        </div>
        <div class="portfolio-problem-flow">
          <section class="portfolio-problem-step"><span>01 / PROBLEM</span><strong>API 응답을 받는 것과 화면에서 선택하는 것은 별도 문제</strong><p>장소 검색 결과가 정상적으로 와도 그대로는 사용자가 고를 수 있는 목록이 되지 않아 데이터와 화면 상태를 연결하는 처리가 필요했습니다.</p></section>
          <div class="portfolio-problem-arrow">→</div>
          <section class="portfolio-problem-step"><span>02 / FIX</span><strong>검색 · 변환 · 표시 · 선택 역할 분리</strong><p>API 호출, 응답 데이터 변환, RecyclerView 표시, 항목 선택을 나눠 각 단계가 어디에서 실패하는지 확인할 수 있도록 구현했습니다.</p></section>
          <div class="portfolio-problem-arrow">→</div>
          <section class="portfolio-problem-step"><span>03 / RESULT</span><strong>검색부터 목적지 선택까지 사용자 흐름 구현</strong><p>검색어 입력 → 자동완성 목록 표시 → 원하는 장소 선택으로 이어지는 기본 흐름을 앱에서 동작하도록 만들었습니다.</p></section>
        </div>
      </div>`
  }
};

Object.entries(detailData).forEach(([id, detail]) => {
  const project = document.getElementById(id);
  if (!project) return;
  const details = project.querySelector('details');
  if (!details) return;
  const summary = details.querySelector('summary');
  if (summary) summary.textContent = detail.summary;
  details.querySelectorAll(':scope > *:not(summary)').forEach((node) => node.remove());
  details.insertAdjacentHTML('beforeend', detail.html);
});

const fimCard = [...document.querySelectorAll('.support-card')].find((card) => card.querySelector('h3')?.textContent.trim() === 'File Integrity Monitor');
if (fimCard && !fimCard.querySelector('details')) {
  fimCard.querySelector('.support-copy')?.insertAdjacentHTML('beforeend', `
    <details class="project-detail">
      <summary>자세히 보기 · 내가 한 일</summary>
      <div class="portfolio-detail-wrap">
        <div class="portfolio-detail-grid" style="grid-template-columns:1fr">
          <section class="portfolio-detail-card"><b>WHAT I DID</b><p>파일별 SHA-256 기준값과 현재 값을 비교해 생성·수정·삭제 상태를 구분하고, 변경 이력을 SQLite에 저장해 Flask 웹 화면에서 확인할 수 있도록 구성했습니다.</p></section>
          <section class="portfolio-detail-card"><b>IMPLEMENTATION POINT</b><p>단순히 “파일이 달라졌다”는 결과만 남기지 않고 어떤 파일이 언제 어떻게 바뀌었는지 확인할 수 있도록 해시 비교 결과와 변경 이력을 분리해 저장했습니다.</p></section>
        </div>
      </div>
    </details>`);
}
