<?php




ob_start();

$response = [];

exec( 'command -v curl', $output, $returnCode );

for ( $i = 0 ; $i < count( $_POST ) ; $i++ ) {

    $response[ $_POST[ $i ] ] = 0;

    if ( $returnCode !== 0 ) {

        continue;

    }

    if ( parse_url( $_POST[ $i ], PHP_URL_SCHEME ) === false || parse_url( $_POST[ $i ], PHP_URL_HOST ) === false ) {

        continue;

    }

    $curlOutput = (int) shell_exec( $output[ 0 ] . ' -s -o /dev/null -w "%{http_code}" -L -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: en-US,en;q=0.5" -H "Cache-Control: max-age=0" -H "Connection: keep-alive" -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0" ' . $_POST[ $i ] );

    if ( $curlOutput >= 200 && $curlOutput < 500 ) {

        $response[ $_POST[ $i ] ] = 1;

    }

}




ob_end_clean();

echo json_encode( $response );

exit( 0 );
