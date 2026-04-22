import { useMemo } from 'react'
import { Music4 } from 'lucide-react'
import playlistTracks from '../data/playlistTracks.json'

function seededRandom(seed) {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let t = Math.imul(value ^ (value >>> 15), 1 | value)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function dailySeedFromDate(date) {
  return Number(`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`)
}

function buildDailyOrder(tracks, seed) {
  const random = seededRandom(seed)
  return [...tracks]
    .map((track, index) => ({ track, rank: random() + index * 1e-9 }))
    .sort((a, b) => a.rank - b.rank)
    .map((entry) => entry.track)
}

export default function DailyPlaylistPick({ playlistUrl, favoriteArtist }) {
  const dailyMix = useMemo(() => {
    if (!playlistTracks.length) {
      return []
    }

    const order = buildDailyOrder(playlistTracks, dailySeedFromDate(new Date()))
    const preferredArtist = (favoriteArtist ?? '').trim().toLowerCase()
    const preferredTracks = preferredArtist
      ? order.filter((track) => track.artist.toLowerCase().includes(preferredArtist))
      : []

    if (preferredTracks.length > 0) {
      const primary = preferredTracks[0]
      const rest = order.filter((track) => track.trackId !== primary.trackId)
      return [primary, ...rest].slice(0, 4)
    }

    return order.slice(0, 4)
  }, [favoriteArtist])

  const todayTrack = dailyMix[0]
  const nextTracks = dailyMix.slice(1)

  if (!todayTrack) {
    return null
  }

  return (
    <article className="relative col-span-full overflow-hidden rounded-2xl border border-[#5667c7]/55 bg-[#121a46] p-6 shadow-soft">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-400/16 via-[#8f79ff]/12 to-transparent" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#6276d6]/55 bg-[#0f173f] text-brand-100">
              <Music4 size={15} />
            </span>
            <p className="text-xs uppercase tracking-[0.24em] text-brand-100/90">Daily Playlist Shuffle</p>
          </div>
          {playlistUrl ? (
            <a
              href={playlistUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#6276d6]/55 bg-[#0f173f] px-3 py-1 text-xs text-indigo-100 transition hover:border-brand-300/70 hover:text-indigo-50"
            >
              Open Playlist
            </a>
          ) : null}
        </div>

        <p className="mt-4 text-sm text-indigo-200/90">
          Favorite artist: <span className="font-semibold text-brand-100">{favoriteArtist}</span>
        </p>

        <a
          href={todayTrack.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 block rounded-xl border border-[#5667c7]/55 bg-[#0f173f] px-4 py-3 transition hover:border-brand-300/60"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-brand-100/80">Today&apos;s Song</p>
          <p className="mt-2 text-lg font-semibold text-indigo-50">{todayTrack.title}</p>
          <p className="mt-1 text-sm text-indigo-200/90">{todayTrack.artist}</p>
        </a>

        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {nextTracks.map((track) => (
            <a
              key={track.trackId}
              href={track.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[#5667c7]/55 bg-[#0f173f] px-3 py-2 text-xs text-indigo-100 transition hover:border-brand-300/50"
            >
              <p className="font-semibold text-indigo-50">{track.title}</p>
              <p className="mt-1 text-indigo-200/90">{track.artist}</p>
            </a>
          ))}
        </div>

        <p className="mt-3 text-xs text-indigo-300/80">Auto-shuffles once per day from your Spotify playlist. Songs are displayed only (no autoplay).</p>
      </div>
    </article>
  )
}
