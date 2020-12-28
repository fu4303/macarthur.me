import Container from './container'

export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <Container classes="text-center">
        <span>
          &copy; Alex MacArthur | {new Date().getFullYear()}
        </span>
      </Container>
    </footer>
  )
}
