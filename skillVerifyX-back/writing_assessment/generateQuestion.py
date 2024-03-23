from langchain_openai import ChatOpenAI

def get_qsn():
    llm = ChatOpenAI(openai_api_key="sk-"+"WyOStV5LRv59GLfxhOC5T3BlbkFJKlQ7JfJQBp8DXSxOPccV", model_name="gpt-3.5-turbo")
    return llm.invoke("""Generate question for "Analytical Writing Assessment" round. Your output should contain only question and nothing else.""").content
    # return "What are the potential implications of integrating artificial intelligence into everyday decision-making processes, and how might society address the ethical considerations surrounding its implementation?"