import Footer from './footer'
import Meta from './meta'
import Nav from './nav';
import Container from './container';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Meta />
        <Nav />
        <main>
          <Container>
            {children}
          </Container>
        </main>
      <Footer />
    </>
  )
}
