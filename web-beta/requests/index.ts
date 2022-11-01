import jsonData from '../data.json';

export async function getRankingList() {
    return jsonData.students;
}

export async function getQuestionsLen() {
    return jsonData.questions.length;
}

export async function getQuestions() {
    return jsonData.questions;
}

export async function getQuestionPassRate(questionName: string) {
    let studentNum = jsonData.students.length;
    if(studentNum == 0) return 0;
    let passNum = jsonData.students.filter((student) => {
        if(!student.details.default) return false;
        return student.details.default[questionName as keyof typeof student.details.default];
    }).length;
    return (passNum / studentNum * 100).toFixed(2);
}