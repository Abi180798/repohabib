import React, { useEffect } from 'react'
import ContentSupplier from './components/ContentSupplier'

function Supplier({handleTabs}){
  useEffect(()=>{
    handleTabs("Supplier")
  },[])
  return(
    <div>
      <ContentSupplier/>
    </div>
  )
}

export default Supplier