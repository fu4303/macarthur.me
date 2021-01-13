import Container from './container'

export default function Footer() {
  return (
    <footer className="mt-16 py-6 px-6 border-t-2 border-gray-200">
      <Container classes="text-center">
        <span>
          &copy; Alex MacArthur | {new Date().getFullYear()}
        </span>
      </Container>
    </footer>
  )
}
