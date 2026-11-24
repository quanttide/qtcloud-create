// 关于页：文字取自 qtcloud-create docs/intro（只换载体，不改写；正本在仓内 docs/intro）
function About() {
  return (
    <main className="prose">
      <h2>创意工作台介绍</h2>
      <p>
        qtcloud-create 是量潮创意工作的<strong>工作台</strong>：把租户、工作区、素材/资源这三级目录变成能看、能传的界面。
      </p>

      <h2>三级结构</h2>
      <pre>{`租户 → 工作区 → 素材/资源`}</pre>
      <ul>
        <li>
          <strong>租户</strong>——创意项目属于谁：quanttide-founder（创始人个人）、quanttide-tech（量潮科技），互不混放
        </li>
        <li>
          <strong>工作区</strong>——一部作品一个目录：urban-romance（职场言情）、rebirth-romance（重生言情）
        </li>
        <li>
          <strong>素材/资源</strong>——工作区里的图片与视频：images/、videos/
        </li>
      </ul>
      <p>工作台只回答三个问题：<strong>谁的、哪个作品、里面有什么。</strong></p>

      <h2>边界</h2>
      <p>
        不要时间线、不要迭代条目、不要版本对比、不要迁出按钮、不要生成画布。过程留痕发生在 git 提交历史里，工作台不重复做这件事。
      </p>

      <h2>与邻居的分工</h2>
      <ul>
        <li>小说原文在 quanttide-founder 的 fiction 仓——写作地，人维护，不动</li>
        <li>方法与教程在 quanttide-create 域仓的 docs/</li>
        <li>立项后的成片生产在 quanttide-drama</li>
      </ul>

      <h2>事实源</h2>
      <p>
        数据就是 git 仓里的文件（quanttide-profile-of-creative-work 等）。工作台不建数据库——关掉它，git 里的一切照旧。
      </p>
    </main>
  )
}

export default About
