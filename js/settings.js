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

        window.location.href = '/settings/applications.php';

    }, 500);

}

function ls_addSearchEngine() {

    var data = JSON.parse( localStorage.getItem( 'data' ) );

    if ( typeof data.searchEngines === 'undefined' ) {

        data.searchEngines = [];

    }

    data.searchEngines.push({
        t:  document.querySelector( '.js_inputTitle input' ).value,
        l:  document.querySelector( '.js_inputLetter input' ).value,
        u:  document.querySelector( '.js_inputUrl input' ).value
    });

    ls_sync( 'data', JSON.stringify( data ) );

    document.querySelector( 'form button' ).textContent = 'Success';
    document.querySelector( 'form button' ).classList.add( 'success' );

    setTimeout( function(){

        window.location.href = '/settings/search.php';

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

        window.location.href = '/settings/applications.php';

    }, 500);

}

function ls_editSearchEngine() {

    var index = parseInt( sessionStorage.getItem( 'editSearchEngine' ) );

    var data = JSON.parse( localStorage.getItem( 'data' ) );

    data.searchEngines[ index ] = {
        t:  document.querySelector( '.js_inputTitle input' ).value,
        l:  document.querySelector( '.js_inputLetter input' ).value,
        u:  document.querySelector( '.js_inputUrl input' ).value,
    };

    ls_sync( 'data', JSON.stringify( data ) );

    document.querySelector( 'form button' ).textContent = 'Success';
    document.querySelector( 'form button' ).classList.add( 'success' );

    setTimeout( function(){

        window.location.href = '/settings/search.php';

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

    if (

        window.location.pathname === '/settings/applications.php' ||
        window.location.pathname === '/settings/applicationsAdd.php' ||
        window.location.pathname === '/settings/applicationsEdit.php'

    ) {

        document.querySelector( '.sidebar .item.applications' ).classList.add( 'active' );

    } else if (

        window.location.pathname === '/settings/search.php' ||
        window.location.pathname === '/settings/searchAdd.php' ||
        window.location.pathname === '/settings/searchEdit.php'

    ) {

        document.querySelector( '.sidebar .item.search' ).classList.add( 'active' );

    } else if (

        window.location.pathname === '/settings/jokes.php'

    ) {

        document.querySelector( '.sidebar .item.jokes' ).classList.add( 'active' );

    } else if (

        window.location.pathname === '/settings/metrics.php'

    ) {

        document.querySelector( '.sidebar .item.metrics' ).classList.add( 'active' );

    } else if (

        window.location.pathname === '/settings/bookmarks.php'

    ) {

        document.querySelector( '.sidebar .item.bookmarks' ).classList.add( 'active' );

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

function dom_searchButton( data, index ) {

    var parentElem = document.querySelector( '.searchEnginesList' );

    var block = lib_createElement({
        tag: 'DIV',
        classes: [ 'appSettings', 'icon', 'drag' ],
        draggable: true,
        dataAttrs: {
            url:        data.u,
            title:      data.t,
            letter:     data.l,
            index:      index
        },
        listeners: [
            {
                type: 'click',
                callback: evt_clickSearchEngine
            }
        ],
        parent: parentElem
    });

    lib_createElement({
        tag: 'SPAN',
        classes: [ 'letter' ],
        text: data.l,
        parent: block
    });

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
        text: data.u,
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
                callback: evt_clickDeleteSearchEngine
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

function dom_editSearchEngine() {

    var index = parseInt( sessionStorage.getItem( 'editSearchEngine' ) );

    var data = JSON.parse( localStorage.getItem( 'data' ) );

    var engine = data.searchEngines[ index ];

    document.querySelector( '.js_inputTitle input' ).value      = engine.t;
    document.querySelector( '.js_inputUrl input' ).value        = engine.u;
    document.querySelector( '.js_inputLetter input' ).value     = engine.l;

}

function evt_clickApplication( evt ) {

    if ( evt.target.classList.contains( 'trash' ) ) {

        return false;

    }

    sessionStorage.setItem( 'editApplication', evt.currentTarget.getAttribute( 'data-index' ) );

    window.location.href = '/settings/applicationsEdit.php';

}

function evt_clickSearchEngine( evt ) {

    if ( evt.target.classList.contains( 'trash' ) ) {

        return false;

    }

    sessionStorage.setItem( 'editSearchEngine', evt.currentTarget.getAttribute( 'data-index' ) );

    window.location.href = '/settings/searchEdit.php';

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

function evt_dropSearchEngine( evt ) {

    var searchEnginesData = [];

    document.querySelectorAll( '.searchEnginesList .appSettings' ).forEach( function( elem ){

        var engineData = {
            t: elem.getAttribute( 'data-title' ),
            l: elem.getAttribute( 'data-letter' ),
            u: elem.getAttribute( 'data-url' )
        };

        searchEnginesData.push( engineData );

    });

    var stored = JSON.parse( localStorage.getItem( 'data' ) );

    stored.searchEngines = searchEnginesData;

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

function evt_submitFormNewSearchEngine( evt ) {

    evt.preventDefault();

    if ( dom_validateApplicationForm() === false ) {

        return false;

    }

    evt.currentTarget.querySelector( 'button' ).textContent = 'Adding...';

    ls_addSearchEngine();

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

function evt_submitFormEditSearchEngine( evt ) {

    evt.preventDefault();

    if ( dom_validateApplicationForm() === false ) {

        return false;

    }

    document.querySelector( '.formEditSearchEngine button' ).textContent = 'Updating...';

    ls_editSearchEngine();

}

function evt_clickDeleteApplication( evt ) {

    var stored = JSON.parse( localStorage.getItem( 'data' ) );

    var index = evt.currentTarget.getAttribute( 'data-index' );

    stored.applications.splice( index, 1 );

    ls_sync( 'data', JSON.stringify( stored ) );

    clbk_populateApplications();

}

function evt_clickDeleteSearchEngine( evt ) {

    var stored = JSON.parse( localStorage.getItem( 'data' ) );

    var index = evt.currentTarget.getAttribute( 'data-index' );

    stored.searchEngines.splice( index, 1 );

    ls_sync( 'data', JSON.stringify( stored ) );

    clbk_populateSearchEngines();

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

function clbk_populateSearchEngines() {

    while( document.querySelector( '.searchEnginesList' ).firstChild ) {

        document.querySelector( '.searchEnginesList' ).firstChild.remove();

    }

    var resp        = localStorage.getItem( 'data' );
    var data        = JSON.parse( resp );
    var engines     = data.searchEngines;
    var enginesNum  = engines.length;

    if ( enginesNum === 0 ) {

        lib_createElement({
            tag: 'P',
            classes: [ 'empty' ],
            text: 'Nothing here yet...',
            parent: document.querySelector( '.searchEnginesList' )
        });

        return false;

    }

    for ( var i = 0 ; i < enginesNum ; i++ ) {

        dom_searchButton( engines[ i ], i );

    }

    Sortable.create( divSearchEnginesList, {
        animation: 150,
        onEnd: function( evt ) {
            evt_dropSearchEngine();
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

    } else if ( document.querySelector( '.formAddNewSearchEngine' ) ) {

        document.querySelector( '.formAddNewSearchEngine' ).addEventListener( 'submit', evt_submitFormNewSearchEngine );

    } else if ( document.querySelector( '.searchEnginesList' ) ) {

        localStorage.setItem( 'data', resp );

        clbk_populateSearchEngines();

    } else if ( document.querySelector( '.formEditSearchEngine' ) ) {

        dom_editSearchEngine();

        document.querySelector( '.formEditSearchEngine' ).addEventListener( 'submit', evt_submitFormEditSearchEngine );

    }

});
