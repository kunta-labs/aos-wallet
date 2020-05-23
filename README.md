# AOS Wallet
An experimental wallet for the AfricaOS protocol

*Tested on node v13.8.0*


| Status Type | Status |
| --- | --- |
| `Master Build` | [![Build Status](https://travis-ci.org/kunta-labs/aos-wallet.svg?branch=master)](https://travis-ci.org/kunta-labs/aos-wallet) |
| `Development Build` | [![Build Status](https://travis-ci.org/kunta-labs/aos-wallet.svg?branch=main_dev_branch)](https://travis-ci.org/kunta-labs/aos-wallet) |
| `Issues` | [![Issues](https://img.shields.io/github/issues/kunta-labs/aos-wallet.svg)](https://github.com/kunta-labs/aos-wallet/issues) |
| `Closed Issues` | [![GitHub issues-closed](https://img.shields.io/github/issues-closed/kunta-labs/aos-wallet.svg)](https://GitHub.com/kunta-labs/aos-wallet/issues?q=is%3Aissue+is%3Aclosed) |
| `Last Commit` | [![Last commit](https://img.shields.io/github/last-commit/kunta-labs/aos-wallet.svg)](https://github.com/kunta-labs/aos-wallet/commits/master) |
| `UI Docker Stars` | [![Docker Stars](https://img.shields.io/docker/stars/kunta-labs/aos-wallet-ui.svg)](https://hub.docker.com/r/kunta-labs/aos-wallet-ui) |
| `UI Docker Pulls` | [![Docker Pulls](https://img.shields.io/docker/pulls/kunta-labs/aos-wallet-ui.svg)](https://hub.docker.com/r/kunta-labs/aos-wallet-ui) |
| `UI Docker Automated` | [![Docker Automated](https://img.shields.io/docker/cloud/automated/kunta-labs/aos-wallet-ui.svg)](https://hub.docker.com/r/kunta-labs/aos-wallet-ui) |
| `UI Docker Build` | [![Docker Build](https://img.shields.io/docker/cloud/build/kunta-labs/aos-wallet-ui.svg)](https://hub.docker.com/r/kunta-labs/aos-wallet-ui) |
| `Server Docker Stars` | [![Docker Stars](https://img.shields.io/docker/stars/kunta-labs/aos-wallet-server.svg)](https://hub.docker.com/r/kunta-labs/aos-wallet-server) |
| `Server Docker Pulls` | [![Docker Pulls](https://img.shields.io/docker/pulls/kunta-labs/aos-wallet-server.svg)](https://hub.docker.com/r/kunta-labs/aos-wallet-server) |
| `Server Docker Automated` | [![Docker Automated](https://img.shields.io/docker/cloud/automated/kunta-labs/aos-wallet-server.svg)](https://hub.docker.com/r/kunta-labs/aos-wallet-server) |
| `Server Docker Build` | [![Docker Build](https://img.shields.io/docker/cloud/build/kunta-labs/aos-wallet-server.svg)](https://hub.docker.com/r/kunta-labs/aos-wallet-server) |
| `License` | [![License](https://img.shields.io/badge/license-GPL-blue.svg)](https://github.com/kunta-labs/aos-wallet/blob/master/LICENSE) |
| `Releases` | [![Downloads](https://img.shields.io/github/downloads/kunta-labs/aos-wallet/total.svg)](https://github.com/kunta-labs/aos-wallet/releases) |
| `Latest Release` | [![Downloads](https://img.shields.io/github/downloads/kunta-labs/aos-wallet/total.svg)](https://github.com/kunta-labs/aos-wallet/releases) |
| `Top Language` | [![Top language](https://img.shields.io/github/languages/top/kunta-labs/aos-wallet.svg)](https://github.com/kunta-labs/aos-wallet) |
| `Code Size` | [![Code size in bytes](https://img.shields.io/github/languages/code-size/kunta-labs/aos-wallet.svg)](https://github.com/kunta-labs/aos-wallet) |
| `Chat` | ![Discord](https://img.shields.io/discord/683561405928177737) |

# Generating keys
See AOS https://github.com/kunta-labs/AfricaOS


# start react development server
```bash
make launch # or 'make' (launch is the default target)
```

# Build static react interface
```bash
make rb
```

# Start electron with react dev server
```bash
make electron
```

# Start electron with the statically built interface
```bash
make electron_static
```

# Build electron
```bash
make re
```

# package electron into standalone desktop application
Build the desktop wallet from source (or download http://aos.kunta.io/)
```bash
make package
```

# remove node_modules, npm install, rebuild, and electron-rebuild
```bash
make build_restart
```
