import LogoutButton from "../utils/LogoutButton"

function Footer() {
  return (
    <div className="
      fixed top-[calc(100%_-_6rem)]
      w-full h-24
      flex justify-end items-center
      p-6
      bg-sky-700
    ">
      <LogoutButton />
    </div>
  )
}

export default Footer