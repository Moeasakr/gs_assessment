import '@/app/globals.css'
import { roboto } from './ui/fonts'

export const metadata = {
  title: 'Exchange app',
  description: 'An app to see exchanging currencies rates',
}

const RootLayout = ({ children }) => {
 return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <div className="main p-5">
          <h1 className="text-5xl font-bold leading-[1.15] text-black sm:text-6xl">Forex Exchange</h1>
          <h3 className="">Check out the current price for a currency pair</h3>
        </div>
        
        <div className='md:overflow-y-auto'>
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout;