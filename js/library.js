function lib_ajaxCall( data ) {

    var url         = data.url;
    var async       = true;
    var method      = 'GET';
    var fd          = null;
    var xhr         = null;
    var onSuccess   = data.onSuccess;
    var onFailure   = null;

    if ( data.hasOwnProperty( 'async' ) === true ) {

        async = data.async;

    }

    if ( data.hasOwnProperty( 'onFailure' ) === true ) {

        onFailure = data.onFailure;

    }

    if ( data.hasOwnProperty( 'post' ) === true ) {

        method = 'POST';

        fd = new FormData();

        for ( var postField in data.post ) {

            fd.append( postField, data.post[ postField ] );

        }

    }

    if ( data.hasOwnProperty( 'formData' ) === true ) {

        method  = 'POST';
        fd      = data.formData;

    }

    xhr = new XMLHttpRequest();
    xhr.open( method, url, async );

    xhr.onreadystatechange = function() {

        if ( this.readyState == 4 ) {

            if ( this.status === 200 ) {

                onSuccess( this.response );

            } else {

                onFailure( this.response );

            }

        }

    };

    xhr.send( fd );

}

function lib_createElement( data ) {

    var elem = document.createElement( data.tag );

    if ( data.hasOwnProperty( 'classes' ) === true && data.classes.length > 0 ) {

        var classesNum = data.classes.length;

        for ( var i = 0 ; i < classesNum ; i++ ) {

            elem.classList.add( data.classes[ i ] );

        }

    }

    if ( data.hasOwnProperty( 'dataAttrs' ) === true ) {

        for ( var dataName in data.dataAttrs ) {

            elem.setAttribute( 'data-' + dataName, data.dataAttrs[ dataName ] );

        }

    }

    if ( data.hasOwnProperty( 'style' ) === true ) {

        for ( var styleName in data.style ) {

            elem.style[ styleName ] = data.style[ styleName ];

        }

    }

    if ( data.hasOwnProperty( 'text' ) === true ) {

        elem.textContent = data.text;

    }

    if ( data.hasOwnProperty( 'html' ) === true ) {

        elem.innerHTML = data.html;

    }

    if ( data.hasOwnProperty( 'href' ) === true ) {

        elem.setAttribute( 'href', data.href );

    }

    if ( data.hasOwnProperty( 'draggable' ) === true ) {

        elem.setAttribute( 'draggable', data.draggable );

    }

    if ( data.hasOwnProperty( 'target' ) === true ) {

        elem.setAttribute( 'target', data.target );

    }

    if ( data.hasOwnProperty( 'title' ) === true ) {

        elem.setAttribute( 'title', data.title );

    }

    if ( data.hasOwnProperty( 'value' ) === true ) {

        elem.setAttribute( 'value', data.value );

    }

    if ( data.hasOwnProperty( 'src' ) === true ) {

        elem.src = data.src;

    }

    if ( data.hasOwnProperty( 'insertBefore' ) === true ) {

        data.parent.insertBefore( elem, data.insertBefore );

    } else {

        data.parent.appendChild( elem );

    }

    if ( data.hasOwnProperty( 'listeners' ) === true && data.listeners.length > 0 ) {

        var listenersNum = data.listeners.length;

        for ( var e = 0 ; e < listenersNum ; e++ ) {

            var useCapture = false;

            if ( data.listeners[ e ].hasOwnProperty( 'useCapture' ) === true ) {

                useCapture = data.listeners[ e ].useCapture;

            }

            elem.addEventListener( data.listeners[ e ].type, data.listeners[ e ].callback, useCapture );

        }

    }

    return elem;

}
