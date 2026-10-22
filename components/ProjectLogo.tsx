import Image from 'next/image'

// The project's own app icon. Decorative: the project name sits next to it.
export default function ProjectLogo({ src, size, className = '' }: { src: string; size: number; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={`rounded-[22%] ${className}`}
    />
  )
}
