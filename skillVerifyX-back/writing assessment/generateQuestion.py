from langchain_openai import ChatOpenAI

def get_qsn():
    llm = ChatOpenAI(openai_api_key="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", model_name="gpt-3.5-turbo")
    return llm.invoke("""Generate question for "Analytical Writing Assessment" round. Your output should contain only question and nothing else.""").content

print(get_qsn())