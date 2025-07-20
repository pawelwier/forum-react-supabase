import { NavLink } from "react-router";

function Header({user}) {
  return (
    <div className="
      fixed
      w-full h-16 px-4
      flex justify-between items-center
      bg-sky-700
      uppercase
    ">
      <div className="flex gap-4 text-3xl">
        <NavLink to="/" className="!text-white">Forms</NavLink>
        <NavLink to="/forum" className="!text-white">Forum</NavLink>
      </div>
      <div className="text-xl">
        {user?.email}
      </div>
    </div>
  )
}

export default Header