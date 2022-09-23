import React, { SVGProps } from 'react'

interface IProps extends SVGProps<SVGElement> {
  symbol: string
}

const Icon = React.forwardRef<SVGSVGElement, IProps>((props, ref) => {
  const { children, symbol, className = '', ...restProps } = props

  return (
    <svg {...restProps} className={`icon ${className}`} aria-hidden="true" ref={ref}>
      <use xlinkHref={`#${symbol}`} />
    </svg>
  )
})

export default Icon
