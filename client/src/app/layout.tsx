export const metadata = {
  title: 'Vitality Hub',
  description: 'Vitality Hub is a cool health app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}</body>
    </html>
  )
}
