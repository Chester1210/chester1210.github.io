// music.js
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const miniPlay = document.getElementById('miniPlay');
  const miniProgressFill = document.getElementById('miniProgressFill');
  const themeToggle = document.getElementById('themeToggle');

  let isPlaying = false;
  let currentTime = 0;
  const duration = 209; // 3:29

  function togglePlay() {
    isPlaying = !isPlaying;
    miniPlay.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    if (isPlaying) {
      audio.play().catch(() => {});
      simulateProgress();
    } else {
      audio.pause();
    }
  }

  function simulateProgress() {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      currentTime += 1;
      const percent = (currentTime / duration) * 100;
      miniProgressFill.style.width = percent + '%';
      if (currentTime >= duration) {
        clearInterval(interval);
        isPlaying = false;
        miniPlay.innerHTML = '<i class="fas fa-play"></i>';
        currentTime = 0;
        miniProgressFill.style.width = '0%';
      }
    }, 1000);
  }

  miniPlay.addEventListener('click', togglePlay);

  // === 全局深浅色切换 + 持久化 ===
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // 加载保存的主题
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});