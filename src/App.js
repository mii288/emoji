import './App.css';
import Canvas from './Canvas';
import { useState } from 'react';

function App() {
  const download = console.log
  const [text, setText] = useState('やば\nそう')
  const [textColor] = useState('#000')
  const width = 128

  return (
    <div className="App">
      <h1>Emoji Generator</h1>
        <div className="js-generator">
          <div className="background">
              <Canvas text={text} textColor={textColor} width={width} height={width} />
              {text && <span className="string">『{text}』</span>}
          </div>
        <textarea placeholder="絵文字にしたいテキストを入力" value={text} onChange={e => setText(e.target.value)}/>
          <button className="button-download" onClick={download}>ダウンロード</button>
      </div>
    </div>
  );
}

export default App;
