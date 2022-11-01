import jsonData from '../data.json';

export async function getRankingList() {
    return jsonData.students;
}

export async function getQuestionsLen() {
    return jsonData.questions.length;
}