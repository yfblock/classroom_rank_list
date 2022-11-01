import { JsonData, works } from "../config";

/**
 * Build a blank grade object but has the work name. 
 * @returns blank grade object. (All grades are zero.)
 */
export function buildEmptyGrades() {
    // TODO: Save it to a special place after building, and use it directly at next time.
    let obj: any = {};
    works.forEach((work, _index)=> obj[work] = 0);
    return obj;
}

/**
 * Update the available points of the work.
 * @param work Work name
 * @param points Available points. (The most points people can got.)
 */
export function updateAvailable(work: string, points: number) {
    JsonData['available'][work] = points;
}

/**
 * Update questions
 * @param questions the list of questions 
 */
export function updateQuestions(questions: string[]) {
    JsonData['questions'] = questions;
}

/**
 * Add the student's grade to JsonData.
 * @param studentInfo 
 */
export function addStudentInfo(studentInfo: StudentInfo) {
    JsonData['students'].push(studentInfo)
}