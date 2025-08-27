'use client';
import React from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    const { t } = useLanguage()
    
    const scrollToNextSection = () => {
        const heroSection = document.querySelector('section');
        if (heroSection) {
            const nextElement = heroSection.parentElement?.nextElementSibling;
            if (nextElement) {
                nextElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <main className="overflow-hidden">
                {/* Full-screen background image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/disposablephoto/Aluminum Foil Products.webp" 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                
                <section className="min-h-screen flex items-center relative z-10">
                    <div className="relative w-full">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <h1 className="mt-8 max-w-4xl mx-auto text-balance text-white">
                                        {t('home.hero.title')}
                                    </h1>
                                    <p className="text-lead mx-auto mt-8 max-w-2xl text-balance text-white/90">
                                        {t('home.hero.description')}
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-white/10 rounded-[14px] border border-white/20 p-0.5 backdrop-blur-sm">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-5 text-base bg-white text-black hover:bg-white/90">
                                            <Link href="/products">
                                                <span className="text-nowrap">{t('home.hero.cta')}</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5 text-white hover:bg-white/10 border border-white/20">
                                        <Link href="/contact">
                                            <span className="text-nowrap">{t('home.hero.contact')}</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>
                    </div>
                    
                    {/* Scroll down button */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <button
                            onClick={scrollToNextSection}
                            className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 group"
                            aria-label="Scroll to next section">
                            <span className="text-sm mb-2 font-medium">Scroll Down</span>
                            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
                            </div>
                            <svg 
                                className="w-6 h-6 mt-2 group-hover:translate-y-1 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </div>
                </section>
            </main>
        </>
    )
}

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [languageDropdown, setLanguageDropdown] = React.useState(false)
    const { language, setLanguage, t } = useLanguage()

    const menuItems = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.about'), href: '/about' },
        { name: t('nav.products'), href: '/products' },
        { name: t('nav.news'), href: '/news' },
        { name: t('nav.faq'), href: '/#faq' },
        { name: t('nav.contact'), href: '/contact' },
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
                                    isScrolled ? "text-muted-foreground" : "text-white")}>
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
                                            className={cn("block duration-150", isScrolled ? "text-muted-foreground hover:text-accent-foreground" : "text-white/90 hover:text-white")}>
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
                                    isScrolled 
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