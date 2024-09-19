import fs from 'fs';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';

import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff for json', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');

  const input = genDiff(file1Path, file2Path);
  const expected = readFixtureFile('expected_file.txt');

  expect(input).toEqual(expected);
});

test('genDiff for yml', () => {
  const file1Path = getFixturePath('file1.yml');
  const file2Path = getFixturePath('file2.yml');

  const input = genDiff(file1Path, file2Path);
  const expected = readFixtureFile('expected_file.txt');

  expect(input).toEqual(expected);
});

test('genDiff for yaml', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yaml');

  const input = genDiff(file1Path, file2Path);
  const expected = readFixtureFile('expected_file.txt');

  expect(input).toEqual(expected);
});
