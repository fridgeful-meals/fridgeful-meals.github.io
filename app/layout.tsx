import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Fridgeful — Less waste. More dinner.',description:'Turn what’s in your fridge into a thoughtful dinner plan and a smarter shopping list.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
