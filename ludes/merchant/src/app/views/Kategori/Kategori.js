import React, { useEffect } from 'react'
import ContentKategori from './components/ContentKategori'

function Kategori({handleTabs}){
  useEffect(()=>{
    handleTabs("Kategori")
  },[])
  return(
    <div>
      <ContentKategori/>
    </div>
  )
}

export default Kategori