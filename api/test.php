<?php




// var_dump( get_loaded_extensions() );

// $output = system( 'command -v curl', $returnCode ); var_dump( $output ); var_dump( $test );

// $curlOutput = shell_exec( '/usr/bin/curl -s -o /dev/null -w "%{http_code}" -L -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: en-US,en;q=0.5" -H "Cache-Control: max-age=0" -H "Connection: keep-alive" -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0" http://192.168.1.85:20080/index.php/apps/tasks/' );
// var_dump( $curlOutput );

// $output = system( 'command -v curl', $returnCode );

exec( 'command -v curl', $output, $returnCode );
var_dump( $output );
var_dump( $returnCode );
