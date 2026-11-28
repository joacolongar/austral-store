import React from 'react'

import { linkWhatsApp } from '@/config/marca'

/** Botón redondo fijo abajo a la derecha que abre el chat de WhatsApp de la marca. */
export function WhatsAppFlotante() {
  return (
    <a
      aria-label="Escribinos por WhatsApp"
      data-whatsapp-flotante
      className="fixed right-4 bottom-4 z-50 grid size-[52px] place-items-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6 sm:size-[60px]"
      href={linkWhatsApp()}
      rel="noopener"
      target="_blank"
    >
      {/* Globo de chat con teléfono */}
      <svg aria-hidden="true" className="size-7 sm:size-8" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M9.2 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c-.1.1-.1.3 0 .5.5.9 1.3 1.7 2.2 2.2.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.5.3-1.2.5-1.9.4-2.6-.4-4.8-2.6-5.2-5.2-.1-.7.1-1.4.4-1.8Z"
          fill="currentColor"
        />
      </svg>
    </a>
  )
}
