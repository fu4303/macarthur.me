import Link from 'next/link'
import { useRouter } from 'next/router';
import Logo from './logo';
import { useEffect, useState } from 'react';

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

  return (
    <nav className={`py-5 px-8 w-full font-bold flex items-center justify-between ${classes}`}>

      <span className={`transition-opacity font-bold text-3xl ${shouldHideLogo ? 'opacity-0' : ''}`}>
        <Logo strokeWidth="2" asLink={true} />
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
