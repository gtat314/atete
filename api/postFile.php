<?php




$response = [
    'status'    => 0
];




if ( isset( $_FILES[ 'file' ] ) === true && empty( $_FILES[ 'file' ] ) === false ) {

    $fileInfo           = pathinfo( $_FILES[ 'file' ][ 'name' ] );
    $fileExt            = $fileInfo[ 'extension' ];
    $fileNewName        = hash_file( 'md5', $_FILES[ 'file' ][ 'tmp_name' ] );
    $fileNewFilename    = $fileNewName . '.' . $fileExt;
    $fileNewFilePath    = $_SERVER[ 'DOCUMENT_ROOT' ] . '/data/media/' . $fileNewFilename;

    move_uploaded_file( $_FILES[ 'file' ]['tmp_name'], $fileNewFilePath );

    $response[ 'status' ]       = 1;
    $response[ 'filename' ]     = $fileNewFilename;

}




echo json_encode( $response );

exit( 0 );
