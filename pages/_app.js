import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Header} from "../comps/Header";
import {AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";
import {motion} from 'framer-motion'

export const postVariants = {
    initial: {
        opacity: 0,
        x: -100
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: [0, 0.55, 0.45, 1],
        },
        x: 0
    },
    exit: {
        opacity: 0,
        x: 100,
        transition: {
            duration: 0.3
        }
    }
};

function App({Component, pageProps}) {
    const {route} = useRouter()
    return (
        <>
            <div className={'bg-dark vh-100 vw-100 m-0 p-0 text-white overflow-hidden'}>
                <Header>
                    <AnimatePresence exitBeforeEnter>
                        <motion.div initial="initial" animate="enter" exit="exit" variants={postVariants} key={route}>
                            <Component {...pageProps}/>
                        </motion.div>
                    </AnimatePresence>
                </Header>
            </div>
        </>
    )
}

export default App
