function ls_sync( key, data ) {

    localStorage.setItem( key, data );

    ajax_postData();

}

function ls_addApplication( avatarName ) {

    var data = JSON.parse( localStorage.getItem( 'data' ) );

    if ( avatarName === null ) {

        avatarName = 'application.svg';

    }

    var subtitle = document.querySelector( '.js_inputSubtitle input' ).value;

    if ( subtitle === '' ) {

        subtitle = null;

    }

    data.applications.push({
        t:  document.querySelector( '.js_inputTitle input' ).value,
        s:  subtitle,
        u:  document.querySelector( '.js_inputUrl input' ).value,
        v:  avatarName
    });

    ls_sync( 'data', JSON.stringify( data ) );

    document.querySelector( '.formAddNewApplication button' ).textContent = 'Success';
    document.querySelector( '.formAddNewApplication button' ).classList.add( 'success' );

    setTimeout( function(){

        window.location.href = '/settings/applications.html';

    }, 500);

}

function ls_editApplication( avatarName ) {

    var index = parseInt( sessionStorage.getItem( 'editApplication' ) );

    var data = JSON.parse( localStorage.getItem( 'data' ) );

    if ( avatarName === null ) {

        if ( document.querySelector( '.js_inputAvatar img' ) ) {

            avatarName = document.querySelector( '.js_inputAvatar img' ).getAttribute( 'data-filename' );

        } else {

            avatarName = 'application.svg';

        }

    }

    var subtitle = document.querySelector( '.js_inputSubtitle input' ).value;

    if ( subtitle === '' ) {

        subtitle = null;

    }

    data.applications[ index ] = {
        t:  document.querySelector( '.js_inputTitle input' ).value,
        s:  subtitle,
        u:  document.querySelector( '.js_inputUrl input' ).value,
        v:  avatarName
    };

    ls_sync( 'data', JSON.stringify( data ) );

    document.querySelector( '.formEditApplication button' ).textContent = 'Success';
    document.querySelector( '.formEditApplication button' ).classList.add( 'success' );

    setTimeout( function(){

        window.location.href = '/settings/applications.html';

    }, 500);

}

function dom_validateApplicationForm() {

    var errors = 0;

    if ( document.querySelector( '.js_inputTitle input' ).value === '' ) {

        document.querySelector( '.js_inputTitle samp' ).textContent = 'Required Field';
        document.querySelector( '.js_inputTitle' ).classList.add( 'error' );

        errors++;

    }

    if ( document.querySelector( '.js_inputUrl input' ).value === '' ) {

        document.querySelector( '.js_inputUrl samp' ).textContent = 'Required Field';
        document.querySelector( '.js_inputUrl' ).classList.add( 'error' );

        errors++;

    }

    if ( errors > 0 ) {

        return false;

    }

    try {

        new URL( document.querySelector( '.js_inputUrl input' ).value );

    } catch ( e ) {

        if ( e instanceof TypeError ) {

            document.querySelector( '.js_inputUrl samp' ).textContent = 'Not a valid Url';
            document.querySelector( '.js_inputUrl' ).classList.add( 'error' );

            errors++;

        }

    }

    if ( errors > 0 ) {

        return false;

    }

    return true;

}

function dom_menu() {

    var sidebar = lib_createElement({
        tag: 'DIV',
        classes: [ 'sidebar' ],
        parent: document.body,
        insertBefore: document.querySelector( '.content' )
    });

    var logo = lib_createElement({
        tag: 'DIV',
        classes: [ 'logo' ],
        parent: sidebar
    });

    lib_createElement({
        tag: 'H1',
        text: 'Atete',
        parent: logo
    });

    lib_createElement({
        tag: 'SPAN',
        text: '0.0.0.0.0.1 pre-alpha',
        parent: logo
    });

    lib_createElement({
        tag: 'HR',
        parent: sidebar
    });

    var itemSearch = lib_createElement({
        tag: 'A',
        classes: [ 'item' ],
        href: '/settings/search.html',
        parent: sidebar
    });

    var bodySearch = lib_createElement({
        tag: 'DIV',
        classes: [ 'body' ],
        parent: itemSearch
    });

    var titleSearch = lib_createElement({
        tag: 'DIV',
        classes: [ 'title' ],
        parent: bodySearch
    });

    lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon', 'search' ],
        parent: titleSearch
    });

    lib_createElement({
        tag: 'H2',
        text: 'Search',
        parent: titleSearch
    });

    lib_createElement({
        tag: 'P',
        text: 'Add or remove search engines',
        parent: bodySearch
    });

    lib_createElement({
        tag: 'HR',
        parent: sidebar
    });

    var itemJokes = lib_createElement({
        tag: 'A',
        classes: [ 'item' ],
        href: '/settings/jokes.html',
        parent: sidebar
    });

    var bodyJokes = lib_createElement({
        tag: 'DIV',
        classes: [ 'body' ],
        parent: itemJokes
    });

    var titleJokes = lib_createElement({
        tag: 'DIV',
        classes: [ 'title' ],
        parent: bodyJokes
    });

    lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon', 'laugh' ],
        parent: titleJokes
    });

    lib_createElement({
        tag: 'H2',
        text: 'Jokes',
        parent: titleJokes
    });

    lib_createElement({
        tag: 'P',
        text: 'Show or hide jokes and change the api settings',
        parent: bodyJokes
    });

    lib_createElement({
        tag: 'HR',
        parent: sidebar
    });

    var itemMetrics = lib_createElement({
        tag: 'A',
        classes: [ 'item' ],
        href: '/settings/metrics.html',
        parent: sidebar
    });

    var bodyMetrics = lib_createElement({
        tag: 'DIV',
        classes: [ 'body' ],
        parent: itemMetrics
    });

    var titleMetrics = lib_createElement({
        tag: 'DIV',
        classes: [ 'title' ],
        parent: bodyMetrics
    });

    lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon', 'metrics' ],
        parent: titleMetrics
    });

    lib_createElement({
        tag: 'H2',
        text: 'Metrics',
        parent: titleMetrics
    });

    lib_createElement({
        tag: 'P',
        text: 'Show cpu load, memory consumption and system temperature',
        parent: bodyMetrics
    });

    lib_createElement({
        tag: 'HR',
        parent: sidebar
    });

    var itemApplications = lib_createElement({
        tag: 'A',
        classes: [ 'item' ],
        href: '/settings/applications.html',
        parent: sidebar
    });

    var bodyApplications = lib_createElement({
        tag: 'DIV',
        classes: [ 'body' ],
        parent: itemApplications
    });

    var titleApplications = lib_createElement({
        tag: 'DIV',
        classes: [ 'title' ],
        parent: bodyApplications
    });

    lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon', 'applications' ],
        parent: titleApplications
    });

    lib_createElement({
        tag: 'H2',
        text: 'Applications',
        parent: titleApplications
    });

    lib_createElement({
        tag: 'P',
        text: 'Add or remove web apps which will be periodically monitored',
        parent: bodyApplications
    });

    lib_createElement({
        tag: 'HR',
        parent: sidebar
    });

    var itemBookmarks = lib_createElement({
        tag: 'A',
        classes: [ 'item' ],
        href: '/settings/bookmarks.html',
        parent: sidebar
    });

    var bodyBookmarks = lib_createElement({
        tag: 'DIV',
        classes: [ 'body' ],
        parent: itemBookmarks
    });

    var titleBookmarks = lib_createElement({
        tag: 'DIV',
        classes: [ 'title' ],
        parent: bodyBookmarks
    });

    lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon', 'bookmarks' ],
        parent: titleBookmarks
    });

    lib_createElement({
        tag: 'H2',
        text: 'Bookmarks',
        parent: titleBookmarks
    });

    lib_createElement({
        tag: 'P',
        text: 'Add shortcuts to frequently visited websites',
        parent: bodyBookmarks
    });

    lib_createElement({
        tag: 'HR',
        parent: sidebar
    });

    var back = lib_createElement({
        tag: 'A',
        classes: [ 'back' ],
        href: '/',
        parent: sidebar
    });

    var backBody = lib_createElement({
        tag: 'DIV',
        classes: [ 'body' ],
        parent: back
    });

    lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon', 'leftArrow' ],
        parent: backBody
    });

    lib_createElement({
        tag: 'P',
        text: 'home',
        parent: backBody
    });

    if (
        window.location.pathname === '/settings/applications.html' ||
        window.location.pathname === '/settings/applicationsAdd.html' ||
        window.location.pathname === '/settings/applicationsEdit.html'
    ) {

        itemApplications.classList.add( 'active' );

    }

}

function dom_appButton( data, index ) {

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

    var parentElem = document.querySelector( '.applicationsList' );

    var block = lib_createElement({
        tag: 'DIV',
        classes: [ 'appSettings', 'icon', 'drag' ],
        draggable: true,
        dataAttrs: {
            url:        data.u,
            title:      data.t,
            subtitle:   data.s,
            image:      data.v,
            index:      index
        },
        listeners: [
            {
                type: 'click',
                callback: evt_clickApplication
            }
        ],
        parent: parentElem
    });

    var icon = lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon' ],
        parent: block
    });

    icon.style.backgroundImage = 'url("/data/media/' + data.v + '")';

    var info = lib_createElement({
        tag: 'DIV',
        classes: [ 'info' ],
        parent: block
    });

    lib_createElement({
        tag: 'H3',
        text: data.t,
        parent: info
    });

    var notes = lib_createElement({
        tag: 'H4',
        parent: info
    });

    lib_createElement({
        tag: 'P',
        text: subtitle,
        parent: notes
    });

    lib_createElement({
        tag: 'SPAN',
        classes: [ 'icon', 'trash' ],
        title: 'Delete this application',
        dataAttrs: {
            index: index
        },
        listeners: [
            {
                type: 'click',
                callback: evt_clickDeleteApplication
            }
        ],
        parent: block
    });

}

function dom_editApplication() {

    var index = parseInt( sessionStorage.getItem( 'editApplication' ) );

    var data = JSON.parse( localStorage.getItem( 'data' ) );

    var app = data.applications[ index ];

    document.querySelector( '.js_inputTitle input' ).value      = app.t;
    document.querySelector( '.js_inputUrl input' ).value        = app.u;
    document.querySelector( '.js_inputSubtitle input' ).value   = app.s;

    document.querySelector( '.js_inputAvatar input' ).style.zIndex = -1;
    document.querySelector( '.js_inputAvatar .icon.preview' ).classList.remove( 'upload' );

    var img = lib_createElement({
        tag: 'IMG',
        src: '/data/media/' + app.v,
        dataAttrs: {
            filename: app.v
        },
        parent: document.querySelector( '.js_inputAvatar .icon.preview' )
    });

}

function evt_clickApplication( evt ) {

    if ( evt.target.classList.contains( 'trash' ) ) {

        return false;

    }

    sessionStorage.setItem( 'editApplication', evt.currentTarget.getAttribute( 'data-index' ) );

    window.location.href = '/settings/applicationsEdit.html';

}

function evt_dropApplication( evt ) {

    var applicationsData = [];

    document.querySelectorAll( '.applicationsList .appSettings' ).forEach( function( elem ){

        var appData = {
            t: elem.getAttribute( 'data-title' ),
            s: elem.getAttribute( 'data-subtitle' ),
            u: elem.getAttribute( 'data-url' ),
            v: elem.getAttribute( 'data-image' )
        };

        applicationsData.push( appData );

    });

    var stored = JSON.parse( localStorage.getItem( 'data' ) );

    stored.applications = applicationsData;

    ls_sync( 'data', JSON.stringify( stored ) );

}

function evt_submitFormNewApplication( evt ) {

    evt.preventDefault();

    if ( dom_validateApplicationForm() === false ) {

        return false;

    }

    document.querySelector( '.formAddNewApplication button' ).textContent = 'Adding...';

    if ( document.querySelector( '.js_inputAvatar input' ).files.length > 0 ) {

        ajax_postFile( document.querySelector( '.js_inputAvatar input' ).files[ 0 ], function( resp ) {

            var response = JSON.parse( resp );

            ls_addApplication( response.filename );

        });

    } else {

        ls_addApplication( null );

    }

}

function evt_submitFormEditApplication( evt ) {

    evt.preventDefault();

    if ( dom_validateApplicationForm() === false ) {

        return false;

    }

    document.querySelector( '.formEditApplication button' ).textContent = 'Updating...';

    if ( document.querySelector( '.js_inputAvatar input' ).files.length > 0 ) {

        ajax_postFile( document.querySelector( '.js_inputAvatar input' ).files[ 0 ], function( resp ) {

            var response = JSON.parse( resp );

            ls_editApplication( response.filename );

        });

    } else {

        ls_editApplication( null );

    }

}

function evt_clickDeleteApplication( evt ) {

    var stored = JSON.parse( localStorage.getItem( 'data' ) );

    var index = evt.currentTarget.getAttribute( 'data-index' );

    stored.applications.splice( index, 1 );

    ls_sync( 'data', JSON.stringify( stored ) );

    clbk_populateApplications();

}

function ajax_postFile( file, callback ) {

    lib_ajaxCall({
        url: '/api/postFile.php',
        post: {
            file: file
        },
        onSuccess: callback
    });

}

function ajax_postData() {

    lib_ajaxCall({
        url: '/api/postData.php',
        post: {
            data: localStorage.getItem( 'data' )
        },
        onSuccess: function( resp ){}
    });

}

function ajax_getData( callback ) {

    lib_ajaxCall({
        url: '/api/getData.php',
        method: 'GET',
        onSuccess: callback
    });

}

function clbk_populateApplications() {

    while( document.querySelector( '.applicationsList' ).firstChild ) {

        document.querySelector( '.applicationsList' ).firstChild.remove();

    }

    var resp        = localStorage.getItem( 'data' );
    var data        = JSON.parse( resp );
    var apps        = data.applications;
    var appsNum     = apps.length;

    if ( appsNum === 0 ) {

        lib_createElement({
            tag: 'P',
            classes: [ 'empty' ],
            text: 'Nothing here yet...',
            parent: document.querySelector( '.applicationsList' )
        });

        return false;

    }

    for ( var i = 0 ; i < appsNum ; i++ ) {

        dom_appButton( apps[ i ], i );

    }

    Sortable.create( divApplicationsList, {
        animation: 150,
        onEnd: function( evt ) {
            evt_dropApplication();
        }
    });

}




dom_menu();

ajax_getData( function( resp ){

    if ( document.querySelector( '.applicationsList' ) ) {

        localStorage.setItem( 'data', resp );

        clbk_populateApplications();

    } else if ( document.querySelector( '.formEditApplication' ) ) {

        dom_editApplication();

        document.querySelector( '.formEditApplication' ).addEventListener( 'submit', evt_submitFormEditApplication );

    } else if ( document.querySelector( '.formAddNewApplication' ) ) {

        document.querySelector( '.formAddNewApplication' ).addEventListener( 'submit', evt_submitFormNewApplication );

    }

});
