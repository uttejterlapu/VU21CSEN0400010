const https = require('https');

const apiBaseUrl = 'https://20.244.56.144/test';

const getAuthToken = () => {
    return new Promise((resolve, reject) => {
        const authData = JSON.stringify({
            companyName: "GITAM",
            clientID: "84d40db0-9362-483d-92de-b18b533590c3",
            clientSecret: "SFouwdFoJQSSfOps",
            ownerName: "UTTEJ TERLAPU",
            ownerEmail: "uterlapu@gitam.in",
            rollNo: "VU21CSEN0400010"
        });

        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': authData.length
            },
            rejectUnauthorized: false
        };

        const authReq = https.request(`${apiBaseUrl}/auth`, authOptions, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    if (parsedData && parsedData.access_token) {
                        resolve(parsedData.access_token);
                    } else {
                        reject(new Error('Failed to obtain token'));
                    }
                } catch (err) {
                    reject(new Error('Error parsing JSON response: ' + err.message));
                }
            });
        });

        authReq.on('error', (err) => {
            reject(new Error('Error making POST request: ' + err.message));
        });

        authReq.write(authData);
        authReq.end();
    });
};

module.exports = { getAuthToken };
