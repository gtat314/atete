<!DOCTYPE html>
<html lang="el-gr">
    <head>
        <title>Add Search Engine - Atete</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/icons.css">
        <link rel="stylesheet" href="/css/global.css">
        <link rel="stylesheet" href="/css/settings.css">
    </head>
    <body>

        <?php require $_SERVER[ 'DOCUMENT_ROOT' ] . '/inc/menu.inc.php'; ?>

        <div class="content">

            <div class="pageTitle">
                <h1>Add New Search Engine</h1>
                <p>Add a new search engine for the main page</p>
            </div>

            <hr>

            <form class="formAddNewSearchEngine">

            <div class="inputText js_inputTitle">
                <div class="body">
                    <div class="title">
                        <span>Title</span>
                        <samp></samp>
                    </div>
                    <input type="text" name="title" autofocus>
                </div>
                <span class="icon delete"></span>
            </div>

            <div class="inputText js_inputUrl">
                <div class="body">
                    <div class="title">
                        <span>Url</span>
                        <samp></samp>
                    </div>
                    <input type="text" name="url" placeholder="eg: https://www.google.com/search?q=%query%">
                </div>
                <span class="icon delete"></span>
            </div>

            <div class="inputText js_inputLetter">
                <div class="body">
                    <div class="title">
                        <span>Letter (shortcut)</span>
                    </div>
                    <input type="text" name="subtitle">
                </div>
                <span class="icon delete"></span>
            </div>

            <hr>

            <div class="buttons">
                <a class="cancel" href="/settings/search.php">Cancel</a>
                <button>Add</button>
            </div>

            <form>

        </div>

        <script type="text/javascript" src="/js/library.js"></script>
        <script type="text/javascript" src="/js/display.js"></script>
        <script type="text/javascript" src="/js/settings.js"></script>

    </body>
</html>
