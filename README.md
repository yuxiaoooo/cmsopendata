# CMS Open Data

This project is for the designing and tuning of the CMS Open Data page.

## Framework of the Directory

```perl
proxy/
├── node_modules/             # Installed dependencies (auto-generated by npm install)
├── public/                   # Folder for frontend files
│   ├── index.html            # HTML file with the search bar
│   └── script.js             # JavaScript file for handling frontend logic
├── server.js                 # Node.js server file (proxy setup)
├── package.json              # npm configuration file
└── package-lock.json         # npm lock file (auto-generated)
```

## How to Run

To run this webpage, on LXPLUS, do:

```bash
voms-proxy-init -voms cms
cd landing-page
node server.js
```

Suppose you're now on lxplus909. On your local machine, run:
```bash
ssh -L 8080:localhost:8080 yuxiao@lxplus909.cern.ch
```

You can ensure the port is open by:
```bash
netstat -tuln | grep 8080
```

If everything is correct, open http://localhost:8080 on your local browser, then the page should be presented!

## Contributing

Pull requests are welcomed! Please contact me by yuxiao.wang@cern.ch 
or my mattermost yuxiao.wang
or my skype live:wangyuxiao0214
