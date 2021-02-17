export const editorHtml = `
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
    <style>
      [contenteditable] {
        outline: 0px solid transparent;
      }

      #editor {
        box-sizing: border-box;
        font-size: 18px;
        width: 100%;
        height: 100%;
        padding: 10px 14px;
      }
    </style>
  </head>
  <body>
    <div id="focusStealer" />
    <div id="editor" contenteditable="true"></div>
    <script>
      const editor = document.querySelector('#editor')

      editor.addEventListener('focus', function () {
        window.ReactNativeWebView.postMessage('edit-start')
      })

      editor.addEventListener('blur', function () {
        window.ReactNativeWebView.postMessage('edit-stop')
      })
    </script>
  </body>
</html>
`
