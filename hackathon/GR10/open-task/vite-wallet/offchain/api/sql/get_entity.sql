DROP FUNCTION IF EXISTS get_entity(params JSONB);
CREATE OR REPLACE FUNCTION get_entity(params JSONB) RETURNS jsonb AS $$
DECLARE
    _user_token     text                   := params ->> 'token';
    _type           saved_address_types    := params ->> 'type';
    _limit          int                    := coalesce((params ->> 'limit')::int, 10000);
    _offset         int                    := coalesce((params ->> 'offset')::int, 0);
    _total          int;
    _resp           jsonb;
BEGIN
    select jsonb_agg(a) from (
        select id,
               address,
               type
        from saved_addresses
        where type = _type and user_id = (select id from users where token = _user_token)
        limit _limit
        offset _offset
    ) a into _resp;

    select count(1)
        from saved_addresses
        where type = _type and user_id = (select id from users where token = _user_token)
        into _total;

    return jsonb_build_object('total', _total, 'items', coalesce(_resp, '[]'::jsonb));
END
$$
    LANGUAGE 'plpgsql';
