'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'
import { usePathname } from 'next/navigation'

const Header = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [languageDropdown, setLanguageDropdown] = React.useState(false)
    const { language, setLanguage, t } = useLanguage()
    const pathname = usePathname()
    
    // 判断是否为白色背景页面
    const isWhiteBackgroundPage = pathname === '/about' || pathname === '/products' || pathname === '/news' || pathname.startsWith('/products/')

    const menuItems = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.about'), href: '/about' },
        { name: t('nav.products'), href: '/products' },
        { name: t('nav.news'), href: '/news' },
        { name: t('nav.faq'), href: '/#faq' },
        { name: t('nav.contact'), href: '/#contact' },
    ]

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' }
    ]

    const selectedLanguage = languages.find(lang => lang.code === language)?.name || 'English'

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 bg-background/20 backdrop-blur-sm border border-white/10 rounded-2xl', isScrolled && 'bg-background/80 max-w-4xl border-border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className={cn("relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden", 
                                    isScrolled || isWhiteBackgroundPage ? "text-muted-foreground" : "text-white")}>
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm items-center">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className={cn("block duration-150", isScrolled || isWhiteBackgroundPage ? "text-muted-foreground hover:text-accent-foreground" : "text-white/90 hover:text-white")}>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="hidden lg:block relative">
                            <button 
                                onClick={() => setLanguageDropdown(!languageDropdown)}
                                className={cn("flex items-center space-x-2 px-4 py-2 rounded-full duration-150 border", 
                                    isScrolled || isWhiteBackgroundPage 
                                        ? "bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground border-border" 
                                        : "bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border-white/20")}>
                                <span className="font-medium">{selectedLanguage}</span>
                                <svg className={`w-4 h-4 transition-transform ${languageDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            {languageDropdown && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-background border rounded-lg shadow-lg z-50">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code as any)
                                                setLanguageDropdown(false)
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-muted text-sm first:rounded-t-lg last:rounded-b-lg">
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="bg-background group-data-[state=active]:block lg:hidden mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20">
                            <div>
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center', className)}>
            <img 
                src="/logo/firstalu_logo.webp" 
                alt="First Aluminum Technology" 
                className="h-8 w-8 object-contain"
            />
        </div>
    )
}

export default Header