export function openTelegramInMiniApp(url) {
  const tg = window.Telegram?.WebApp

  if (!tg?.initData || typeof tg.openTelegramLink !== 'function') {
    return false
  }

  try {
    tg.openTelegramLink(url)
    return true
  } catch {
    return false
  }
}