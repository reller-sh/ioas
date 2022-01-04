import {useForm} from 'react-hook-form';
import {Input} from "../../comps/Input";
import {useRouter} from "next/router";
import qs from 'qs'

export default function Auth() {


    const {control, handleSubmit} = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const {push} = useRouter()

    return (
        <div className={'w-25 mx-auto mt-5'}>
            <form onSubmit={handleSubmit(async data => await push(`/auth/res?${qs.stringify(data)}`))}>
                <Input
                    control={control}
                    name={'username'}
                    placeholder={'Логин'}
                />
                <Input
                    control={control}
                    name={'password'}
                    placeholder={'Пароль'}
                />
                <button
                    className={'btn btn-primary'}
                    type={'submit'}
                >
                    Войти
                </button>
            </form>
        </div>
    )
}
