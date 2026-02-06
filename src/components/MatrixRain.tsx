import { useEffect, useRef } from 'react'

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let columns: number[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const fontSize = 14
      const columnCount = Math.floor(canvas.width / fontSize)
      columns = Array(columnCount)
        .fill(0)
        .map(() => Math.random() * -100)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF'
    const fontSize = 14

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`

      columns.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize

        // 領頭字符 - 亮白
        ctx.fillStyle = 'rgba(200, 255, 200, 0.9)'
        ctx.fillText(char, x, y * fontSize)

        // 尾跡
        for (let j = 1; j < 15; j++) {
          const trailY = (y - j) * fontSize
          if (trailY > 0) {
            const opacity = 0.6 - (j / 15) * 0.6
            ctx.fillStyle = `rgba(0, ${180 - j * 8}, ${80 - j * 4}, ${opacity})`
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, trailY)
          }
        }

        if (y * fontSize > canvas.height && Math.random() > 0.98) {
          columns[i] = 0
        } else {
          columns[i] = y + 0.4
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40" />
}
