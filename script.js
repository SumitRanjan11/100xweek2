// Clean Promise Function
function fetchWithPromise(endpoint) {
    return new Promise((resolve, reject) => {
        if (endpoint === '/fetch-data') {
            resolve({ message: 'This is some data' });
        } else {
            reject(new Error('Invalid endpoint'));
        }
    });
}

// Read Function  
function readFileWithPromise() {
    return new Promise((resolve, reject) => {
        const content = localStorage.getItem('file.text');
        if (content !== null) {
            resolve(content);
        } else {
            reject(new Error('File not found'));
        }
    });
}

// Write Function  
function writeFileWithPromise(filePath, content) {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem(filePath, content);
            resolve('File written successfully ');
        } catch (error) {
            reject(new Error('Failed to write file'));
        }
    });
}

// Delay Function
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms, `Waited ${ms} milliseconds`));
}

document.getElementById('delayBtn').addEventListener('click', async () => {
    document.getElementById('delayOutput').innerText = 'Processing delay...';
    try {
        const message = await delay(3000); 
        document.getElementById('delayOutput').innerText = `Delay finished: ${message}`;
    } catch (error) {
        document.getElementById('delayOutput').innerText = `Failed: ${error.message}`;
    }
});

document.getElementById('fetchBtn').addEventListener('click', () => {
    document.getElementById('fetchOutput').innerText = 'Loading data...';
    fetchWithPromise('/fetch-data')
        .then(data => {
            document.getElementById('fetchOutput').innerText = `Data received: ${JSON.stringify(data, null, 2)}`;
        })
        .catch(error => {
            document.getElementById('fetchOutput').innerText = `Failed: ${error.message}`;
        });
});

document.getElementById('readFileBtn').addEventListener('click', () => {
    document.getElementById('readFileOutput').innerText = 'Retrieving file content...';
    readFileWithPromise()
        .then(content => {
            document.getElementById('readFileOutput').innerText = `File content: ${content}`;
        })
        .catch(error => {
            document.getElementById('readFileOutput').innerText = `Failed: ${error.message}`;
        });
});

document.getElementById('writeFileBtn').addEventListener('click', () => {
    const filePath = 'file.text';   
    const content = 'you are being watch dude!';   
    document.getElementById('writeFileOutput').innerText = 'Writing file...';
    writeFileWithPromise(filePath, content)
        .then(message => {
            document.getElementById('writeFileOutput').innerText = `File written: ${message}`;
        })
        .catch(error => {
            document.getElementById('writeFileOutput').innerText = `Failed: ${error.message}`;
        });
});


 
localStorage.setItem('file.text', 'Test Content');
console.log(localStorage.getItem('file.text')); // Should log 'Test Content'
