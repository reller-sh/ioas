import {databaseConnection} from "../../lib/db";
import {useCookie} from "../../lib/utils";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Res = ({ids}) => {
    const {push, back} = useRouter()
    const cookie = useCookie();
    const [isAuth] = useState(ids.length === 1);

    useEffect(() => {
        if (isAuth)
            cookie.set('authorize_id', ids[0].id)
    }, [cookie, ids, isAuth])

    return (
        <>
            {isAuth ? (
                <div
                    className={'mx-auto w-50 text-center mt-5'}
                >
                    <div
                        className={'h1'}
                    >
                        Вы успешно авторизованы!
                    </div>
                    <button
                        onClick={() => push('/')}
                        className={'btn btn-success'}
                    >
                        На главную.
                    </button>
                </div>
            ) : <div
                className={'mx-auto w-50 text-center mt-5'}
            >
                <div
                    className={'h1'}
                >
                    Не удалось войти.
                </div>
                <div className={'d-flex align-items-center justify-content-around w-50 mx-auto'}>
                    <button
                        onClick={back}
                        className={'btn btn-warning'}
                    >
                        Попробовать ещё раз
                    </button>
                    <button
                        onClick={() => push('/')}
                        className={'btn btn-primary'}
                    >
                        На главную
                    </button>
                </div>

            </div>}
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const {username, password} = ctx.query
    const ids = (await databaseConnection
        .raw(`
            SELECT id
            FROM users
            WHERE username = ?
              AND password = ?
        `, [username, password])).rows
    return {
        props: {
            ids
        }
    }
}

export default Res
