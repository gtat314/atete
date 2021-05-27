function dom_application( data ) {

    var parentElem = document.querySelector( '.chunk.applications .content' );

    var subtitle = null;

    if ( data.s === null ) {

        var urlData = new URL( data.u );

        subtitle = urlData.hostname;

        if ( urlData.port !== '' ) {

            subtitle = subtitle + ':' + urlData.port;

        }

    } else {

        subtitle = data.s;

    }

    var link = lib_createElement({
        tag: 'A',
        href: data.u,
        target: '_blank',
        classes: [ 'application', 'button' ],
        parent: parentElem
    });

    var icon = lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon' ],
        parent: link
    });

    icon.style.backgroundImage = 'url(/data/media/' + data.v + ')';

    var body = lib_createElement({
        tag: 'DIV',
        classes: [ 'body' ],
        parent: link
    });

    lib_createElement({
        tag: 'P',
        text: data.t,
        parent: body
    });

    lib_createElement({
        tag: 'SPAN',
        text: subtitle,
        parent: body
    });

    var span = lib_createElement({
        tag: 'SPAN',
        classes: [ 'indicator' ],
        parent: link
    });

    lib_createElement({
        tag: 'P',
        parent: span
    });

}

function evt_submitSearch( evt ) {

    evt.preventDefault();

    var primaryEngineElem = searchForm.querySelectorAll( 'button' )[ 0 ];

    clbk_search( primaryEngineElem );

}

function evt_buttonSearch( evt ) {

    evt.preventDefault();

    var engineElem = evt.currentTarget;

    clbk_search( engineElem );

    evt.currentTarget.blur();

}

function clbk_search( elem ) {

    var inputElem = searchForm.querySelector( 'input' );

    var engineQuery = elem.getAttribute( 'data-searchquery' );

    var url = engineQuery.replace( '||query||', encodeURIComponent( inputElem.value ) );

    window.open( url );

    inputElem.value = '';

    inputElem.focus();

}

function clbk_populateMetrics( resp ) {

    var response = JSON.parse( resp );

    var percMem     = Math.round( ( ( response.memTotal - response.memAvail ) / response.memTotal ) * 100 );
    var percSwap    = Math.round( ( response.swapUsed / response.swapTotal ) * 100 );
    var memUsed     = response.memTotal - response.memAvail;
    var cpuUsed     = 100 - response.cpu;

    document.querySelector( '.systemTemperature' ).textContent  = response.temperature + '°C';
    document.querySelector( '.systemLoad1' ).textContent        = response.load1;
    document.querySelector( '.systemLoad5' ).textContent        = response.load5;
    document.querySelector( '.systemLoad15' ).textContent       = response.load15;
    document.querySelector( '.systemPercMem' ).textContent      = percMem + '%';
    document.querySelector( '.systemMem' ).textContent          = memUsed + ' MB';
    document.querySelector( '.systemPercSwap' ).textContent     = percSwap + '%';
    document.querySelector( '.systemSwap' ).textContent         = response.swapUsed + ' MB';
    document.querySelector( '.systemIp' ).textContent           = 'External Ip: ' + response.ip;
    document.querySelector( '.systemKernel' ).textContent       = 'Kernel: ' + response.kernel;
    document.querySelector( '.systemUptime' ).textContent       = 'Uptime: ' + response.uptime;
    document.querySelector( '.systemCpu' ).textContent          = cpuUsed + '%';

    if ( response.name === null || response.version === null ) {

        document.querySelector( '.systemName' ).style.display = 'none';

    } else {

        document.querySelector( '.systemName' ).style.display   = 'block';
        document.querySelector( '.systemName' ).textContent     = response.name + ' ' + response.version;

    }

}

function clbk_populateStatus( resp ) {

    var response = JSON.parse( resp );

    for ( var url in response ) {

        if ( document.querySelector( '.application[href="' + url + '"] .indicator p' ) === null ) {

            continue;

        }

        if ( response[ url ] === 1 ) {

            document.querySelector( '.application[href="' + url + '"] .indicator p' ).classList.add( 'online' );

        } else {

            document.querySelector( '.application[href="' + url + '"] .indicator p' ).classList.add( 'offline' );

        }

    }

}

function clbk_populateApplications( resp ) {

    var response            = JSON.parse( resp );

    if ( typeof response.applications === 'undefined' ) {

        return false;

    }

    var applicationsNum     = response.applications.length;
    var parentElem          = document.querySelector( '.chunk.applications .content' );

    while ( parentElem.firstChild ) {

        parentElem.firstChild.remove();

    }

    for ( var i = 0 ; i < applicationsNum ; i++ ) {

        dom_application( response.applications[ i ] );

    }

}

function init_search() {

    searchForm = document.querySelector( '.chunk.search form' );

    var buttons = searchForm.querySelectorAll( 'button' );

    var buttonsnNum = buttons.length;

    for ( var i = 0 ; i < buttonsnNum ; i++ ) {

        buttons[ i ].addEventListener( 'click', evt_buttonSearch );

    }

    searchForm.addEventListener( 'submit', evt_submitSearch );

}

function init_jokes() {

    lib_ajaxCall({
        url: 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist&type=single',
        onSuccess: function( resp ) {

            var response = JSON.parse( resp );

            localStorage.setItem( 'joke', response.joke );

        }
    });

}

function init_apps() {

    var status = localStorage.getItem( 'status' );

    if ( status !== null ) {

        clbk_populateStatus( status );

    }

    ajax_status();

    setInterval( function(){

        ajax_status();

    }, 600000);

}

function init_metrics() {

    var metrics = localStorage.getItem( 'metrics' );

    if ( metrics !== null ) {

        clbk_populateMetrics( metrics );

    }

    ajax_getMetrics();

    setInterval( function(){

        ajax_getMetrics();

    }, 10000);

}

function init_data() {

    var data = localStorage.getItem( 'data' );

    if ( data !== null ) {

        clbk_populateApplications( data );

    }

    ajax_data();

}

function ajax_data() {

    lib_ajaxCall({
        url: '/api/getData.php',
        post: {
            user: 'admin'
        },
        onSuccess: function( resp ) {

            localStorage.setItem( 'data', resp );

            clbk_populateApplications( resp );

            init_apps();

        }
    });

}

function ajax_status() {

    var apps        = document.querySelectorAll( '.applications .application.button' );
    var appsNum     = apps.length;
    var fd          = new FormData();

    for ( var i = 0 ; i < appsNum ; i++ ) {

        fd.append( i, apps[ i ].getAttribute( 'href' ) );

    }

    lib_ajaxCall({
        url: '/api/getStatus.php',
        formData: fd,
        onSuccess: function( resp ) {

            localStorage.setItem( 'status', resp );

            clbk_populateStatus( resp );

        }
    });

}

function ajax_getMetrics() {

    lib_ajaxCall({
        url: '/api/getMetrics.php',
        onSuccess: function( resp ) {

            localStorage.setItem( 'metrics', resp );

            clbk_populateMetrics( resp );

        }
    });

}




var searchForm = null;

document.querySelector( '.jokes p' ).textContent = localStorage.getItem( 'joke' );

init_metrics();

init_data();

init_jokes();

init_search();
