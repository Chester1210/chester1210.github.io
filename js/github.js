const GITHUB_USERNAME = 'Chester1210';  // 真实用户名

async function loadGithubData() {
  const container = document.getElementById('repo-list');
  const repoCountEl = document.getElementById('repo-count');
  const totalStarsEl = document.getElementById('total-stars');
  const chartEl = document.getElementById('contribution-chart');

  try {
    // 获取所有仓库（per_page=100 以覆盖大部分）
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    const repos = await res.json();

    if (!res.ok) throw new Error('API 请求失败');

    // 计算总 Stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // 更新统计
    repoCountEl.textContent = repos.length;
    totalStarsEl.textContent = totalStars;

    // 更新贡献图（真实 API）
    chartEl.src = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&theme=transparent&hide_border=true&bg_color=0d1117&title_color=8b5cf6&text_color=c9d1d9`;

    // 最近 5 个项目
    const recentRepos = repos.slice(0, 5);
    container.innerHTML = recentRepos.map(repo => `
      <div class="repo-item">
        <div>
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p style="margin: 4px 0; font-size: 0.85rem; opacity: 0.9;">
            ${repo.description || 'No description available.'}
          </p>
        </div>
        <div class="meta">
          <span class="lang">${repo.language || 'None'}</span>
          <span>★ ${repo.stargazers_count}</span>
          <br>
          <small>更新于 ${new Date(repo.updated_at).toLocaleDateString('zh-CN')}</small>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:#ff6b6b; text-align:center;">加载失败：${err.message} (请检查网络或 GitHub API 限额)</p>`;
    repoCountEl.textContent = 'N/A';
    totalStarsEl.textContent = 'N/A';
    chartEl.src = 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='; // 空图占位
  }
}

// 页面加载后执行
document.addEventListener('DOMContentLoaded', loadGithubData);