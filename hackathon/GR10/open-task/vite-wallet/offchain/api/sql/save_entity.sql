DROP FUNCTION IF EXISTS save_entity(params JSONB);
CREATE OR REPLACE FUNCTION save_entity(params JSONB) RETURNS jsonb AS $$
DECLARE
    _user_token     text                   := params ->> 'token';
    _type           saved_address_types    := params ->> 'type';
    _address        text                   := params ->> 'address';
BEGIN
    if exists(select id from users where token = _user_token) then
        insert into saved_addresses(user_id, address, type)
            values ((select id from users where token = _user_token),
                    _address,
                    _type);
        return jsonb_build_object('code', 201);
    else
        return jsonb_build_object('code', 401);
    end if;
END
$$
    LANGUAGE 'plpgsql';
