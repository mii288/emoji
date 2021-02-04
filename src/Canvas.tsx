/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

interface EmojiSetting {
  text: string
  textColor: string
  width: number
  height: number
}

const getTextSize = (
  ctx: CanvasRenderingContext2D,
  text: EmojiSetting['text']
) => {
  const {
    actualBoundingBoxAscent,
    actualBoundingBoxDescent,
    width,
  } = ctx.measureText(text)

  return { width, height: actualBoundingBoxDescent + actualBoundingBoxAscent }
}

const createText = (
  ctx: CanvasRenderingContext2D,
  { text, textColor, width, height }: EmojiSetting
) => {
  const lines = text.split('\n')
  const lineWidth = width
  const lineHeight = height / lines.length

  const fontSize = lineHeight

  ctx.font = `bold ${fontSize}px Noto Sans JP`
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = fontSize * 0.1
  ctx.fillStyle = textColor

  let nextY = 0
  lines.forEach((line, index) => {
    ctx.scale(1, 1)
    const textSize = getTextSize(ctx, line)
    const textHeight = textSize.height * lineHeight

    const posY = lineHeight * index

    ctx.save()
    ctx.scale(
      textSize.width < lineWidth ? lineWidth / textSize.width : 1,
      textHeight < lineHeight ? lineHeight / textHeight : 1
    )
    ctx.strokeText(line, 0, posY, lineWidth)
    ctx.fillText(line, 0, posY, lineWidth)
    ctx.restore()

    nextY = textHeight
  })
}

type Props = EmojiSetting
function Canvas({ text, textColor, width, height }: Props): JSX.Element {
  const [png, setPng] = useState<null | string>(null)

  useEffect(() => {
    const canvasElem = document.createElement('canvas')
    canvasElem.width = width
    canvasElem.height = height
    const ctx = canvasElem.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'transparent'

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
