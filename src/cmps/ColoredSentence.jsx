export function ColoredSentence({ children: txt, palette = 'longRainbow' }) {

    const palettes = {
        rainbow: ['#e5533d', '#e58e6e', '#e5c700', '#2cad2c', '#1878db', '#7d60c3', '#d46fd4'],
        longRainbow: ['#d32f2f', '#e64a19', '#f57c00', '#fbc02d', '#afb42b', '#689f38', '#388e3c', '#00796b', '#0288d1', '#1976d2', '#303f9f', '#512da8', '#7b1fa2', '#c2185b'],
    }

    const selectedPalette = palettes[palette]

    const words = txt.split(' ')

    return (
        <>
            {words.map((word, idx) => {
                const color = selectedPalette[idx % selectedPalette.length]
                return <span key={idx} style={{ color }}>{word}{idx < words.length - 1 ? ' ' : ''}</span>
            })}
        </>
    )
}