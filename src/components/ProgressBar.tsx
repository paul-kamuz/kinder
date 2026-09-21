interface Props {
  collected: number
  total: number
}

export function ProgressBar({ collected, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((collected / total) * 100)
  return (
    <div className="progress" role="presentation">
      <div className="progress__fill" style={{ width: `${percent}%` }} />
    </div>
  )
}
