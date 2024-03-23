from langchain_openai import ChatOpenAI

def get_score(question, answer):
    llm = ChatOpenAI(openai_api_key="sk-"+"WyOStV5LRv59GLfxhOC5T3BlbkFJKlQ7JfJQBp8DXSxOPccV", model_name="gpt-3.5-turbo")
    return llm.invoke("Given question: " + question + "\nAnswer to question: " + answer + "Score the answer to the question out of 100. Scoring is based on factors such as language quality, relevance to the question, etc. Your output should only contain the mark.").content
    # return "80"+