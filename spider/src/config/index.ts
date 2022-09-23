import * as dotenv from "dotenv";

export const config = dotenv.config();

export const organiztion: string = 'os-autograding';
export const fullOrganization: string = '113154735-os-autograding-classroom-a857a2';
export const assignment = 'oskernel';
export const works = ['default', 'main'];
export const AUTH_TOKEN = process.env['TOKEN'];

// JsonData store the grades and the other info.
export let JsonData: ResultObject = {
    available: {},
    // grades has the tree. grades --> studentGithubUsername --> workName --> grade
    students: [],
    // latest update time
    latestUpdatedAt: Date.now()
}


// initialize the JsonData by works
for(let work of works) {
    JsonData['available'][work] = 0;
} 