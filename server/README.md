
## Overview
This server generates hierarchically-organized cloc data for a given git repository. This data is useful for visualizing the repository, and possibly for other things.

When the server receives a request, it starts by cloning the repository on the server. Then it uses the `cloc` program to determine the length and type of code for each code file in the repository. Then it converts the `cloc` data to a JSON object whose structure matches the file structure of the repository. Finally, it returns the JSON to the client.

## Requests
The server accepts secure requests over both HTTP and Websockets. In both cases, the client receives a `success` response if the cloc analysis is successful, and an `error` response if not. If Websockets is used, the client also receives numerous `update` responses while the server is analyzing the repo.

Regardless of what protocol is used, a request to the server contains the following parameters:

1. owner -- the owner of the repo
2. name -- the name of the repo
3. branch -- the branch to be analyzed. This is optional, and defaults to the default branch (typically, master).
4. username -- a github username. Required only for private repos.
5. password -- a github password. Required only for private repos.

The specific format for the two protocols is discussed below.

### HTTP Requests
The server accepts both GET and POST requests over https. If a GET request is used, the pathname must be `cloc` and the parameters should be included in the query string, e.g. --
```
GET: https://localhost:8000/cloc?owner=mrcoder&name=theproject&branch=develop
```
If a POST is used, the pathname must again be `cloc` and the parameters should be included as stringified JSON in the body of the request, e.g. --
```
POST: https://localhost:8000/cloc
where the body is the output of
JSON.stringify({
    owner: "mrcoder",
    name: "theproject",
    branch: "develop",
    username: "hi",
    password: "there
})
```

### Websockets Requests
If the client uses Websockets, the request should be sent to `wss://localhost:8000` (no pathname), and message should be a stringified JSON object with `endpoint` and `params` properties. The `endpoint` must be `cloc`, and the params should contain the data discussed above, for example:
```
JSON.stringify({
    endpoint: "cloc",
    params: {
        owner: "mrcoder",
        name: "theproject",
        branch: "develop",
        username: "hi",
        password: "there
    }
})
```

## Responses
All responses (over both HTTP and Websockets) are JSON objects with exactly two properties: `type` and `data`. The three types of responses are illustrated below.

### success
If a request is successful, the server will return the following (as an example):
```
{
    type: 'success',
    data: {
        owner: 'code-flower',
        name: 'client-web',
        branch: 'new-ui',
        fullName: 'code-flower/client-web',
        fNameBr: 'code-flower/client-web::new-ui',
        lastCommit: 'd64bc6686057092941fa17548def6d9e0a291110',
        githubUrl: 'https://github.com/code-flower/client-web/tree/new-ui'
        cloc: {
            tree: { name: 'root', children: [Object] },
            ignored: '.gitignore: listed in $Not_Code_Extension{gitignore}\n'
        }
    }
}
```

### error
For errors, the server will return the following:
```
{
    type: 'error',
    data: {
        name: 'RepoNotFound',
        message: 'The requested repo could not be found',
        statusCode: 404,
        ...optional other data, such as params: [the request params],
    }
}
```
The various types of errors, and their codes and messages, are listed in `config/api.config.js`.

### update (websockets only)
Websockets requests will receive updates in this format:
```
{
    type: 'update',
    data: {
        text: 'cloning into code-flower/client-web...'
    }
}
```

## Installation/Development

There's an install script from Ubuntu 16.04 in bin/install.sh.
The commands should probably be run individually.

A variety of commands for development/testing are listed in the `package.json`
The basic dev command is `npm run dev`.
