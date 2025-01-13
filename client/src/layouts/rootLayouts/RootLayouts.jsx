import React from 'react'
import ReactDOM from 'react-dom/client'
import {Link, Outlet} from 'react-router-dom'
import './rootLayouts.css'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const queryClient = new QueryClient();
const RootLayouts = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient} >
        <div className='root-layout'>
            <header>
                <Link to="/" className='logo-img'>
                    <img  src="../../../public/yachiruLogo.png" alt="LOGO" />
                    <span className='logo-font'>AI CHATAPP</span>
                </Link>
                <div className="user-info">
                    <SignedOut>
                        <div className='get-started'>
                          <Link to="/dashboard">Get Started</Link>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                        />
                    </SignedIn>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default RootLayouts