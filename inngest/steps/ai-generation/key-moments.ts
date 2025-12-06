import { formatTimestamp } from "@/lib/format"
import type { TranscriptWithExtras } from "@/inngest/types/assemblyai"

type KeyMoment = {
  time: string
  timestamp: number
  text: string
  description: string
}

export async function generateKeyMoments(
  transcript: TranscriptWithExtras
): Promise<KeyMoment[]> {
  const chapters = transcript.chapters || []

  if (chapters.length === 0) {
    return []
  }

  const keyMoments = chapters.map(chapter => {
    const startSeconds = chapter.start / 1000

    return {
      time: formatTimestamp(startSeconds, { padHours: true, forceHours: true }),
      timestamp: startSeconds,
      text: chapter.headline,
      description: chapter.summary
    }
  })

  return keyMoments
}