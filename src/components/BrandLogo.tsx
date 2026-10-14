interface BrandLogoProps {
  compact?: boolean
}

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className={`brand-logo${compact ? ' brand-logo--compact' : ''}`}>
      <img className="brand-logo__mark" src="/logo.svg" alt="" width={36} height={36} />
      {!compact && (
        <span className="brand-logo__text">
          <span className="brand-logo__name">АйТи-центр</span>
          <span className="brand-logo__tagline">IT-услуги и поддержка</span>
        </span>
      )}
    </span>
  )
}
