import {databaseConnection} from "../../lib/db";

export default async function handler(req, res) {

    try {

        await databaseConnection.raw(`
        do
        $$
            DECLARE
                avatar uuid := null;
            BEGIN
                IF NOT '${req.body.avatar}' = 'undefined' then
                    insert into files(name, path)
                    values (concat(uuid_generate_v4(), '-avatar'), '${req.body.avatar}')
                    returning id into avatar;
                end if;
        
                insert
                into users(email, username, password, firstname, lastname, patronymic, avatar)
                values ('${req.body.email}',
                        '${req.body.username}',
                        '${req.body.password}',
                        '${req.body.firstname}',
                        '${req.body.lastname}',
                        '${req.body.patronymic}', avatar);
            END;
        $$;
        `)

        res.status(200).json({status: 'ok'})
    } catch (e) {
        res.status(200).json({error: 'Unexpected execution error!', message: e.toString()})
    }
}
