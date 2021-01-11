const Arrow = (props) => {
  return (
    <span {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path className="stroke-current" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </span>
  )
}

const Button = ({ children, classes = "", naked = false, ...otherProps}) => {
  const defaultClasses = "transition-all inline-flex items-center space-x-2 ";
  const buttonClasses = naked
    ? "text-purple-400 hover:text-purple-500"
    : "text-white bg-purple-400 hover:text-white hover:bg-purple-500 px-4 py-2 rounded-md";

  return (
    <a {...otherProps} className={defaultClasses + buttonClasses + classes}>
      <span>
        {children}
      </span>
      <Arrow className="block h-6 w-6" />
    </a>
  )
}

export default Button;
