import React, { useEffect } from 'react'
import ContentLaporan from './components/ContentLaporan'

function Laporan({handleTabs}){
  useEffect(()=>{
    handleTabs("Laporan")
  },[])
  return(
    <div>
      <ContentLaporan/>
    </div>
  )
}

export default Laporan