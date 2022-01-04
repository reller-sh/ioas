import {A} from "./A";
import {useCookie} from "../lib/utils";
import {useEffect, useState} from "react";


// path, name, isAuth[not, ignore, auth]
const tabs = [
    ['/', 'Главная', 0],
    ['/auth', 'Войти', -1],
    ['/profile/me', 'Профиль', 1],
]


export const Header = ({children}) => {
    const [isAuth, setAuth] = useState();
    const cookie = useCookie();
    useEffect(() => setAuth(typeof cookie.get('authorize_id') === 'string'), [cookie])
    return (<>
        <nav className="nav nav-pills nav-justified m-3">
            {tabs.map((item, key) => (
                <A
                    key={String(key)}
                    className={item[2] === 0
                        ? 'nav-link'
                        : (item[2] === 1) === isAuth ? 'nav-link'
                            : 'd-none'}
                    path={item[0]}
                    activeCn={'active'}
                >
                    {item[1]}
                </A>
            ))}
        </nav>
        {children}
    </>)
}
