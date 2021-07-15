import React, { useEffect } from 'react'
import ContentServis from './components/ContentServis'

function Servis({handleTabs}){
  useEffect(()=>{
    handleTabs("Service")
  },[])
  return(
    <div>
      <ContentServis/>
    </div>
  )
}

export default Servis