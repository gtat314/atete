function evt_clickDeleteInputText( evt ) {

    evt.currentTarget.parentElement.querySelector( 'input' ).value = '';

}

function evt_inputFile( evt ) {

    evt.currentTarget.style.zIndex = -1;

    var preview = evt.currentTarget.parentElement.querySelector( '.icon.preview' );

    preview.classList.remove( 'upload' );

    var reader = new FileReader();

    reader.onload = function(){

        var img = lib_createElement({
            tag: 'IMG',
            src: reader.result,
            parent: preview
        });

    };

    reader.readAsDataURL( event.currentTarget.files[ 0 ] );

}

function evt_clickDeleteInputFile( evt ) {

    var block = evt.currentTarget.parentElement.parentElement;

    block.querySelector( 'img' ).remove();

    block.querySelector( '.icon.preview' ).classList.add( 'upload' );

    block.querySelector( 'input' ).style.zIndex = 5;

}

function evt_inputTextReset( evt ) {

    evt.currentTarget.parentElement.parentElement.classList.remove( 'error' );

}




document.querySelectorAll( '.inputText .icon.delete' ).forEach( function( elem ){

    elem.addEventListener( 'click', evt_clickDeleteInputText );

});

document.querySelectorAll( '.inputFile .icon.delete' ).forEach( function( elem ){

    elem.addEventListener( 'click', evt_clickDeleteInputFile );

});

document.querySelectorAll( '.inputFile input' ).forEach( function( elem ){

    elem.addEventListener( 'input', evt_inputFile );

});

document.querySelectorAll( '.inputText input' ).forEach( function( elem ){

    elem.addEventListener( 'input', evt_inputTextReset );

});
