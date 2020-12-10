import Container from './container'

export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <Container classes="text-center">
        &copy; Alex MacArthur | {new Date().getFullYear()}
      </Container>
    </footer>
  )
}
