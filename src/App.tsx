import { useState, useEffect, useRef } from 'react'
import ChatBot from './components/ChatBot'
import MatrixRain from './components/MatrixRain'

type Section = 'home' | 'projects' | 'skills' | 'contact'

const navItems: { id: Section; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
]

const projects = [
  {
    name: 'Gaming Chat System',
    desc: 'Real-time messaging with VIP features and WebSocket',
    tech: ['React', 'TypeScript', 'WebSocket', 'Zustand'],
    status: 'Live' as const,
  },
  {
    name: 'Live Capture Module',
    desc: 'CDN-integrated image capture and processing system',
    tech: ['TypeScript', 'Vite', 'CDN API'],
    status: 'Live' as const,
  },
  {
    name: 'Game Records Interface',
    desc: 'Comprehensive game history visualization dashboard',
    tech: ['React', 'SWR', 'Tailwind CSS'],
    status: 'Refactoring' as const,
  },
  {
    name: 'UE5 Platformer',
    desc: '3D platformer game with Super Mario-style mechanics',
    tech: ['Unreal Engine 5', 'C++', 'Blueprints'],
    status: 'In Progress' as const,
  },
]

const skills = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Zustand / SWR', level: 85 },
  ],
  tools: [
    { name: 'Vite / Build Tools', level: 88 },
    { name: 'Git', level: 85 },
    { name: 'WebSocket', level: 82 },
    { name: 'Unreal Engine 5', level: 70 },
  ],
}

const contacts = [
  { label: 'Email', value: 'enzo@example.dev' },
  { label: 'GitHub', value: 'github.com/enzo' },
  { label: 'LinkedIn', value: 'linkedin.com/in/enzo' },
]

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300)
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Matrix Rain Canvas */}
      <MatrixRain />

      {/* 暗色遮罩 */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Scan Lines */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] opacity-[0.03]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 px-6 py-5 transition-all duration-700 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold tracking-widest text-white">ENZO</div>
            <div className="hidden sm:block text-xs text-white/40 tracking-widest border-l border-white/20 pl-3">
              DEVELOPER
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`text-sm tracking-widest transition-all ${
                  activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-0.5 bg-white/80" />
            <span className="w-4 h-0.5 bg-matrix" />
            <span className="w-6 h-0.5 bg-white/80" />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
        <div className="flex justify-around py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`px-4 py-2 text-xs tracking-wider transition-all ${
                activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main
        className={`relative z-10 min-h-screen flex items-center px-6 pt-24 pb-24 md:pb-12 transition-all duration-700 delay-200 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full max-w-4xl mx-auto">
          {/* HOME */}
          {activeSection === 'home' && (
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="w-2 h-2 bg-matrix rounded-full animate-pulse" />
                <span className="text-sm text-white/70">Available for work</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                ENZO
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-matrix to-transparent" />
                <h2 className="text-xl md:text-2xl text-white/90 tracking-wide">Frontend Developer</h2>
              </div>

              <p className="text-lg text-white/60 max-w-xl leading-relaxed mb-12">
                專注於遊戲平台前端開發，使用 React、TypeScript、Tailwind CSS
                打造高效能、響應式的使用者介面。
              </p>

              <div className="grid grid-cols-3 gap-6 mb-12">
                {[
                  { value: '3+', label: 'Years Experience' },
                  { value: '50+', label: 'Projects Done' },
                  { value: '∞', label: 'Lines of Code' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-white/50 tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveSection('projects')}
                  className="px-8 py-4 border border-white/30 text-white font-semibold tracking-wide hover:bg-white/10 transition-all"
                >
                  View Projects
                </button>
                <button
                  onClick={() => setActiveSection('contact')}
                  className="px-8 py-4 border border-white/30 text-white font-semibold tracking-wide hover:bg-white/10 transition-all"
                >
                  Contact Me
                </button>
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {activeSection === 'projects' && (
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
              <p className="text-white/50 mb-12">Featured works and experiments</p>

              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="group p-6 bg-white/[0.03] border border-white/10 hover:border-matrix/50 hover:bg-white/[0.05] transition-all cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white group-hover:text-matrix transition-colors">
                            {project.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              project.status === 'Live'
                                ? 'bg-matrix/20 text-matrix'
                                : project.status === 'Refactoring'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm mb-3">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span key={t} className="text-xs px-2 py-1 bg-white/5 text-white/60 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-white/30 group-hover:text-matrix group-hover:translate-x-1 transition-all text-2xl">
                        →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {activeSection === 'skills' && (
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Skills</h2>
              <p className="text-white/50 mb-12">Technologies I work with</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm text-white/60 tracking-widest mb-6 border-b border-white/10 pb-2">
                    FRONTEND
                  </h3>
                  <div className="space-y-5">
                    {skills.frontend.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-white/50">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-matrix to-matrix-dark rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-white/60 tracking-widest mb-6 border-b border-white/10 pb-2">
                    TOOLS & OTHER
                  </h3>
                  <div className="space-y-5">
                    {skills.tools.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-white/50">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-matrix to-matrix-dark rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeSection === 'contact' && (
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact</h2>
              <p className="text-white/50 mb-12">Let's work together</p>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  {contacts.map((item) => (
                    <div
                      key={item.label}
                      className="group p-5 bg-white/[0.03] border border-white/10 hover:border-matrix/50 cursor-pointer transition-all"
                    >
                      <div className="text-xs text-white/40 mb-1">{item.label}</div>
                      <div className="text-white group-hover:text-matrix transition-colors">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-matrix/50 focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-matrix/50 focus:outline-none transition-colors"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-matrix/50 focus:outline-none transition-colors resize-none"
                  />
                  <button className="w-full py-4 border border-white/30 text-white font-semibold tracking-wide hover:bg-white/10 transition-all">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 hidden md:block px-6 py-4 bg-black/50 backdrop-blur border-t border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-white/30">
          <div>© 2026 Enzo. Built with React + TypeScript + Tailwind</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-matrix rounded-full" />
            <span>Online</span>
          </div>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}

export default App
