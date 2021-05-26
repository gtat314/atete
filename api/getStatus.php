<?php




$response = [];

for ( $i = 0 ; $i < count( $_POST ) ; $i++ ) {

    $curl = curl_init();

    curl_setopt_array( $curl, array(
        CURLOPT_URL             => $_POST[ $i ],
        CURLOPT_RETURNTRANSFER  => true,
        CURLOPT_HEADER          => true,
        CURLOPT_NOBODY          => false,
        CURLOPT_TIMEOUT         => 10,
        CURLOPT_FOLLOWLOCATION  => true,
        CURLOPT_HTTPHEADER      => array(
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding: gzip, deflate",
            "Accept-Language: en-US,en;q=0.5",
            "Cache-Control: max-age=0",
            "Connection: keep-alive",
            "DNT: 1",
            "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0"
        )
    ));

    $output     = curl_exec( $curl );
    $error      = curl_error( $curl );
    $status     = curl_getinfo( $curl, CURLINFO_HTTP_CODE );

    curl_close($ch);

    if ( $error === "" && $status === 200 ) {

        $response[ $_POST[ $i ] ] = 1;

    } else {

        $response[ $_POST[ $i ] ] = 0;

    }

}




echo json_encode( $response );

exit( 0 );
