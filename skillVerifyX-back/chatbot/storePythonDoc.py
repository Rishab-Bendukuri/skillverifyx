from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from PyPDF2 import PdfReader

reader = PdfReader("C:\\Users\\Rinku\\Desktop\\major\\eth-todo-list\\chatbot\\JAVA PROGRAMMING.pdf")

rtext = ""
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    if text:
        rtext += text

splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

texts = splitter.split_text(rtext)
embeddings = OpenAIEmbeddings(openai_api_key="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")

db = FAISS.from_texts(texts, embeddings)
db.save_local("java")