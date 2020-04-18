export default function( state = {}, action ){
    switch (action) {
        case "uno":
            return {
                ...state,
                uno: 1
            }
        default:
            return state;
    }
}