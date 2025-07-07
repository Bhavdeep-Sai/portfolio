/* eslint-disable no-unused-vars */
import { useState } from "react"
import { motion } from "motion/react"
import { Link } from "react-scroll"

function Navigation() {
    return (
        <ul className="nav-ul">
            <li className="nav-li cursor-pointer">
                <Link
                    to="home"
                    smooth={true}
                    duration={500}
                    offset={-60}
                    className="nav-link"
                    spy={true}
                    activeClass="active"
                >
                    Home
                </Link>
            </li>
            <li className="nav-li cursor-pointer">
                <Link
                    to="about"
                    smooth={true}
                    duration={500}
                    offset={-60}
                    className="nav-link"
                    spy={true}
                    activeClass="active"
                >
                    About
                </Link>
            </li>
            <li className="nav-li cursor-pointer">
                <Link
                    to="work"
                    smooth={true}
                    duration={500}
                    offset={-60}
                    className="nav-link"
                    spy={true}
                    activeClass="active"
                >
                    Work
                </Link>
            </li>
            <li className="nav-li cursor-pointer">
                <Link
                    to="certificates"
                    smooth={true}
                    duration={500}
                    offset={-60}
                    className="nav-link"
                    spy={true}
                    activeClass="active"
                >
                    Certificates
                </Link>
            </li>
            <li className="nav-li cursor-pointer">
                <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    offset={-60}
                    className="nav-link"
                    spy={true}
                    activeClass="active"
                >
                    Contact
                </Link>
            </li>
        </ul>
    )
}

const Navbar = () => {
    const [isOpen, setOpen] = useState(false)

    return (
        <div className="fixed insert-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
            <div className="mx-auto c-space max-w-7xl">
                <div className="flex h-15 items-center justify-between py-2 sm:py-0">
                    <a href="/" className="text-xl font-bold transition-colors text-neutral-400 hover:text-white">
                        Bhavdeep
                    </a>
                    <button
                        onClick={() => setOpen(!isOpen)}
                        className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
                    >
                        <img
                            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                            alt="toggle"
                            className="w-6 h-6"
                        />
                    </button>
                    <nav className="hidden sm:flex">
                        <Navigation />
                    </nav>
                </div>
            </div>

            {/* Mobile View */}
            {isOpen && (
                <motion.div
                    className="block overflow-hidden text-center sm:hidden"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ maxHeight: "100vh" }}
                    transition={{ duration: 1 }}
                >
                    <nav className="pb-5">
                        <Navigation />
                    </nav>
                </motion.div>
            )}
        </div>
    )
}

export default Navbar
