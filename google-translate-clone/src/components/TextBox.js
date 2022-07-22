import React from 'react';
import SelectDropdown from "./SelectDropdown.js"

export default function TextBox({
    selectedLanguage,
    style,
    setShowModal,
    textToTranslate,
    setTextToTranslate,
    translatedText,
    setTranslatedText
}) {

    const handleClick = () => {
        setTranslatedText('')
    }

    return (
        <div className={style}>
            <SelectDropdown
                selectedLanguage={selectedLanguage}
                style={style}
                setShowModal={setShowModal}
            />
            <textarea
                placeholder={style === 'input' ? 'Enter text' : 'Translation'}
                disabled={style === 'output' ? true : false}
                onChange={(e) => setTextToTranslate(e.target.value)}
                value={style === 'input' ? textToTranslate : translatedText}
            />
            {style === 'input' && (
                <div className="delete" onClick={handleClick}>⌫</div>
            )}
        </div>
    )
}