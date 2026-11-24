// 关于：文字取自 qtcloud-create docs/intro（只换载体，不改写；正本在仓内 docs/intro）
// 放在展示页末尾，不另开页面——不给内容加层级
function About() {
  return (
    <section className="prose" aria-labelledby="about-title">
      <h2 id="about-title">关于</h2>
      <p>
        qtcloud-create 是量潮创意工作的<strong>工作台</strong>：把租户、工作区、素材/资源这三级目录变成能看、能传的界面。
      </p>
      <p>工作台只回答三个问题：<strong>谁的、哪个作品、里面有什么。</strong></p>
      <p>
        数据就是 git 仓里的文件（quanttide-profile-of-creative-work 等）。工作台不建数据库——关掉它，git 里的一切照旧。
      </p>
    </section>
  )
}

export default About
