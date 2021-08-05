import React from 'react'

function LoadingScreen() {

  const style = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  return (
    <div style={style}>
      <img src="imgs/loading" />
    </div>
  )
}

export default LoadingScreen