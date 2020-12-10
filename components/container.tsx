import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode,
  narrow?: boolean,
  classes?: string
}

export default function Container({ children, narrow = false, classes = "" }: ContainerProps) {

  return (
    <div
      className={`mx-auto px-5 max-w-${narrow ? '3' : '6'}xl ${classes}`}
    >
      {children}
    </div>
  )
}
