import { useEffect, useMemo, useState } from 'react'
import AnimatedSection from './AnimatedSection'
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
    accent: 'from-slate-200/25 via-slate-400/10 to-transparent',
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
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/45 p-6 shadow-soft">
      <div className={`absolute inset-0 bg-gradient-to-br ${card.accent}`} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand-100/85">{card.league}</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-white">{card.displayName}</h3>
          </div>
          <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs text-slate-200">
            {card.recordSummary}
          </span>
        </div>

        <p className="mt-4 text-sm text-slate-300">{card.standing}</p>
        <p className="mt-4 text-sm font-semibold text-slate-100">{card.matchLabel}</p>
        <p className="mt-1 text-xs text-slate-300">{card.eventDate} · {card.status}</p>
        <p className="mt-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-slate-200">
          {card.scoreSummary}
        </p>
      </div>
    </article>
  )
}

export default function TeamPulseSection() {
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
    <AnimatedSection id="team-pulse" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="Team Pulse"
        title="Live updates from my favorite teams."
        description="Auto-refreshing snapshots for the New York Knicks, New York Giants, Real Madrid, and Chelsea. This section updates every 5 minutes."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {renderedCards.map((card) => (
          <TeamCard key={card.key} card={card} />
        ))}
      </div>

      <p className="mt-5 text-xs text-slate-400">
        {loading ? 'Loading live team data...' : `Last updated: ${lastUpdated?.toLocaleTimeString() ?? 'just now'}`}
      </p>
    </AnimatedSection>
  )
}
