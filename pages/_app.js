import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Header} from "../comps/Header";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Header>
                <Component {...pageProps} />
            </Header>
        </>
    )
}

export default MyApp
