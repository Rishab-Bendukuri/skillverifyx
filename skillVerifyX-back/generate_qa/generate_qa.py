import random
from langchain_openai import ChatOpenAI

def getVal(ele):
    return ele.split(":")[1]

def generate_multiple_choice_question(skill_name, history):
    llm = ChatOpenAI(openai_api_key="sk-"+"WyOStV5LRv59GLfxhOC5T3BlbkFJKlQ7JfJQBp8DXSxOPccV", model_name="gpt-3.5-turbo", temperature=0.7)
    prompt = f"""Skill: {skill_name}
    history: {history}

    For given skill, generate a question, answer and 3 random options. Use the following format. Make new question which is not in history.
    Question:
    Correct Option:
    Option1:
    Option2:
    Option3:"""
    
    res = llm.invoke(prompt).content
    # res = """Question: What is my name?
    # Correct Option: Manideep
    # Option1: Rink7u
    # Option2: GRM
    # Option3: Moon night"""
    try:
        res = [i for i in res.split("\n") if i!=""]
        d = {
            "question": getVal(res[0]),
            "options": random.sample([getVal(res[1]), getVal(res[2]), getVal(res[3]), getVal(res[4])], 4),
            "correctAnswer": getVal(res[1]),
        }
        return d
    except:
        return {
            "Error": "Something went wrong!"
        }
