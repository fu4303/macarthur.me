import Link from 'next/link'

const navItems = [
  {
    name: "Posts",
    link: "/posts"
  },
  {
    name: "Projects",
    link: "/projects"
  },
  {
    name: "About",
    link: "/about"
  }
];

const Nav = ({classes = ''}) => {
  return (
    <nav className={`py-5 px-8 w-full font-bold flex items-center justify-between ${classes}`}>

      <span className="font-bold text-3xl">
        <Link href="/">
          Alex MacArthur
        </Link>
      </span>

      <ul className="flex space-x-4 justify-end">
        {navItems.map(item => {
          return (
            <li className="text-2xl font-thin text-gray-500 hover:text-white" key={item.link}>
              <Link href={item.link}>
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav;
