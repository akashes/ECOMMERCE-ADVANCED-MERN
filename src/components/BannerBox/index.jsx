import React from 'react'
import { Link } from 'react-router-dom'

const BannerBox = ({img,link}) => {
  return (
       <div className="box bannerBox overflow-hidden rounded-lg group">
        <Link to={link}>
        <img src={img}  loading='lazy' alt="advertisement-banner" className=' w-full transition-all group-hover:scale-105 group-hover:rotate-1' />
        </Link>
    </div>
  )
}

export default BannerBox

