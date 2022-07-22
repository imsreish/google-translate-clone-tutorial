import { useState, useEffect } from 'react';
import axios from 'axios';
import Arrows from "./components/Arrows.js"
import Button from "./components/Button.js"
import Modal from "./components/Modal.js"
import TextBox from "./components/TextBox.js"

function App() {
  const [showModal, setShowModal] = useState(null)
  const [inputLanguage, setInputLanguage] = useState('English')
  const [outputLanguage, setOutputLanguage] = useState('German')
  const [languages, setLanguages] = useState(null)
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('')

  console.log('inputLanguage', inputLanguage)

  const getLanguages = async () => {
    const response = await axios('http://localhost:8000/languages')
    setLanguages(response.data)
  }

  const translate = async () => {
    const data = {
      textToTranslate, outputLanguage, inputLanguage
    }
    const response = await axios('http://localhost:8000/translation', {
      params: data
    })
    setTranslatedText(response.data)
  }

  console.log('translated', translatedText)

  useEffect(() => {
    getLanguages();
  }, [])

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }

  console.log('showModal', showModal)

  return (
    <div className="App">
      {!showModal && <>
        <TextBox
          selectedLanguage={inputLanguage}
          setShowModal={setShowModal}
          setTextToTranslate={setTextToTranslate}
          textToTranslate={textToTranslate}
          setTranslatedText={setTranslatedText}
          style="input"
        />
        <div className="arrow-container" onClick={handleClick}>
          <Arrows />
        </div>
        <TextBox
          selectedLanguage={outputLanguage}
          setShowModal={setShowModal}
          translatedText={translatedText}
          style="output"
        />
        <div className="button-container" onClick={translate}>
          <Button />
        </div>
      </>}

      {showModal && <Modal
        setShowModal={setShowModal}
        languages={languages}
        chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
        setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
      />}
    </div>
  );
}

export default App;
