<?php




$dataNice   = [];
$dataFile   = $_SERVER[ 'DOCUMENT_ROOT' ] . '/data/admin.json';




file_put_contents( $dataFile, $_POST[ 'data' ] );

exit( 0 );
