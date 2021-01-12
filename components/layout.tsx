import Footer from './footer'
import Meta from './meta'
import Nav from './nav';
import Container from './container';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode,
  narrow?: boolean
}

export default function Layout({ children, narrow = false }: LayoutProps) {
  return (
    <>
      <Meta />
        <Nav />
        <main id="main">
          <Container narrow={narrow} classes={"px-4"}>
            {children}
          </Container>
        </main>
      <Footer />
    </>
  )
}
