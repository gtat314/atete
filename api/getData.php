<?php




$dataNice   = [
    'applications'      => [],
    'searchEngines'     => []
];

$dataFile   = $_SERVER[ 'DOCUMENT_ROOT' ] . '/data/admin.json';




if ( file_exists( $dataFile ) === false ) {

    echo json_encode( $dataNice );

    exit( 0 );

}




$contents = file_get_contents( $dataFile );

if ( $contents === '' ) {

    echo json_encode( $dataNice );

    exit( 0 );

}




echo $contents;

exit( 0 );
