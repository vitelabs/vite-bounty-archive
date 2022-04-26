DROP FUNCTION IF EXISTS user_login(params JSONB);
CREATE OR REPLACE FUNCTION user_login(params JSONB) RETURNS jsonb AS $$
DECLARE
    _email      text    := params ->> 'email';
    _password   text    := params ->> 'password';
BEGIN
    if exists(select id from users where email = _email) then
        if (select password from users where email = _email) = _password then
            return (select to_jsonb(a) from (
                select id, address, 200 as code from users where email = _email
            ) a);
        else
            return jsonb_build_object('code', 401);  -- Fail login
        end if;
    else
        return jsonb_build_object('code', 201);  -- User should be created
    end if;
END
$$
    LANGUAGE 'plpgsql';
