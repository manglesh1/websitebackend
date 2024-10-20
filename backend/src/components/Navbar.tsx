import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Navbar = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    return (
        <nav className="sticky z-40 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href="/" className="flex z-40 font-semibold">
                        <span className="text-blue-500">AeroSports Parks</span>
                    </Link>
                    <div className="h-full flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link 
                                    href='/data' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    Data
                                </Link>
                                <Link 
                                    href='/blog' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    Blog
                                </Link>
                                <Link 
                                    href='/blog_reviews' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    Blog Reviews
                                </Link>
                                <Link 
                                    href='/birthday_packages' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    Birthday Packages
                                </Link>
                                <Link 
                                    href='/config' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    Config
                                </Link>
                                <Link 
                                    href='/faq' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    FAQs
                                </Link>
                                <Link 
                                    href='/locations' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    Locations
                                </Link>
                                <Link 
                                    href='/promo' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    Promo
                                </Link>
                                <Link 
                                    href='/api/auth/logout' 
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost'
                                    })}
                                >
                                    Sign Out
                                </Link>
                            </>
                        ) : (
                            <Link 
                                href='/api/auth/login' 
                                className={buttonVariants({
                                    size: 'sm',
                                    variant: 'ghost'
                                })}
                            >
                                Log In
                            </Link>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar