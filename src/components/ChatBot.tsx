import { useState, useRef, useEffect } from 'react'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `你是 Enzo 的個人網站助手。Enzo 是一位專注於遊戲平台開發的前端工程師。

關於 Enzo：
- 技術棧：React、TypeScript、Tailwind CSS、Zustand、SWR
- 經驗：3+ 年前端開發經驗
- 專長：遊戲平台 UI、即時聊天系統、WebSocket 應用
- 興趣：Unreal Engine 5 遊戲開發

請用友善、專業的語氣回答訪客的問題。回答請簡潔，使用繁體中文。`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好！我是 Enzo 的 AI 助手，有什麼我可以幫你的嗎？' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [displayedContent, setDisplayedContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, displayedContent])

  const typeWriter = (text: string, onComplete?: () => void) => {
    setIsTyping(true)
    setDisplayedContent('')
    let index = 0

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedContent((prev) => prev + text[index])
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        onComplete?.()
      }
    }, 20)

    return () => clearInterval(interval)
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages, userMessage],
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      if (!response.ok) throw new Error('API 請求失敗')

      const data = await response.json()
      const assistantContent = data.choices[0]?.message?.content || '抱歉，我無法回應。'

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      typeWriter(assistantContent, () => {
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1].content = assistantContent
          return updated
        })
      })
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [...prev, { role: 'assistant', content: '抱歉，發生錯誤了。請稍後再試。' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickQuestions = ['技術棧是什麼？', '有哪些專案？', '如何聯繫？']

  return (
    <>
      {/* 聊天按鈕 */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #00ffaa 0%, #00aa77 100%)',
          boxShadow: '0 0 30px rgba(0, 255, 170, 0.4)',
        }}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* 聊天視窗 */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: '500px',
            maxHeight: 'calc(100vh - 150px)',
            background: 'rgba(0, 0, 0, 0.95)',
            border: '1px solid rgba(0, 255, 170, 0.3)',
            boxShadow: '0 0 40px rgba(0, 255, 170, 0.15)',
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-3"
            style={{
              background: 'rgba(0, 255, 170, 0.1)',
              borderBottom: '1px solid rgba(0, 255, 170, 0.2)',
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #00ffaa, #00aa77)' }}
            >
              AI
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">Enzo's Assistant</div>
              <div className="text-xs text-white/50 flex items-center gap-1">
                <span className="w-2 h-2 bg-[#00ffaa] rounded-full animate-pulse" />
                Powered by Groq
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => {
              const isLast = index === messages.length - 1
              const isAssistant = msg.role === 'assistant'
              const showTyping = isLast && isAssistant && isTyping
              const content = showTyping ? displayedContent : msg.content

              return (
                <div key={index} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                      isAssistant ? 'bg-white/10 text-white rounded-tl-sm' : 'bg-[#00ffaa]/20 text-white rounded-tr-sm'
                    }`}
                    style={{
                      border: isAssistant ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0, 255, 170, 0.3)',
                    }}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {content}
                      {showTyping && <span className="inline-block w-2 h-4 bg-[#00ffaa] ml-1 animate-pulse" />}
                    </p>
                  </div>
                </div>
              )
            })}

            {isLoading && !isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/10">
                  <div className="flex gap-1.5">
                    <span
                      className="w-2 h-2 bg-[#00ffaa] rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-[#00ffaa] rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-[#00ffaa] rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-3"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="輸入訊息..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all disabled:opacity-50"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2.5 rounded-xl font-medium transition-all disabled:opacity-30"
                style={{
                  background: 'linear-gradient(135deg, #00ffaa 0%, #00aa77 100%)',
                }}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q)
                    setTimeout(() => sendMessage(), 100)
                  }}
                  disabled={isLoading}
                  className="flex-shrink-0 px-3 py-1.5 text-xs rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
