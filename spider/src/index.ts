import { Octokit } from "octokit";
import { assignments, AUTH_TOKEN } from "./config";

const octokit = new Octokit({
    auth: AUTH_TOKEN
})

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

    let log = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'os-autograding',
        repo: 'oskernel-yfblock',
        path: '2022_09_16_15_34_00.txt',
        ref: 'gh-pages'
    });
    
    let data = log.data['content' as keyof typeof log.data];
    let encoding = log.data['encoding' as keyof typeof log.data];
    let buff = Buffer.from(data, encoding);
    let text = buff.toString('utf8');   

    console.log(text)
}

test()