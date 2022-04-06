let User = [
    {id: 1, name: 'name1', age: 1},
    {id: 2, name: 'name2', age: 2},
    {id: 3, name: 'name3', age: 3},
]

const http = require('http')
let data = User

async function postNewUser(request) {
    return new Promise((resolve) => {
        let body = ''
        request
            .on('data', chunk => {
                body += chunk
            })
            .on('end', () => {
                request.body = JSON.parse(body)
                resolve()
            })
    })
}

http.createServer(async (request, response) => {
    switch (request.method) {
        case 'GET':
            response.end(JSON.stringify(data))
            break;
        case 'POST':
            await postNewUser(request)
            data.push(request.body)
            response.end(JSON.stringify(data))
            break;
        case 'PUT':
            let user = ''
            request.on('data', chunk => {
                user += chunk
            })
            request.on('end', () => {
                data = JSON.parse(user)
            })
            response.end(JSON.stringify(data))
            break;
    }
}).listen(3000, () => {
    console.log('Server started on 3000 port')
})
