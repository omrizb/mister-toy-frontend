export function ColoredSentence({ children: txt, palette = 'rainbow' }) {

    const palettes = {
        dark: ['#e03131', '#c2255c', '#9c36b5', '#6741d9', '#3b5bdb', '#1971c2', '#0c8599', '#099268', '#2f9e44', '#66a80f', '#f08c00', '#e8590c', '#a45117', '#825b3a', '#5f5746', '#7e7416', '#84a513'],
        rainbow: ['#e5533d', '#e58e6e', '#e5c700', '#2cad2c', '#1878db', '#7d60c3', '#d46fd4']
    }

    const selectedPalette = palettes[palette]

    const words = txt.split(' ')

    function addSpace(arr, idx) {
        return (arr.length - 1 === idx) ? '' : ' '
    }

    return (
        <>
            {words.map((word, idx) => {
                const color = selectedPalette[idx % selectedPalette.length]
                return <span key={idx} style={{ color }}>{word}{addSpace(words, idx)}</span>
            })}
        </>
    )
}