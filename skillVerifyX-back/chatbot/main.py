from langchain_openai import ChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS

def get_ans(query, db):
    llm = ChatOpenAI(openai_api_key="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", model_name="gpt-3.5-turbo")
    db = FAISS.load_local("python", OpenAIEmbeddings(openai_api_key="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"))
    docs = db.similarity_search(query)

    content = ""
    for i, doc in enumerate(docs):
        content += (str(i+1)+".")
        content += doc.page_content
        content += "\n\n\n"

    prompt = "Provided content:\n" + content + """\n Answer the follwing question. If you don't know answer, just say "Don't know" and don't make your own answers.\n Question:\n"""+query
    return llm.invoke(prompt)

print(get_ans("What is JVM?", "java"))