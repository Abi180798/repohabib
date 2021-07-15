import React, { useEffect } from 'react'
import ContentStok from './components/ContentStok'

function Stok({handleTabs}){
  useEffect(()=>{
    handleTabs("Stok")
  },[])
  return(
    <div>
      <ContentStok/>
    </div>
  )
}

export default Stok