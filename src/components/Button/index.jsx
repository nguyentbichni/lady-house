import * as S from './styles'

const Button = ({ type, htmlType, children, ...rest }) => {
  const handleClick = (e) => {
    const button = e.currentTarget

    const circle = document.createElement('span')
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`
    circle.classList.add('ripple')

    const ripple = button.getElementsByClassName('ripple')[0]

    if (ripple) {
      ripple.remove()
    }

    button.appendChild(circle)
  }

  return (
    <S.Button type={htmlType} styleType={type} onMouseDown={handleClick} {...rest}>
      {children}
    </S.Button>
  )
}

export default Button
