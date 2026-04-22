import { useEffect, useMemo, useState } from 'react'
import AnimatedSection from './AnimatedSection'
import DailyPlaylistPick from './DailyPlaylistPick'
import SectionTitle from './SectionTitle'

const TEAM_ENDPOINTS = [
  {
    key: 'knicks',
    displayName: 'New York Knicks',
    league: 'NBA',
    endpoint: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/18',
    accent: 'from-[#1d428a]/35 via-[#f58426]/20 to-transparent',
  },
  {
    key: 'real-madrid',
    displayName: 'Real Madrid',
    league: 'LALIGA',
    endpoint: 'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/teams/86',
    accent: 'from-[#5f7bff]/24 via-[#9f72ff]/16 to-transparent',
  },
  {
    key: 'chelsea',
    displayName: 'Chelsea',
    league: 'Premier League',
    endpoint: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/363',
    accent: 'from-[#034694]/35 via-blue-400/20 to-transparent',
  },
  {
    key: 'giants',
    displayName: 'New York Giants',
    league: 'NFL',
    endpoint: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/19',
    accent: 'from-[#0b2265]/35 via-[#a71930]/22 to-transparent',
  },
]

function formatEventDate(dateString) {
  if (!dateString) {
    return 'TBD'
  }

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

function normalizeTeamPayload(payload) {
  const team = payload?.team ?? {}
  const recordSummary = team?.record?.items?.[0]?.summary ?? 'N/A'
  const standing = team?.standingSummary ?? 'Standings unavailable'
  const nextEvent = team?.nextEvent?.[0]
  const competition = nextEvent?.competitions?.[0]
  const competitors = competition?.competitors ?? []

  const hasUpcomingEvent = Boolean(nextEvent)
  const matchLabel = nextEvent?.shortName ?? 'No scheduled event yet'
  const status = competition?.status?.type?.description ?? 'Offseason / pending schedule'

  const scoreSummary =
    competitors.length === 2
      ? `${competitors[0]?.team?.displayName ?? 'Team A'} ${competitors[0]?.score?.displayValue ?? '-'} : ${
          competitors[1]?.score?.displayValue ?? '-'
        } ${competitors[1]?.team?.displayName ?? 'Team B'}`
      : hasUpcomingEvent
        ? 'Score not available yet'
        : 'Waiting for next scheduled game'

  return {
    recordSummary,
    standing,
    matchLabel,
    status,
    scoreSummary,
    eventDate: formatEventDate(nextEvent?.date),
  }
}

function TeamCard({ card }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#5667c7]/55 bg-[#121a46] p-6 shadow-soft">
      <div className={`absolute inset-0 bg-gradient-to-br ${card.accent}`} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand-100/85">{card.league}</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-indigo-50">{card.displayName}</h3>
          </div>
          <span className="rounded-full border border-[#6276d6]/55 bg-[#0f173f] px-3 py-1 text-xs text-indigo-100">
            {card.recordSummary}
          </span>
        </div>

        <p className="mt-4 text-sm text-indigo-200/90">{card.standing}</p>
        <p className="mt-4 text-sm font-semibold text-indigo-50">{card.matchLabel}</p>
        <p className="mt-1 text-xs text-indigo-200/90">{card.eventDate} · {card.status}</p>
        <p className="mt-3 rounded-xl border border-[#5667c7]/55 bg-[#0f173f] px-3 py-2 text-xs text-indigo-100">
          {card.scoreSummary}
        </p>
      </div>
    </article>
  )
}

export default function TeamPulseSection({ musicProfile }) {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fallbackCards = useMemo(
    () =>
      TEAM_ENDPOINTS.map((team) => ({
        ...team,
        recordSummary: 'N/A',
        standing: 'Unable to load live standings right now.',
        matchLabel: 'Live feed unavailable',
        status: 'Try again shortly',
        scoreSummary: 'No score data currently available',
        eventDate: 'TBD',
      })),
    [],
  )

  useEffect(() => {
    let isMounted = true

    async function loadTeamPulse() {
      try {
        const responses = await Promise.all(
          TEAM_ENDPOINTS.map(async (team) => {
            const res = await fetch(team.endpoint)
            if (!res.ok) {
              throw new Error(`Failed to load ${team.displayName}`)
            }

            const payload = await res.json()
            return {
              ...team,
              ...normalizeTeamPayload(payload),
            }
          }),
        )

        if (isMounted) {
          setCards(responses)
          setLastUpdated(new Date())
        }
      } catch {
        if (isMounted) {
          setCards(fallbackCards)
          setLastUpdated(new Date())
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTeamPulse()
    const refreshInterval = setInterval(loadTeamPulse, 5 * 60 * 1000)

    return () => {
      isMounted = false
      clearInterval(refreshInterval)
    }
  }, [fallbackCards])

  const renderedCards = cards.length ? cards : fallbackCards

  return (
    <AnimatedSection id="team-pulse" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(255,128,0,0.35),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(255,90,0,0.28),transparent_60%),radial-gradient(circle_at_50%_110%,rgba(255,165,60,0.18),transparent_65%)]" />
        <div className="absolute -top-20 left-1/2 h-[140%] w-40 -translate-x-1/2 rotate-12 bg-gradient-to-b from-transparent via-[#ff8000]/20 to-transparent blur-sm" />
        <div className="absolute -top-20 left-[62%] h-[140%] w-8 rotate-12 bg-gradient-to-b from-transparent via-[#ff8000]/35 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0b1131] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b1131] to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionTitle
          eyebrow="Team Pulse"
          title="Live updates from my favorite teams."
          description="Auto-refreshing snapshots for the New York Knicks, New York Giants, Real Madrid, and Chelsea, plus a daily shuffle from my playlist. This section updates every 5 minutes."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DailyPlaylistPick
            playlistUrl={musicProfile?.playlistUrl}
            favoriteArtist={musicProfile?.favoriteArtist}
          />
          {renderedCards.map((card) => (
            <TeamCard key={card.key} card={card} />
          ))}
        </div>

        <p className="mt-5 text-xs text-orange-200/80">
          {loading ? 'Loading live team data...' : `Last updated: ${lastUpdated?.toLocaleTimeString() ?? 'just now'}`}
        </p>
      </div>
    </AnimatedSection>
  )
}
