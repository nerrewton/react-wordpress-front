import { getDescripcion } from "../../tools/wordpressTools";

const initialState = {
    title: "",
    description: "",
    image: "",
    type: "",
    author: "",
    site_name: "cockycode",
    url: "",
    keywords : ""
};

export default function( state = initialState , action ){
    if( action.type === "SET_META_DATA" ){
        return {
            ...state,
            ...action.metadata,
            description: getDescripcion( action.metadata.description )
        }
    }else{
        return state;
    }
}