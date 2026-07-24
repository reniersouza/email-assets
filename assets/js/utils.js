// Objetivo: utilidades puras compartilhadas.
// Responsabilidade: oferecer helpers de performance e segurança sem dependências de UI.
// Dependências: nenhuma.

const HTML_ESCAPE_MAP = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
});

export function debounce(callback, delay = 250) {
  let timerId;

  return (...args) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => callback(...args), delay);
  };
}

export function throttle(callback, limit = 250) {
  let waiting = false;

  return (...args) => {
    if (waiting) {
      return;
    }

    callback(...args);
    waiting = true;
    window.setTimeout(() => {
      waiting = false;
    }, limit);
  };
}

export function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => HTML_ESCAPE_MAP[character]);
}

export function sanitizeUrl(value = '') {
  try {
    const url = new URL(value, window.location.origin);
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    return allowedProtocols.includes(url.protocol) ? url.href : '#';
  } catch {
    return '#';
  }
}

export function createElement(tagName, attributes = {}, textContent = '') {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([name, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(name, String(value));
    }
  });

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}
