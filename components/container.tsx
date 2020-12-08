import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode,
  narrow?: boolean
}

export default function Container({ children, narrow = false }: ContainerProps) {

  return (
    <div className={`mx-auto px-5 max-w-${narrow ? '3' : '6'}xl`}>
      {children}
    </div>
  )
}
