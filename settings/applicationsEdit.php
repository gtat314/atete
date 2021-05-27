<!DOCTYPE html>
<html lang="el-gr">
    <head>
        <title>Edit Application - Atete</title>
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
                <h1>Edit Application</h1>
                <p>Edit the appearance or information about a specific application</p>
            </div>

            <hr>

            <form class="formEditApplication">

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
                    <input type="text" name="url">
                </div>
                <span class="icon delete"></span>
            </div>

            <div class="inputText js_inputSubtitle">
                <div class="body">
                    <div class="title">
                        <span>Subtitle (optional)</span>
                    </div>
                    <input type="text" name="subtitle">
                </div>
                <span class="icon delete"></span>
            </div>

            <div class="inputFile js_inputAvatar">
                <input type="file" name="avatar">
                <div class="body">
                    <span class="icon upload preview"></span>
                    <div class="title">
                        <p>Image (optional)</p>
                        <span>Click to upload an image</span>
                    </div>
                    <span class="icon delete"></span>
                </div>
            </div>

            <hr>

            <div class="buttons">
                <a class="cancel" href="/settings/applications.php">Cancel</a>
                <button>Update</button>
            </div>

            <form>

        </div>

        <script type="text/javascript" src="/js/library.js"></script>
        <script type="text/javascript" src="/js/display.js"></script>
        <script type="text/javascript" src="/js/settings.js"></script>

    </body>
</html>
