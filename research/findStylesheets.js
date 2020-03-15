#!/usr/bin/env node

/*
This file will attempt to fetch as many stylesheets from the top 500
most visited websites in the world, normalise them and save them in
allStyles.css - where they can then be assessed for patterns
*/

const fs = require("fs-extra");
const fetch = require("node-fetch");
const { join } = require("path");
const AbortController = require("abort-controller");

const { storeCss, storeCssFromHtml } = require("./store");

let started = 0;
let failed = 0;

const TIMEOUT_MS = 500;

const fetchHeaders = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "en-US,en;q=0.9",
  "cache-control": "no-cache",
  cookie:
    "sb=FUkZXBysKypLZAJXq18r37Rv; datr=FUkZXJWy-hpKtIq-cDlQUzNE; fr=0PHRjoIIdJrwmCEKf..BcFEkn.Tm.Fw5.0.0.BcOSDo.",
  pragma: "no-cache",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
};

const startTime = Date.now();

fs.readFile(join(__dirname, "websites.txt"))
  .then(buffer => {
    const urls = `${buffer}`.split("\n").filter(u => u);

    return Promise.all(
      urls.map((shortUrl, i) => {
        const url = `https://${shortUrl}`;

        const controller = new AbortController();
        let timeout;

        return new Promise((resolve, reject) => {
          setTimeout(resolve, 20 * i);
        })
          .then(() => {
            timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
            return fetch(url, {
              headers: fetchHeaders,
              signal: controller.signal
            });
          })
          .then(res => {
            console.log(`Received url "${shortUrl}"`);
            started += 1;
            return res.text();
          })
          .then(html => {
            console.log(`Successful @ "${shortUrl}"`);
            return storeCssFromHtml(html, url);
          })
          .catch(e => {
            if (e.name === "AbortError") {
              console.log(`Timed out on "${shortUrl}"`);
            }
            failed += 1;
            console.log(`Fail getting "${shortUrl}"`);
          })
          .then(() => {
            clearTimeout(timeout);
          });
      })
    );
  })
  .then(() => fs.readFile(join(__dirname, "stylesheetUrls.txt")))
  .then(buffer => {
    console.log(`[${started - failed}/${started}]`);

    const cssUrls = `${buffer}`.split("\n").filter(u => u);
    const uniqueCssUrls = [...new Set(cssUrls)];

    return Promise.all(
      uniqueCssUrls.map((cssUrl, i) => {
        const controller = new AbortController();
        let timeout;

        return new Promise((resolve, reject) => {
          setTimeout(resolve, 20 * i);
        })
          .then(() => {
            timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
            return fetch(cssUrl, {
              headers: fetchHeaders,
              signal: controller.signal
            });
          })
          .then(res => res.text())
          .then(css => {
            console.log(`got css from: "${cssUrl}"`);
            storeCss(css);
          })
          .catch(() => {})
          .then(() => {
            clearTimeout(timeout);
          });
      })
    );
  })
  .then(() => {
    const endTime = Date.now();
    console.log(
      `Finished scraping in ${(endTime - startTime) / 60000} minutes`
    );
  });
