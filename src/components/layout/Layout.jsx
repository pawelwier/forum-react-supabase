import Footer from "./Footer"
import Header from "./Header"

// TODO: refactor CSS element position etc

function Layout({ children, user }) {
  return (
    <div className="contents">
      <Header user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout