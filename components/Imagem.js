import html2canvas from 'html2canvas';
import React, { useState } from 'react'

const Imagem = () => {

    const [screenshotUrl, setScreenshotUrl] = useState('');

    const handleScreenshot = ({id}) => {
        const element = document.getElementById({id});
        html2canvas(element).then((canvas) => {
            const url = canvas.toDataURL();
            setScreenshotUrl(url);
        }).catch((error) => {
            console.error('Erro ao tirar o print:', error);
        });
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = screenshotUrl;
        link.download = 'screenshot.png';
        link.click();
    };

    return (
        <>
            <button onClick={handleScreenshot}>Tirar print</button>
            <button onClick={handleDownload}>
                Baixar print
            </button>
        </>
    )
}

export default Imagem
