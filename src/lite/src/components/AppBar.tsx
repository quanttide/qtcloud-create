// 顶部标题栏：单页展示，无压入页，不带回退
function AppBar() {
  return (
    <header className="appBar">
      <span className="appBarSlot" aria-hidden="true" />
      <h1 className="appBarTitle">量潮创意云</h1>
      <span className="appBarSlot" aria-hidden="true" />
    </header>
  )
}

export default AppBar
