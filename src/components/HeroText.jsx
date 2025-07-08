/* eslint-disable no-unused-vars */
import { FlipWords } from "./FlipWords"
import { motion } from "motion/react";

const HeroText = () => {
    const words = ["Full-Stack", "Realtime", "Interactive", "Animated", "AI-Powered", "Responsive", "Role-Based"];


    const variants = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    }

    const mobileVarents = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
    }

    
    return (
        <motion.div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text c-space">

            {/* Desktop View */}
            <motion.div className="flex-col hidden md:flex c-space">
                <motion.h1 className="text-4xl font-medium"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 3 }}
                >Hi, I'am Bhavdeep</motion.h1>
                <motion.div className="flex flex-col items-start">
                    <motion.p className="text-5xl font-medium text-neutral-300"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.75 }}
                    >
                        A Developer <br /> Dedicated to Crafting
                    </motion.p>

                    {/* Flip Words */}
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 2 }}
                    >
                        <FlipWords words={words} className='font-black text-white text-8xl' />
                    </motion.div>
                    <motion.p className="text-3xl font-medium text-neutral-300"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 2.25 }}
                    >Web Applications & Dashboards</motion.p>
                </motion.div>
            </motion.div>

            {/* Mobile View */}
            <motion.div className="flex flex-col space-y-6 md:hidden">
                <motion.p className="text-4xl font-medium"
                    variants={mobileVarents}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}
                >Hi, I'm Bhavdeep</motion.p>
                <motion.div>
                    <motion.p className="text-5xl font-black text-neutral-300"
                        variants={mobileVarents}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }}
                    >
                        Building
                    </motion.p>
                    <motion.div
                        variants={mobileVarents}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.5 }}
                    >
                        <FlipWords words={words} className='font-black text-white text-6xl' />
                    </motion.div>
                    <motion.p className="text-4xl font-black text-neutral-300" variants={mobileVarents}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.8 }}
                    >
                        Web Applications
                    </motion.p>
                </motion.div>
            </motion.div>

        </motion.div>
    )
}

export default HeroText
