export const getDescripcion = ( content ) => {
        
    if ( !content ) return "";

    let contentArray = content.split("<p>");
    contentArray = contentArray.map( paragraph => {
        paragraph = paragraph.replace("</p>", "" );
        paragraph = paragraph.replace("<!-- wp:paragraph -->", "" );
        paragraph = paragraph.replace("<!-- /wp:paragraph -->", "" );
        paragraph = paragraph.replace("\n", "" );

        return paragraph.trim().substring(0, 100) + "...";
    });

    contentArray.filter( string => {
        if( !string.trim() ){
            return true;
        }else{
            return false;
        }
    });

    return contentArray[1];
}