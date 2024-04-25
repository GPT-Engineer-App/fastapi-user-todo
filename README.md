# fastapi-user-todo

frontend for the next code:
main.py:
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from . import crud, models, schemas
from typing import Optional
from .database import SessionLocal, engine
from PIL import Image
import pytesseract
import io

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def post_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def get_users(skip: int = 0, limit: int = 0, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}/", response_model=schemas.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/todos/", response_model=schemas.Todo)
def post_todo_for_user(user_id: int, todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_user_todo(db=db, user_id=user_id, todo=todo)

@app.get("/todos/", response_model=list[schemas.Todo])
def get_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todos = crud.get_todos(db, skip=skip, limit=limit)
    return todos


@app.post("/todos/{todo_id}/images/", response_model=schemas.Image)
async def create_todo_image(todo_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Save the uploaded file
        with open(file.filename, "wb") as buffer:
            buffer.write(await file.read())

        # Create Image object with OCR
        image = schemas.ImageCreate(file_path=file.filename)
        return crud.create_todo_image_with_ocr(db=db, todo_id=todo_id, image=image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/todos/{todo_id}/images/", response_model=list[schemas.Image])
def get_todo_images(todo_id: int, db: Session = Depends(get_db)):
    return crud.get_todo_images(db=db, todo_id=todo_id)


## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/fastapi-user-todo.git
cd fastapi-user-todo
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
