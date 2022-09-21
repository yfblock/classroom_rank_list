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
 * Update the student's grade from JsonData.
 * @param githubUsername The github username of the student whose grades will be updated.
 * @param grades The student's grades.
 */
export function updateStudentGrades(githubUsername: string, grades: any) {
    JsonData['grades'][githubUsername] = grades;
}