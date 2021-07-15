import React, { useEffect } from 'react'
import ContentPegawai from './components/ContentPegawai'

function Pegawai({handleTabs}){
  useEffect(()=>{
    handleTabs("Pegawai")
  },[])
  return(
    <div>
      <ContentPegawai/>
    </div>
  )
}

export default Pegawai