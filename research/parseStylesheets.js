#!/usr/bin/env node

const fs = require('fs-extra');
const { join } = require('path');

const propertyValueRegex = / {2}([a-zA-Z-][0-9a-zA-Z-]*): ([^;]*);/i;

const startTime = Date.now();

fs.readFile(join(__dirname, 'allStyles.css'))
  .then(buffer => {
    let pointer = 0;
    let nextNewline = 0;

    const propertyMap = Object.create(null);

    do {
      if (nextNewline) {
        const line = buffer.toString('utf8', pointer, nextNewline);

        const match = line.match(propertyValueRegex);
        if (match && (match[1][0] !== '-')) {
          if (!propertyMap[match[1]]) propertyMap[match[1]] = { '{length}': 0 };
          propertyMap[match[1]]['{length}'] += 1;

          let value = match[2];
          const importantIndex = value.indexOf(' !important');
          if (~importantIndex) value = value.substring(0, importantIndex);
          propertyMap[match[1]][value] = ~~propertyMap[match[1]][value] + 1;
        }

        pointer = nextNewline + 1;
      }

      nextNewline = buffer.indexOf('\n', pointer);
    } while (nextNewline !== -1);

    const propertyValueMap = Object.keys(propertyMap)
      .sort((ka, kb) => (propertyMap[kb]['{length}'] - propertyMap[ka]['{length}']))
      .map(property => ([
        property,
        Object.keys(propertyMap[property])
          .sort((ka, kb) => (propertyMap[property][kb] - propertyMap[property][ka]))
          .filter(k => {
            const uniquePropertyValuePair = propertyMap[property][k] < 2;
            if (uniquePropertyValuePair) return false;

            const isPrefixed = !(k.indexOf('-webkit-') && k.indexOf('-moz-') && k.indexOf('-ms-'));
            if (isPrefixed) return false;

            return true;
          })
          .map(k => [k, propertyMap[property][k]])
      ]));

    fs.writeFileSync(
      join(__dirname, 'propertyValueMap.json'),
      JSON.stringify(propertyValueMap, null, 2)
    );
  })
  .then(() => {
    const endTime = Date.now();
    console.log(`Finished parsing in ${(endTime - startTime) / 1000} seconds`);
  });
