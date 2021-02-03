import React, { useEffect, useState } from 'react'

const createText = (ctx, { text, textColor, width, height }) => {
  const lines = text.split("\n")
  const fontSize = height / lines.length;
  const lineHeight = 1

  ctx.font = `bold ${fontSize}px Noto Sans JP`
  ctx.textAlign = "left";
  // TODO: 英字
  ctx.textBaseline = "top";
  ctx.strokeStyle = "#fff"
  ctx.fillStyle = textColor 

  let nextHeight = 0;
  lines.forEach((line) => {
    ctx.strokeText(line, 0, nextHeight, width);
    ctx.fillText(line, 0, nextHeight, width)

    nextHeight += lineHeight * fontSize
  })
}

function Canvas({ text, textColor, width, height }) {
  const [png, setPng] = useState(null)

  useEffect(() => {
    const canvasElem = document.createElement('canvas')
    canvasElem.width = width
    canvasElem.height = height
    const ctx = canvasElem.getContext('2d')

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "transparent";

    createText(ctx, { text, textColor, width, height })

    setPng(canvasElem.toDataURL())
  }, [height, text, textColor, width])

  return (
    <div>
      {png && (
        <div className="comp" style={{ display: 'flex' }}>
          <img alt="light" src={png} />
          <img alt="dark" src={png} style={{ background: '#222' }} />
        </div>
      )}
    </div>
  )
}

export default Canvas