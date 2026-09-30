// ── 페이지 전환 ──────────────────────────────
function showPage(pageId) {
  // 모든 페이지 숨기기
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // 선택한 페이지 보이기
  document.getElementById('page-' + pageId).classList.add('active');

  // 네비 active 표시
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // 스크롤 맨 위로
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 페이드인 다시 실행
  initFadeIn();

  // Home 페이지면 타이핑 효과 재실행
  if (pageId === 'home') initTypewriter();
}

// ── 스크롤 페이드인 ───────────────────────────
function initFadeIn() {
  const els = document.querySelectorAll('.page.active .fade-in');
  // 이미 visible 인 요소는 건드리지 않음
  const toAnimate = [...els].filter(el => !el.classList.contains('visible'));

  // 약간의 딜레이 후 관찰 시작 (페이지 전환 애니메이션 이후)
  setTimeout(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    toAnimate.forEach(el => io.observe(el));
  }, 80);
}

// ── 타이핑 효과 ───────────────────────────────
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const text = '안녕하세요';
  el.textContent = '';
  let i = 0;
  clearInterval(window._twTimer);
  window._twTimer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(window._twTimer);
  }, 90);
}

// ── 초기 실행 ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
  initTypewriter();
});
