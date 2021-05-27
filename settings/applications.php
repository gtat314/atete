<!DOCTYPE html>
<html lang="el-gr">
    <head>
        <title>Applications - Atete</title>
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
                <h1>Applications</h1>
                <p>Applications are different than plain bookmarks, since they are monitored in specific time intervals for their uptime.</p>
            </div>

            <hr>

            <div class="applicationsList" id="divApplicationsList"></div>

            <hr>

            <div class="buttons">
                <a href="/settings/applicationsAdd.php">Add New</a>
            </div>

        </div>

        <script type="text/javascript" src="/js/library.js"></script>
        <script type="text/javascript" src="/js/display.js"></script>
        <script type="text/javascript" src="/js/sortable.js"></script>
        <script type="text/javascript" src="/js/settings.js"></script>

    </body>
</html>
