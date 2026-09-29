import React, { useState } from 'react';
import { askPolarGuide, SUGGESTED_PROMPTS } from '../services/polarGuideService';

export default function PolarGuideDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'guide',
      timestamp: 'SYSTEM READY',
      text: `Welcome to **PolarSphere Scientific Guide**. 

I am your interactive portal for navigating India's high-latitude research data across Antarctica, the Arctic, the Southern Ocean, and the Himalaya.

You can ask me about station telemetry, expedition logistics, glacier mass balance, or polar datasets. Choose a prompt below to begin.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText) => {
    const q = queryText || input;
    if (!q.trim() || loading) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: q
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const result = await askPolarGuide(q);
      const guideMsg = {
        id: 'guide-' + Date.now(),
        sender: 'guide',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: result.answer,
        category: result.category,
        references: result.references,
        isMock: result.isMock
      };
      setMessages(prev => [...prev, guideMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'guide',
          timestamp: 'ERROR',
          text: 'Unable to process inquiry at this moment. Please check local connectivity.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-surface-container-lowest h-full border-l border-outline-variant/40 shadow-2xl flex flex-col justify-between"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/30 bg-surface-container/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary/40 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined !text-lg">smart_toy</span>
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-sm font-bold text-on-surface uppercase tracking-wider">
                Polar Guide // Scientific AI
              </h3>
              <p className="font-mono text-[10px] text-primary">
                NCPOR KNOWLEDGE ENGINE (STAGED FOR AI)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages(messages.slice(0, 1))}
              className="p-1.5 rounded text-outline hover:text-on-surface text-xs font-mono"
              title="Reset conversation"
            >
              <span className="material-symbols-outlined !text-lg">restart_alt</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined !text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Capsule */}
        <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/20 text-[11px] font-mono text-outline flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Verified reference data grounded in Ministry of Earth Sciences publications.</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] font-mono text-outline mb-1 px-1">
                {m.sender === 'user' ? 'RESEARCHER' : 'POLAR GUIDE AI'} • {m.timestamp}
              </div>
              <div
                className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-br-none font-medium'
                    : 'bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line font-['Inter']">
                  {m.text}
                </div>

                {/* References Box if present */}
                {m.references && m.references.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-outline-variant/20 text-[10px] font-mono text-primary space-y-1">
                    <div className="font-semibold text-outline-variant">INSTITUTIONAL CITATIONS:</div>
                    {m.references.map((ref, idx) => (
                      <div key={idx} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{ref}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono text-primary p-2">
              <span className="material-symbols-outlined !text-base animate-spin">progress_activity</span>
              <span>Querying PolarSphere scientific indices...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 border-t border-outline-variant/20 bg-surface-container-lowest">
          <div className="text-[10px] font-mono text-outline mb-1.5">SUGGESTED SCIENTIFIC PROMPTS:</div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                disabled={loading}
                className="text-[11px] font-['Space_Grotesk'] px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary/20 text-on-surface-variant hover:text-primary border border-outline-variant/30 transition-colors text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Field Bar */}
        <div className="p-4 border-t border-outline-variant/30 bg-surface-container/80 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about polar science, stations, or datasets..."
            className="flex-1 bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-outline-variant/40 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary font-['Inter']"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-fixed disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span className="material-symbols-outlined !text-base">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
