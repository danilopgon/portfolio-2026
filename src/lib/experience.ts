/** Serializable view model for the selected jobs on the homepage. */
export type Experience = {
  slug: string
  role: string
  company: string
  period: string
  filename: string
  description: string[]
  stack: string[]
  /** Marks the role still in progress, so the timeline can point at "now". */
  current?: boolean
}
