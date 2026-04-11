type SectionHeaderProps = {
  id: string
  title: string
  number: string
  numberClass?: string
}

export default function SectionHeader({
  id,
  title,
  number,
  numberClass = 'text-[13px]',
}: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 md:px-16 md:py-5 border-b border-border">
      <h2 id={id} className="text-[12px] tracking-[0.3em] uppercase text-muted font-normal">
        <span aria-hidden="true" className="text-coral mr-2">
          {'//'}
        </span>
        {title}
      </h2>
      <span aria-hidden="true" className={`font-bebas ${numberClass} text-muted tracking-[0.1em]`}>
        {number}
      </span>
    </div>
  )
}
