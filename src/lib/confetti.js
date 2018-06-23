import confetti from 'canvas-confetti'

export const fireworks = () => {
  const DURATION_IN_MS = 7 * 1000
  const endTime = Date.now() + DURATION_IN_MS

  const firework = () => {
    confetti({
      startVelocity: 20,
      spread: 700,
      ticks: 200,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    })

    const done = Date.now() > endTime
    if (done) {
      return
    }

    setTimeout(firework, Math.random() * 700)
  }

  firework()
}

window.fireworks = fireworks
