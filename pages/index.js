import {databaseConnection} from "../lib/db";

export default function Home({response}) {
    return (
        <div className={'mx-5 row'}>
            {response.map(i => (
                <div key={i.id} className={'col-2 card bg-dark border-info'}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={i.thumbnail} alt={'thumbnail'} className={'card-img-top'}  />
                    <div className={'h5 card-body'}>
                        {`${i.name} - ${i.price}`}
                        <div className={'h6'}>
                            {i.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


export const getServerSideProps = async () => {
    const result = await databaseConnection.raw(`
        SELECT p.id,
               p.price,
               p.name,
               p.description,
               f.path as thumbnail,
               (SELECT json_agg(f2.path) as images
                FROM products_files
                         LEFT JOIN files f2 ON f2.id = products_files.file_id
                WHERE product_id = p.id)
        FROM products p
                 LEFT JOIN files f ON p.thumbnail = f.id;
    `)
    return {
        props: {
            response: result.rows
        }
    }
}
