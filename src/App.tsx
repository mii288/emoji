import './App.css'
import Canvas from './Canvas'
import { useState } from 'react'

function App(): JSX.Element {
  const [text, setText] = useState('やば\nそう')
  const [textColor] = useState('#000')
  const width = 128

  return (
    <div className="App">
      <h1>Emoji Generator</h1>
      <div className="js-generator">
        <div className="background">
          <Canvas
            text={text}
            textColor={textColor}
            width={width}
            height={width}
          />
        </div>
        <textarea
          rows={3}
          placeholder="絵文字にしたいテキストを入力"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  )
}

export default App
