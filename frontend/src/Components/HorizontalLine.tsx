import React from 'react'

interface HorizontalLineProps{
    width?: string;
    className?: string;

}

const HorizontalLine:React.FC<HorizontalLineProps> = ({width, className}) => {
  return (
    <hr
        className={`borde-t border-Netral-100 ${className}`}
        style={{width: width}}
    />
  )
}

export default HorizontalLine