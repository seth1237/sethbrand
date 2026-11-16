"use client"

import { siteConfig } from "@/lib/site-config"

export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#CC5500] text-[#F4EFE8] shadow-[0_10px_30px_rgb(204_85_0/0.35)] transition-colors hover:bg-[#E8702A] sm:right-6"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.9-1.1A11 11 0 0 0 21 12a10.9 10.9 0 0 0-.5-8.5ZM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.5.6.7-3.4-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.3.1-.3-.1-.3c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a8.9 8.9 0 0 0 3.4 2.7c.5.2.8.3 1.1.2.3 0 1-.4 1.2-.8s.4-.8.3-.8-.2-.1-.4-.2Z" />
      </svg>
    </a>
  )
}
