# Testnet
[Etherscan](https://rinkeby.etherscan.io/address/0x7cb309BCC3f3D1C66C6f6136D85f4C33032Df2F9#code)

Contract address: `0x7cb309BCC3f3D1C66C6f6136D85f4C33032Df2F9`



# Firebase

Replace the environment variables from `.env`

### bucket temporary rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

### database temporary rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

# Firebase router

You need to make sure the rewrites are enabled in your Firebase hosting configuration to redirect all requests to your index.html file. This assumes you are using create-react-app:

```
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {"source": "/service-worker.js", "headers": [{"key": "Cache-Control", "value": "no-cache"}]}
    ]
  }
}
```