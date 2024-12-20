
let editor, code;

// Fetching Data...
(async function settingsLinks() {
    try {
        const URL = `https://custom-ide-default-rtdb.firebaseio.com/depedencies.json`;
        const response = await fetch(URL);
        const data = await response.json();
        if (!data) {
            throw new Error('No data found');
        }
        const script = document.createElement('script');
        script.setAttribute("src", data.scripts);
        document.head.appendChild(script);
        script.onload = () => recievedData(data.code);
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = data.stylesheets;
        document.head.appendChild(link);
    } catch (error) {
        console.error(error);
    }
})();

// Recieveing Data...
function recievedData(code) {

    const configuration = {
        lineNumbers: true,
        mode: "javascript",
        theme: "dark"
    };

    editor = eval(code);
}

// Run Code...
function runCode() {
    const code = editor.getValue();
    if(code === '') {
        document.getElementById('output').innerText = 'Please write some code to execute!';
        return;
    }
    try {
        let res = eval(code);
        document.getElementById('output').innerText = 'Code executed successfully!\n' + res;
    } catch (error) {
        document.getElementById('output').innerText = `Error: ${error.message}`;
    }
}