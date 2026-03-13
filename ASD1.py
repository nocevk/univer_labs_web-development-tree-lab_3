from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

app = FastAPI()

# Підключення папок для статики та шаблонів [cite: 135, 136]
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Модель для отримання даних від клієнта [cite: 215, 218]
class MessageRequest(BaseModel):
    email: str

# Сторінка профілю
@app.get("/profile")
async def get_profile(request: Request):
    return templates.TemplateResponse("profile.html", {"request": request})

# Обробник POST-запиту [cite: 217, 218]
@app.post("/api/message")
async def api_message(payload: MessageRequest):
    return {
        "status": "ok",
        "message": f"Дані отримано. Вказаний email: {payload.email}"
    }