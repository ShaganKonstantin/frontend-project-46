import fs from 'fs';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';

import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('genDiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');

  const fn = genDiff(file1Path, file2Path);
  const expected = readFixtureFile('expected_file.txt');

  expect(fn).toEqual(expected);
});
