<?php

$response = [];

ob_start();




$outputTop = shell_exec( '/usr/bin/top -b -n 1' );




if ( $outputTop === null ) {

    echo json_encode( $response );

    exit( 0 );

}




if ( preg_match_all('/.*Cpu.*?(\S+)\.\d\s+id,/', $outputTop, $output_array) === 1 ) {

    if ( count( $output_array ) === 2 ) {

        $response[ 'cpu' ] = $output_array[ 1 ][ 0 ];

    }

}




if ( preg_match_all('/load average: (\S+), (\S+), (\S+)/', $outputTop, $output_array) === 1 ) {

    if ( count( $output_array ) === 4 ) {

        $response[ 'load1' ]    = $output_array[ 1 ][ 0 ];
        $response[ 'load5' ]    = $output_array[ 2 ][ 0 ];
        $response[ 'load15' ]   = $output_array[ 3 ][ 0 ];

    }

}




if ( preg_match_all('/Mem.*?(\S+)\.\d\stotal,/', $outputTop, $output_array) === 1 ) {

    if ( count( $output_array ) === 2 ) {

        $response[ 'memTotal' ] = $output_array[ 1 ][ 0 ];

    }

}




if ( preg_match_all('/Swap.*?(\S+)\.\d\stotal.*?(\S+)\.\d\sused.*?(\S+)\.\d\savail/', $outputTop, $output_array) === 1 ) {

    if ( count( $output_array ) === 4 ) {

        $response[ 'swapTotal' ]    = $output_array[ 1 ][ 0 ];
        $response[ 'swapUsed' ]     = $output_array[ 2 ][ 0 ];
        $response[ 'memAvail' ]     = $output_array[ 3 ][ 0 ];

    }

}




$sensorsRaw = shell_exec( '/usr/bin/sensors' );

if ( $sensorsRaw !== null && preg_match('/\+(\S+)\sC/', $sensorsRaw, $output_array) === 1 ) {

    if ( count( $output_array ) === 2 ) {

        $response[ 'temperature' ] = $output_array[ 1 ];

    }

}




$ipRaw = shell_exec( '/usr/bin/curl -s ifconfig.me' );

if ( $ipRaw !== null && preg_match('/(\d+\.\d+\.\d+\.\d+)/', $ipRaw, $ipOutput) === 1 ) {

    $response[ 'ip' ] = $ipOutput[ 1 ];

}




if ( file_exists( '/etc/os-release' ) === true ) {

    $nameRaw = system( '/usr/bin/cat /etc/os-release | grep NAME | head -1', $nameResult );

    if ( $nameResult === 0 && preg_match('/NAME=(.*)/', $nameRaw, $nameOutput) === 1 ) {

        $response[ 'name' ] = $nameOutput[ 1 ];

    }

    $versionRaw = system( '/usr/bin/cat /etc/os-release | grep VERSION | head -1', $versionResult );

    if ( $versionResult === 0 && preg_match('/VERSION=(.*)/', $versionRaw, $versionOutput) === 1 ) {

        $response[ 'version' ] = $versionOutput[ 1 ];

    }

}




$unameRaw = system( '/usr/bin/uname -r', $unameResult );

if ( $unameResult === 0 && strlen( $unameRaw ) > 0 ) {

    $response[ 'kernel' ] = $unameRaw;

}




$uptimePrettyRaw = system( '/usr/bin/uptime -p', $uptimePrettyResult );

if ( $uptimePrettyResult === 0 && preg_match('/up\s(.*)/', $uptimePrettyRaw, $uptimePrettyOutput) === 1 ) {

    $response[ 'uptime' ] = $uptimePrettyOutput[ 1 ];

}




ob_clean();

echo json_encode( $response );

exit( 0 );
