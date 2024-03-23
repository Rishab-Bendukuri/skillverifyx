from flask import Flask, request, jsonify
from writing_assessment.generateQuestion import get_qsn
from writing_assessment.getScore import get_score
from chatbot.main import get_ans
from generate_qa.generate_qa import generate_multiple_choice_question
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/genai/evaluate', methods=['POST'])
def evaluate():
    if request.method == 'POST':
        return get_score(request.json['question'], request.json['answer'])

@app.route('/genai/get-question', methods=['GET'])
def get_question():
    if request.method == 'GET':
        return get_qsn()

@app.route('/genai/kbq', methods=['POST'])
def kbq():
    if request.method == 'POST':
        return get_ans(request.json["query"], request.json["db"])

@app.route('/genai/getQuestionSkill', methods=['POST'])
def getQuestion():
    questions = []
    if request.method == 'POST':
        for _ in range(request.json["questions"]):
            questions.append(
                generate_multiple_choice_question(
                    request.json["skill"], 
                    "".join([str(i)+". "+q['question'] for i, q in enumerate(questions)])
                )
            )
        return {"questions": questions}

if __name__ == '__main__':
    app.run(debug=True)
