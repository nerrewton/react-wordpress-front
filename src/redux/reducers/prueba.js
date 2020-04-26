export default function( state = { uno: 0 }, action ){
    switch (action.type) {
        case "uno":
            return {
                ...state,
                uno: 1
            }
        case "sum":
            return {
                ...state,
                uno: state.uno + 1
            }
        default:
            return state;
    }
}
