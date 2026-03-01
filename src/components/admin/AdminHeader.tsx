export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between shrink-0
                       h-[60px] px-6
                       border-b border-white/[0.06]
                       bg-[#0f0f1a]">
      <p className="text-sm text-white/40">Good evening 👋</p>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          aria-label="Notifications"
          className="relative flex items-center justify-center w-9 h-9
                     text-xl rounded-full bg-white/[0.05]
                     transition-colors hover:bg-yellow-400/10"
        >
          🔔
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center
                           w-4 h-4 rounded-full bg-[#ff5200] text-white text-[0.6rem] font-bold">
            3
          </span>
        </button>

        {/* Avatar */}
        <div
          aria-label="Admin user"
          className="flex items-center justify-center w-9 h-9 rounded-full
                     bg-gradient-to-br from-yellow-400 to-[#ff5200]
                     text-black font-extrabold text-sm cursor-pointer select-none"
        >
          A
        </div>
      </div>
    </header>
  );
}
