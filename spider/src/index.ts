import { Octokit } from "octokit";
import { assignments, AUTH_TOKEN } from "./config";
import fetch from "node-fetch";
const octokit = new Octokit({
    auth: AUTH_TOKEN
})
  

async function fetchAssignments(classroom: string, assigment: string, sessionToken: string) {
    return new Promise(async (resolve, reject) => {

        const url = `https://classroom.github.com/classrooms/${classroom}/assignments/${assigment}/download_grades`
        const response = await fetch(url, {
            headers: {
            accept:
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'if-none-match': 'W/"91c8c819008d409c96ac22f96ff4029d"',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            cookie:
                `dotcom_user=; _github_classroom_session=${sessionToken}`
            },
            // referrerPolicy: 'strict-origin-when-cross-origin',
            // body: null,
            method: 'GET'
        })
    
        if (response.ok) {
            console.log(response.text)
        } else {
            reject(`download fail: ${url}`)
        }
    })
}

async function test() {
    // let rate_limit = await octokit.request('GET /rate_limit', {})
    // console.log(rate_limit);

    // let orgs = await octokit.request('GET /orgs/{org}/repos', {
    //     org: 'os-autograding'
    // })
    // console.log(orgs);

    // let runs_output = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals', {
    //     owner: 'os-autograding',
    //     repo: 'oskernel2022-byte-os',
    //     run_id: 3058022242
    // })
    // console.log(runs_output)

    // let log = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs', {
    //     owner: 'os-autograding',
    //     repo: 'oskernel2022-byte-os',
    //     run_id: 3058022242,
    //     attempt_number: 1
    // })
    // console.log(log);

    // let log = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    //     owner: 'os-autograding',
    //     repo: 'oskernel-yfblock',
    //     path: '2022_09_16_15_34_00.txt',
    //     ref: 'gh-pages'
    // });
    
    // let data = log.data['content' as keyof typeof log.data];
    // let encoding = log.data['encoding' as keyof typeof log.data];
    // let buff = Buffer.from(data, encoding);
    // let text = buff.toString('utf8');   

    // console.log(text)
    // console.log(process.env['ORG'])

    let classroom = {
        "name": "113154735-os-autograding-classroom-a857a2",
        "assignments": ["oskernel"],
        "studentBlacklist": []
    };
    let value = await fetchAssignments(classroom['name'], classroom['assignments'][0], process.env['SESSION_TOKEN'] ?? "");

    console.log(value);
}

test()