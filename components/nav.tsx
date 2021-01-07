import Link from 'next/link'
import { useRouter } from 'next/router';
import Logo from './logo';
import { useEffect, useState } from 'react';
import { request } from 'https';

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

const Nav = ({classes = '', isAbsolute = false}) => {
  const router = useRouter();
  const [shouldHideLogo, setShouldHideLogo] = useState(() => {
    return router.route === '/';
  });

  useEffect(() => {
    const handleRouteChange = (url) => {
      setShouldHideLogo(url === '/');
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, []);

  const positionClass = isAbsolute ? "absolute" : "relative";

  return (
    <nav className={`z-10 py-10 px-4 md:px-8 w-full font-bold flex items-center justify-between ${positionClass}`}>

      <span className={`flex-none font-bold text-3xl ${shouldHideLogo ? 'opacity-0' : ''}`}>
        <Logo asLink={true} />
      </span>

      <label
        className="cursor-pointer relative z-20 lg:hidden"
        htmlFor="menuToggle">
        Toggle Menu
      </label>

      <div className="menu-toggler fixed w-full left-0 top-0 h-0 lg:relative lg:h-auto lg:l-0">
        <input type="checkbox" id="menuToggle" className="relative z-0 opacity-0 lg:hidden" />

        <div className="
          menu-toggler-items
          top-0
          absolute
          lg:relative
          transition-all
          transform
          translate-x-full
          opacity-0
          p-10
          flex
          flex-col
          justify-center
          bg-white
          h-screen
          w-screen
          lg:p-0
          lg:relative
          lg:top-auto
          lg:translate-x-0
          lg:opacity-100
          lg:bg-none
          lg:h-auto
          lg:w-auto
          lg:block
        ">
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0 justify-end">
            {navItems.map(item => {
              return (
                <li
                className="text-4xl lg:text-xl font-light lg:text-gray-500 hover:text-gray-900 lg:font-200"
                key={item.link}
                >
                  <Link href={item.link}>
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
