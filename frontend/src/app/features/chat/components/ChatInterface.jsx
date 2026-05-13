import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function ChatInterface({ onSendMessage, messages = [], user, isLoading: parentIsLoading = false, error }) {
  const [input, setInput] = useState('');
  const [localIsLoading, setLocalIsLoading] = useState(false);
  const isLoading = parentIsLoading || localIsLoading;

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isLoading]);

  // ================= AUTO RESIZE =================
  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + 'px';
  }, [input]);

  // ================= SEND MESSAGE =================
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = input;

    setInput('');
    setLocalIsLoading(true);

    try {
      await onSendMessage(userMessage);
    } catch (error) {
      console.error(error);
    } finally {
      setLocalIsLoading(false);
    }
  };

  // ================= ENTER SUPPORT =================
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // ================= SUGGESTIONS =================
  const suggestions = [
    {
      icon: 'ri-lightbulb-line',
      title: 'Ideas',
      sub: 'Creative thinking',
      prompt: 'Give me startup ideas using AI'
    },
    {
      icon: 'ri-code-line',
      title: 'Code help',
      sub: 'Debug & build',
      prompt: 'Help me debug my React code'
    },
    {
      icon: 'ri-book-line',
      title: 'Learn',
      sub: 'Understand concepts',
      prompt: 'Teach me system design from basics'
    },
    {
      icon: 'ri-brain-line',
      title: 'Solve',
      sub: 'Think through problems',
      prompt: 'Help me solve a difficult problem'
    }
  ];

  return (
    <div className="flex flex-1 flex-col bg-(--page-bg)">

      {/* ================= MESSAGES AREA ================= */}

      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8 lg:px-12">

        {/* ================= ERROR MESSAGE ================= */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-600">
            <p className="text-sm font-medium">Error: {error}</p>
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}

        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">

            {/* LOGO */}

            <div className="mb-7 flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-(--card-border) bg-(--brand-soft) shadow-xl shadow-black/10">

              <img
                src="https://framerusercontent.com/images/gcMkPKyj2RX8EOEja8A1GWvCb7E.jpg?width=5000&height=5000"
                alt="AI Assistant"
                className="h-full w-full object-cover"
              />

            </div>

            {/* TITLE */}

            <h1 className="font-display text-3xl tracking-tight text-(--ink-primary) md:text-4xl">
              What can I help you with?
            </h1>

            {/* SUBTITLE */}

            <p className="mt-3 max-w-lg text-sm leading-7 text-(--ink-muted) md:text-base">
              Ask anything — coding, ideas, research,
              business, learning, or solving problems.
            </p>

            {/* SUGGESTIONS */}

            <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">

              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(item.prompt)}
                  className="group rounded-2xl border border-(--card-border) bg-(--card-bg) p-5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-(--accent) hover:shadow-2xl hover:shadow-black/10"
                >

                  {/* ICON */}

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--brand-soft) text-(--accent) transition-all duration-300 group-hover:scale-105">

                    <i className={`${item.icon} text-xl`} />

                  </div>

                  {/* TEXT */}

                  <div className="mt-4">

                    <p className="font-semibold text-(--ink-primary)">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm text-(--ink-muted)">
                      {item.sub}
                    </p>

                  </div>

                </button>
              ))}

            </div>

          </div>
        ) : (

          /* ================= CHAT ================= */

          <div className="mx-auto max-w-5xl space-y-5">

            {messages.map((msg, idx) => {

              const isUser = msg.sender === 'user';

              return (
                <div
                  key={idx}
                  className={`flex items-end gap-3 animate-rise ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >

                  {/* ================= AI AVATAR ================= */}

                  {!isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-(--page-bg)">

                      <img
                        src="https://framerusercontent.com/images/gcMkPKyj2RX8EOEja8A1GWvCb7E.jpg?width=5000&height=5000"
                        alt="AI Assistant"
                        className="h-full w-full object-cover"
                      />

                    </div>
                  )}

                  {/* ================= MESSAGE ================= */}

                  <div
                    className={`
                      max-w-[82%] px-5 py-3.5 text-[15px] leading-7
                      transition-all duration-200
                      md:max-w-[72%]
                      lg:max-w-[68%]

                      ${
                        isUser
                          ? 'rounded-2xl rounded-br-md bg-(--accent) text-white shadow-lg shadow-black/10'
                          : 'rounded-2xl rounded-bl-md border border-(--card-border) bg-(--card-bg) text-(--ink-primary) backdrop-blur-md'
                      }
                    `}
                  >

                    <div className="prose prose-invert max-w-none wrap-break-word">

                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>

                    </div>

                  </div>

                  {/* ================= USER AVATAR ================= */}

                  {isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-(--page-bg)">

                      <img
                        src={user?.avtar}
                        alt={user?.username || 'User'}
                        title={user?.username}
                        className="h-full w-full object-cover"
                      />

                    </div>
                  )}

                </div>
              );
            })}

            {/* ================= LOADING ================= */}

            {isLoading && (
              <div className="flex items-end gap-3">

                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-(--brand-soft) ring-2 ring-(--page-bg)">

                  <img
                    src="https://framerusercontent.com/images/gcMkPKyj2RX8EOEja8A1GWvCb7E.jpg?width=5000&height=5000"
                    alt="AI Assistant"
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="rounded-2xl rounded-bl-md border border-(--card-border) bg-(--card-bg) px-4 py-3 backdrop-blur-md">

                  <div className="flex items-center gap-1.5">

                    <div className="h-2 w-2 animate-pulse rounded-full bg-(--accent)" />

                    <div
                      className="h-2 w-2 animate-pulse rounded-full bg-(--accent)"
                      style={{ animationDelay: '0.2s' }}
                    />

                    <div
                      className="h-2 w-2 animate-pulse rounded-full bg-(--accent)"
                      style={{ animationDelay: '0.4s' }}
                    />

                  </div>

                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>
        )}
      </div>

      {/* ================= INPUT SECTION ================= */}

      <div className="sticky bottom-0 border-t border-white/5 bg-(--card-bg)/80 px-4 py-4 backdrop-blur-2xl md:px-8 lg:px-12">

        <div className="mx-auto max-w-5xl">

          <form
            onSubmit={handleSendMessage}
            className="rounded-2xl border border-(--card-border) bg-(--chip-bg) p-2 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
          >

            <div className="flex items-end gap-2">

              {/* ================= TEXTAREA ================= */}

              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                disabled={isLoading}
                placeholder="Ask anything..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="
                  max-h-52 min-h-13 flex-1 resize-none overflow-y-auto
                  bg-transparent px-3 py-3 text-[15px] leading-7
                  text-(--ink-primary) outline-none placeholder:text-(--ink-muted)
                "
              />

              {/* ================= SEND BUTTON ================= */}

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-xl bg-(--accent) text-white
                  transition-all duration-200
                  hover:scale-[1.03]
                  hover:shadow-xl
                  hover:shadow-(--accent)/20
                  active:scale-[0.97]
                  disabled:scale-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <i className="ri-send-plane-2-line text-lg" />

              </button>

            </div>

          </form>

          {/* FOOTER */}

          <p className="mt-3 text-center text-xs text-(--ink-muted)">
            AI can make mistakes. Verify important information.
          </p>

        </div>

      </div>
    </div>
  );
}

export default ChatInterface;