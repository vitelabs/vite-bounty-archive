from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_db
import basic
from pydantic import BaseModel
from vite import new_wallet
from random import random
import hashlib
from typing import Optional

router = APIRouter()


class User(BaseModel):
    _table = "users"
    email: str
    password: str


class _CompleteUser(BaseModel):
    _table = "users"
    id: Optional[int] = None
    email: Optional[str] = None
    password: Optional[str] = None
    token: Optional[str] = None
    address: Optional[str] = None


@router.post("/login",
             tags=["Login"], name="Create or logins a user",
             description="Make sure, that password length is longer or equals 8 symbols")
async def create_event(body: User,
                       db=Depends(get_db)):
    if len(body.password) >= 8:
        body.password = hashlib.md5(body.password.encode('utf-8')).hexdigest()
        async with basic.pass_to("user_login", db, body) as existed_user:
            print(existed_user)
            if existed_user["code"] == 200:
                user = _CompleteUser(**existed_user)
                user.token = hashlib.md5(str(random()).encode('utf-8')).hexdigest()
                async with basic.update(user, db):
                    return {"token": user.token, "address": user.address, "code": 200}
            elif existed_user["code"] == 201:
                user = _CompleteUser(**body.__dict__)
                user.address = await new_wallet(password=body.password)
                user.token = hashlib.md5(str(random()).encode('utf-8')).hexdigest()
                async with basic.create(user, db):
                    return {"token": user.token, "address": user.address, "code": 201}
            else:
                raise HTTPException(status_code=401)

        # Deprecated!
        # async with basic.pass_to("user_login", db, body) as user_token:
        #     if user_token["code"] == 200:  # User exists
        #         return user_token
        #     elif user_token["code"] == 201:  # New user were created
        #         complete_user = _CompleteUser(**user_token, address=None)
        #         complete_user.address = await new_wallet(password=body.password)
        #         print(complete_user)
        #         async with basic.update(complete_user, db):
        #             return complete_user
        #     else:
        #         raise HTTPException(status_code=user_token["code"])
