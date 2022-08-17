import React, { ReactPropTypes } from 'react'
import styled from 'styled-components'
import "./ProgressBar.css"

interface props {
    value : number,
    max : number,
    color : string,
    width : any,
    
}




const ProgressBar = ({value,max,color,width}:props) => {      
  return (
      <div className='Container'><progress className="eee" value={value} max={max} color="#E6878A" /></div>
    
  )
}

export default ProgressBar