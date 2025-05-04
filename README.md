# Build-Your-Own Server (Node.js, SQLite, SSL, DDNS)

This project started with a simple question I asked myself:

> *"What if I built a server from scratch, using only tools I fully control—no plug-and-play, externally managed services?"*

The result is this **skeleton of a server**, built with the following goals:
- Host it directly on my local machine.
- Make it publicly accessible under a human-readable domain.
- Equip it with basic but desirable features (SSL, persistence layer).

## Why?

One might ask: is the extra effort of doing it all yourself actually worth it?

Short answer: probably not.  
There are plenty of cheap, reliable hosting solutions that don’t expose your local network to security risks.

Nevertheless, here are the perks of this path and what it offered me:
- **Control** – You’re not bound to the limitations or pricing models of external platforms. And depending on your setup, it can be completely free.
- **Portability** – You can run this anywhere: your laptop, a Raspberry Pi, or even remote bare-metal hardware.
- **Customization** – Beyond the stack I used, many of the steps I’ll describe apply across languages and frameworks. You decide what’s in and what’s not.
- **Learning** – The code itself is simple. The challenge—and the reward—was figuring everything else out to make it work: router configuration, dynamic DNS, and generating production-grade SSL certificates. The real value was not in the end product, it was in the process.

## Features

This server is intentionally small and currently does the following:
- Exposes, as a working example, a single GET endpoint that replies with 'Hello'.
- Logs every request to the database, storing the caller’s IP and timestamp. This was added to validate the persistence layer.
- Redirects all HTTP traffic to HTTPS.

It's meant to be the **foundation** for a real-world server: a place to build from.

## Tools

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [SQLite](https://sqlite.org) with [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [Certbot](https://certbot.eff.org)
- [Router Administration](https://portforward.com)
- [Visual Studio Code](https://code.visualstudio.com)

## Getting Started

This section walks you through setting it up on your own machine. Even if you're planning to adapt it to a different stack, many of the core steps remain relevant.

In this version, all you need is a working installation of Node.js.

> Built and tested using VS Code. This editor helps with launch and debug, and exposes project scripts under the *NPM Scripts* menu of the *Explorer* panel. If the menu is not present, you can enable it through the panel's three dots.

### 1. Install the project

Install dependencies by running `npm install`. Alternatively you can use the script `npm run build`, also available inside VS Code’s *NPM Scripts*.

### 2. Set up the database

Create the initial [SQLite](https://sqlite.org) database schema by running `npm run setupDb`, or through VS Code’s *NPM Scripts*.

### 3. Port forwarding

To make your local server accessible from the internet, on your router you’ll need to forward the external ports 80 (HTTP) and 443 (HTTPS) to your server’s internal IP and ports—here kept as 80 and 443, for consistency.  
[Here’s how to do that.](https://portforward.com)

### 4. Domain name and DDNS

If you want to access the server via a readable address rather than a numeric IP, you'll need:
- A registered [domain name](https://en.wikipedia.org/wiki/Domain_name) to point your public IP to.
- Probably a [DDNS](https://en.wikipedia.org/wiki/Dynamic_DNS) service, since internet providers usually change your IP periodically.

Many routers support built-in DDNS configurations (e.g., No-IP, DynDNS, DuckDNS).

### 5. SSL setup

To enable HTTPS, you’ll need an SSL certificate and its private key:
- Place your certificate chain in `ssl/cert.pem`.
- Place your private key in `ssl/key.pem`.

You can easily purchase these from a certificate authority. Though I find it more intersting (and free) to generate them yourself via [Certbot](https://certbot.eff.org).

### 6. Launch the server

Run `node .` from the project root in the terminal or use the *Run and Debug* panel inside VS Code for one-click execution.

## Notes

- Defaults to SQLite for its portability and local performance.
- Includes a basic ESLint setup: clean, maintainable code is non-negotiable.
- The project isn’t production-ready, but it is functional and modular—easy to extend.
- The real challenge lies in what surrounds the code: configuration, networking, and security.

## License

Licensed under the [MIT License](./LICENSE).
