import {databaseConnection} from "../../lib/db";
import {fromRawCookie} from "../../lib/utils";
import {Input} from "../../comps/Input";
import {useForm} from "react-hook-form";

const ProfileMe = ({
                       profile = {},
                   }) => {
    const [data] = profile

    const {control} = useForm({defaultValues: data});

    return (
        <form className={'w-50 mx-auto'}>
            {Object.keys(data).map((key =>
                    <Input key={key} control={control} name={key} placeholder={key}/>
            ))}
            <button className={'btn btn-primary mt-3'}>
                Обновить
            </button>
        </form>
    )
}

export const getServerSideProps = async (ctx) => {
    const id = fromRawCookie(ctx.req.headers.cookie).get('authorize_id')
    const profile = await databaseConnection.raw(`
        SELECT u.id,
               u.email,
               u.username,
               u.password,
               u.firstname,
               u.lastname,
               u.patronymic,
               u.position,
               u.role,
               u.balance,
               f.path
        FROM users u
                 LEFT JOIN files f
                           ON u.avatar = f.id
        WHERE u.id = ?
        LIMIT 1
    `, [id])
    return {
        props: {profile: profile.rows}
    }
}


export default ProfileMe
