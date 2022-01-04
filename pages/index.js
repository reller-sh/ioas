import {databaseConnection} from "../lib/db";

export default function Home({awaiting}) {
    return (
        <div className={'mx-5'}>
            {JSON.stringify(awaiting)}
        </div>
    )
}


export const getServerSideProps = async () => {
    const result = await databaseConnection.raw(`
        SELECT *
        FROM products
    `)
    return {
        props: {
            awaiting: result.rows
        }
    }
}
