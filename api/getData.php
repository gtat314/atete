<?php




$dataNice   = [
    'applications' => []
];

$dataFile   = $_SERVER[ 'DOCUMENT_ROOT' ] . '/data/admin.json';




if ( file_exists( $dataFile ) === false ) {

    echo json_encode( $dataNice );

    exit( 0 );

}




echo file_get_contents( $dataFile );

exit( 0 );
