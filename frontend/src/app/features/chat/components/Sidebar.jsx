import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../../../Redux/reducers/auth.slice';
import { resetChatState } from '../../../Redux/reducers/chat.slice.js';

function Sidebar({
  onNewChat,
  chatHistory = [],
  onSelectChat,
  onDeleteChat,
  activeChatId,
  // isLoading = false
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= LOGOUT =================

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(resetChatState());

    localStorage.removeItem('token');

    navigate('/login');
  };

  const closeDeleteModal = () => {
    setChatToDelete(null);
  };

  const confirmDeleteChat = async () => {
    if (!chatToDelete || !onDeleteChat) return;

    await onDeleteChat(chatToDelete);
    closeDeleteModal();
  };

  return (
    <>
      {/* ================= MOBILE TOGGLE ================= */}

      <button
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
        className="
          fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center
          rounded-xl border border-(--card-border)
          bg-(--card-bg)/80 text-(--ink-primary)
          shadow-lg backdrop-blur-xl
          transition-all duration-200
          hover:scale-[1.03]
          active:scale-[0.97]
          md:hidden
        "
      >
        <i className="ri-menu-line text-xl" />
      </button>

      {/* ================= MOBILE OVERLAY ================= */}

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-70
          flex-col border-r border-(--card-border)
          bg-(--card-bg)/90 backdrop-blur-2xl
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          md:relative md:translate-x-0

          ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >

        {/* ================= HEADER ================= */}

        <div className="border-b border-(--card-border) px-4 py-5">

          <div className="flex items-center justify-between">

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-(--card-border) bg-(--brand-soft) shadow-lg shadow-black/10">

                <img
                  src="https://framerusercontent.com/images/gcMkPKyj2RX8EOEja8A1GWvCb7E.jpg?width=5000&height=5000"
                  alt="AI Assistant"
                  className="h-full w-full object-cover"
                />

              </div>

              <div>

                <h1 className="font-display text-[15px] font-semibold tracking-tight text-(--ink-primary)">
                  Perplexity
                </h1>

                <p className="text-xs text-(--ink-muted)">
                  AI Assistant
                </p>

              </div>

            </div>

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg text-(--ink-muted)
                transition-all duration-200
                hover:bg-(--chip-bg)
                hover:text-(--ink-primary)
                md:hidden
              "
            >
              <i className="ri-close-line text-lg" />
            </button>

          </div>

        </div>

        {/* ================= NEW CHAT ================= */}

        <div className="px-4 py-4">

          <button
            onClick={() => {
              onNewChat();
              setIsSidebarOpen(false);
            }}
            className="
              group flex w-full items-center justify-center gap-2
              rounded-2xl border border-(--card-border)
              bg-(--chip-bg) px-4 py-3
              text-sm font-semibold text-(--ink-primary)
              transition-all duration-300
              hover:border-(--accent)
              hover:bg-(--brand-soft)
              hover:shadow-lg hover:shadow-black/5
              active:scale-[0.98]
            "
          >

            <i className="ri-add-line text-base transition-transform duration-300 group-hover:rotate-90" />

            <span>New Chat</span>

          </button>

        </div>

        {/* ================= HISTORY ================= */}

        <div className="flex-1 overflow-y-auto px-3 pb-4">

          {/* TITLE */}

          <div className="mb-3 px-2">

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--ink-muted)">
              Recent Chats
            </p>

          </div>

          {/* LIST */}

          <div className="space-y-1.5">

            {chatHistory.length > 0 ? (
              chatHistory.map((chat) => {

                const isActive =
                  activeChatId === chat._id;

                return (
                  <button
                    key={chat._id}
                    onClick={() => {
                      onSelectChat?.(chat._id);
                      setIsSidebarOpen(false);
                    }}
                    className={`
                      group relative w-full overflow-hidden rounded-xl
                      border px-3 py-3 text-left
                      transition-all duration-200

                      ${
                        isActive
                          ? `
                            border-(--card-border)
                            bg-(--chip-bg)
                            shadow-md shadow-black/5
                          `
                          : `
                            border-transparent
                            hover:border-(--card-border)
                            hover:bg-(--chip-bg)/70
                          `
                      }
                    `}
                  >

                    {/* ACTIVE INDICATOR */}

                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-(--accent)" />
                    )}

                    <div className="flex items-start gap-3">

                      {/* ICON */}

                      <div
                        className={`
                          mt-0.5 flex h-8 w-8 shrink-0 items-center
                          justify-center rounded-lg
                          transition-all duration-200

                          ${
                            isActive
                              ? 'bg-(--accent) text-white'
                              : 'bg-(--brand-soft) text-(--accent)'
                          }
                        `}
                      >

                        <i className="ri-message-3-line text-sm" />

                      </div>

                      {/* TEXT */}

                      <div className="min-w-0 flex-1">

                        <p
                          className={`
                            truncate text-[13px] font-medium leading-6

                            ${
                              isActive
                                ? 'text-(--ink-primary)'
                                : 'text-(--ink-secondary)'
                            }
                          `}
                        >
                          {chat.title || 'New Chat'}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] text-(--ink-muted)">
                          Continue conversation
                        </p>

                      </div>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setChatToDelete(chat._id);
                        }}
                        className="
                          shrink-0 rounded-lg p-1.5
                          text-(--ink-muted)
                          transition-all duration-200
                          hover:bg-red-500/10 hover:text-red-500
                          opacity-0 group-hover:opacity-100
                        "
                        title="Delete chat"
                      >
                        <i className="ri-delete-bin-line text-sm" />
                      </button>

                    </div>

                  </button>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-(--card-border) px-4 py-8 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-(--brand-soft) text-(--accent)">

                  <i className="ri-chat-1-line text-xl" />

                </div>

                <p className="mt-4 text-sm font-medium text-(--ink-primary)">
                  No chats yet
                </p>

                <p className="mt-1 text-xs leading-6 text-(--ink-muted)">
                  Start a new conversation to see your history here.
                </p>

              </div>
            )}

          </div>

        </div>

        {/* ================= USER SECTION ================= */}

        <div className="border-t border-(--card-border) p-4">

          {user && (
            <div className="space-y-3">

              {/* USER CARD */}

              <div className="rounded-2xl border border-(--card-border) bg-(--chip-bg) p-3">

                <div className="flex items-center gap-3">

                  {/* AVATAR */}

                  <div className="relative">

                    <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-(--page-bg)">

                      <img
                        src={user.avtar}
                        alt={user.username || 'User'}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    {/* ONLINE DOT */}

                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-(--chip-bg) bg-green-500" />

                  </div>

                  {/* INFO */}

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-(--ink-primary)">
                      {user.username || 'User'}
                    </p>

                    <p className="truncate text-xs text-(--ink-muted)">
                      {user.email || 'user@example.com'}
                    </p>

                  </div>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="space-y-1.5">

                {/* SETTINGS */}

                <button
                  className="
                    flex w-full items-center gap-3 rounded-xl
                    px-3 py-2.5 text-sm text-(--ink-secondary)
                    transition-all duration-200
                    hover:bg-(--chip-bg)
                    hover:text-(--ink-primary)
                  "
                >

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--brand-soft) text-(--accent)">

                    <i className="ri-settings-3-line text-sm" />

                  </div>

                  <span>Settings</span>

                </button>

                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="
                    flex w-full items-center gap-3 rounded-xl
                    px-3 py-2.5 text-sm text-red-400
                    transition-all duration-200
                    hover:bg-red-500/10
                    hover:text-red-300
                  "
                >

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">

                    <i className="ri-logout-box-r-line text-sm" />

                  </div>

                  <span>Logout</span>

                </button>

              </div>

            </div>
          )}

        </div>

      </aside>

      {/* ================= DELETE CONFIRMATION MODAL ================= */}

      {chatToDelete && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={closeDeleteModal}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-(--card-border) bg-(--card-bg) p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <i className="ri-delete-bin-6-line text-xl" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-(--ink-primary)">
                  Delete chat?
                </h2>
                <p className="mt-2 text-sm leading-6 text-(--ink-muted)">
                  This chat will be removed permanently, including all of its messages. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-xl border border-(--card-border) bg-(--chip-bg) px-4 py-2.5 text-sm font-medium text-(--ink-primary) transition-all duration-200 hover:bg-(--brand-soft)"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDeleteChat}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600"
              >
                Delete chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;