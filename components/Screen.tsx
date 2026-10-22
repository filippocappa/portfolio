import Image from 'next/image'

// A product screenshot in a case study. MDX passes every prop as a string.
export default function Screen({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string
  alt: string
  caption: string
  width: string
  height: string
}) {
  return (
    <figure className="my-10 lg:-mr-24">
      <Image
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        sizes="(min-width: 1024px) 50rem, 100vw"
        className="w-full h-auto rounded-[6px] border border-rule"
      />
      <figcaption className="mt-3 font-sans text-sm text-muted max-w-[60ch]">{caption}</figcaption>
    </figure>
  )
}
