import Layout from './layout'
import Container from './container'

export default function PageLayout ({children}) {
  return (
    <Layout>
      <Container>
        {children}
      </Container>
    </Layout>
  )
}
