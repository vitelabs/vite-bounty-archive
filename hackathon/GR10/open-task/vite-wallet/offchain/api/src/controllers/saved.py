from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_db
import basic
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class EntityGet(BaseModel):
    _table = "saved_addresses"
    token: str
    type: str  # token / contact
    limit: Optional[int] = None
    offset: Optional[int] = None


class Entity(BaseModel):
    _table = "saved_addresses"
    token: str
    type: str  # token / contact
    address: str


@router.post("/save", tags=["Save", "Tokens", "Contacts"], name="Saves a token or contact for an account")
async def save_address(body: Entity,
                       db=Depends(get_db)):
    async with basic.pass_to("save_entity", db, body) as entity:
        if entity["code"] == 201:
            return entity
        else:
            raise HTTPException(status_code=entity["code"])


@router.get("/save", tags=["Save", "Tokens", "Contacts"], name="Get a list of saved tokens or contacts for an account")
async def get_saved(params: EntityGet = Depends(),
                    db=Depends(get_db)):
    async with basic.pass_to("get_entity", db, params) as saved_entities:
        return saved_entities


# @router.put("/model", tags=["Models"], name="Get the model")
# async def get_event(params: Model = Depends(),
#                     db=Depends(get_db)):
#     # An example of easy to use basic update method
#     async with basic.update(params, db) as model:
#         return model
#
#
# @router.get("/model_process", tags=["Models"], name="Process the model using PG procedure")
# async def get_event(params: Model = Depends(),
#                     db=Depends(get_db)):
#     # An example to redirect input to PG procedure
#     async with basic.pass_to("procedure_template", db, params) as model:
#         return model
#
#
# @router.delete("/model", tags=["Models"], name="Delete the model")
# async def get_event(params: Model = Depends(),
#                     db=Depends(get_db)):
#     # An example of easy to use basic delete method
#     async with basic.delete(params, db) as model:
#         return model
#
#
# @router.put("/model", tags=["Models"], name="Get the model")
# async def get_event(params: Model = Depends(),
#                     db=Depends(get_db)):
#     # An example of easy to use basic get method
#     async with basic.get(params, db) as model:
#         return model
