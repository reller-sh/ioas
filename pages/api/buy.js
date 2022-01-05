import {databaseConnection} from "../../lib/db";
import {fromRawCookie} from "../../lib/utils";

export default async function handler(req, res) {

    try {
        const pRows = await databaseConnection.raw(`
            SELECT price::numeric
            from products
            where id = :id
        `, {id: req.body.id})
        const price = pRows.rows[0].price

        const bind = {price, from: fromRawCookie(req.headers.cookie).get('authorize_id'), to: req.body.id}

        await databaseConnection.raw(`
            DO
            $$
                BEGIN
                    UPDATE users SET balance = balance - ${bind.price}::money;
                    INSERT INTO transactions (from_entity_id, from_entity_name, to_entity_id, to_entity_name, amount, progress)
                    VALUES ('${bind.from}', 'users', '${bind.to}', 'products',
                            ${bind.price}::money, 100);
                    IF (SELECT AVG(balance::numeric) FROM users WHERE id = '${bind.from}') < 0 THEN
                        ROLLBACK;
                    END IF;
                END
            $$;
        `)

        res.status(200).json({name: -pRows.rows[0].price})
    } catch (e) {
        res.status(200).json({error: 'Unexpected execution error!', message: e.toString()})
    }
}
