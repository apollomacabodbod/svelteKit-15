
import { auth } from '$db/fake_auth'
import { sequence } from '@sveltejs/kit/hooks'



async function logger({ event, resolve}){

    const start_time = Date.now()

    const response = await resolve(event)
    console.log(`${Date.now() - start_time}ms ${event.request.method} ${event.url.pathname}`)

    return response;

}

function authorize( { event, resolve }){
    const user = auth()
    event.locals.user = user
    return resolve(event)
}

export const handle = sequence(logger,authorize)


// export function handleFetch ({ request , fetch }){
//     return fetch(request)
// }


// export function handleError({ error, event }){
//     return {
//         message: 'Oops, im  intercepting in a hook',
//         code: error.code
//     }
// }
