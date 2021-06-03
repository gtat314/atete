<!DOCTYPE html>
<html lang="el-gr">
    <head>
        <title>Search - Atete</title>
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
                <h1>Search</h1>
                <p>Tweak the settings for searching in the main page</p>
            </div>

            <hr>

            <div class="searchEnginesList" id="divSearchEnginesList"></div>

            <hr>

            <div class="buttons">
                <a href="/settings/searchAdd.php">Add New</a>
            </div>

        </div>

        <script type="text/javascript" src="/js/library.js"></script>
        <script type="text/javascript" src="/js/display.js"></script>
        <script type="text/javascript" src="/js/sortable.js"></script>
        <script type="text/javascript" src="/js/settings.js"></script>

    </body>
</html>
