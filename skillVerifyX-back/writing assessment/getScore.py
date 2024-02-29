from langchain_openai import ChatOpenAI

def get_score(question, answer):
    llm = ChatOpenAI(openai_api_key="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", model_name="gpt-3.5-turbo")
    return llm.invoke("Given question: " + question + "\nAnswer to question: " + answer + "Score the answer to question out of 100. Scoring is based on how good the answer is. Your output should only contain mark.").content

print(get_score("What is gre?", "The GRE, or Graduate Record Examination, is a standardized test used for admissions into graduate and business school programs in various English-speaking countries, including the United States. The test is administered by the Educational Testing Service (ETS)."))