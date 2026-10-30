type SectionHeaderProps = {
  id: string
  title: string
  number: string
  numberClass?: string
}

export default function SectionHeader({ id, title, number, numberClass = '' }: SectionHeaderProps) {
  return (
    <div className="px-6 pt-20 pb-10 md:px-16 md:pt-28 md:pb-12 border-b border-border">
      <div aria-hidden="true" className="w-24 h-1 bg-coral mb-5" />
      <div className="flex justify-between items-end gap-6">
        <h2
          id={id}
          className="font-bebas font-normal text-cream leading-[0.9] text-[clamp(52px,6vw,88px)]"
        >
          {title}
        </h2>
        <span
          aria-hidden="true"
          className={`font-bebas text-[clamp(28px,3vw,40px)] leading-none text-muted ${numberClass}`}
        >
          {number}
        </span>
      </div>
    </div>
  )
}
