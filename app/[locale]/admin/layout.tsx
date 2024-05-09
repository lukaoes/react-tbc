import AdminNav from "../../../components/Admin/adminNav"
import '../../../styles/index.scss'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="admin-layout">
          <h1>Admin Panel</h1>
          <div className="admin-navigation">
            <AdminNav />
            <main>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}