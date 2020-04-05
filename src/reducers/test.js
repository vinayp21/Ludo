
const initalState = {
    data: 1
}

function test(state = initalState, payload) {
    switch (payload.type) {
        case 'Test':
            return {
                ...state,
                data: 21
            }
        default:
            return state;
    }
}

export default test