import Footer from "./Footer"
import Header from "./Header"

// TODO: refactor CSS element position etc

function Layout({ children }) {
  return (
    <div className="contents">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout