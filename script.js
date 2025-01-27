
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
        theme: "dracula",
        placeholder: true
    };

    editor = eval(code);
}

// Run Code...
function runCode() {
    const code = editor.getValue();
    if (code === '') {
        document.getElementById('output').innerText = 'Please write some code to execute!';
        return;
    }
    try {
        let res = eval(code);
        document.getElementById('output').innerText = 'Code executed successfully!\n\n' + res;
    } catch (error) {
        document.getElementById('output').innerText = `Error: ${error.message}`;
    }
}

function clearCode() {
    document.getElementById('output').innerText = '';
}

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

const menuBtn = document.getElementById('menuButton');
const menuDisplay = document.getElementById('menuDisplay');
const h2 = document.querySelector('#menuDisplay>div>h2');
const animatedLink = document.querySelectorAll('.animatedLink');

menuBtn.addEventListener('click', () => {
    if (menuDisplay.style.height == '100%') {
        hideScroller();
        menuDisplay.style.height = '0';
        h2.style.transform = 'translate(0, 100px)';
        animatedLink.forEach((link, i) => link.classList.remove('falling' + i));
    } else {
        menuDisplay.style.height = '100%';
        h2.style.transform = 'translate(0, 0)';

        if (window.innerWidth > 768) {
            document.body.classList.toggle('no-scroll');
            document.body.style.paddingRight = '17px';
        }

        animatedLink.forEach((link, i) => link.classList.add('falling' + i));
    }
});

function hideScroller() {
    if (window.innerWidth > 768) {
        setTimeout(() => {
            document.body.style.paddingRight = '0';
            document.body.classList.toggle('no-scroll');
        }, 900);
    }
}