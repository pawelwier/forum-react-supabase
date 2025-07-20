import { NavLink } from "react-router";

function Header() {
  return (
    <div className="
      fixed
      w-full h-16
      flex justify-center items-center
      bg-sky-700
      text-3xl uppercase
    ">
      <NavLink to="/" className="px-4 !text-white">Forms</NavLink>
      <NavLink to="/forum" className="px-4 !text-white">Forum</NavLink>
    </div>
  )
}

export default Header