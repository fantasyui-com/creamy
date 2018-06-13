#!/usr/bin/env node

const chickpea = require('chickpea');
const program = require('./index.js');

const configuration = {
  generate_flag: 'Perform a generation of a new letter. (Requires --file)',
  merge_flag: 'Perform a merge with existing letter. (Requires --file and --into)',
  into: 'Id of class to target',

  file: 'Location of PNG file to use in operations',
};

const options = chickpea(configuration);

program(options);
