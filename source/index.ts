import * as Benchmark from 'benchmark';
import * as path from 'path';

/** Find the common parent directory between all paths. */
export const findSharedParent = (paths: string[]) => {
	if (paths.length === 1) return path.dirname(paths[0]);

	const [shortest, secondShortest] =
		paths.length > 2 ? paths.sort((a, b) => a.length - b.length) : paths;

	const secondShortestParts = secondShortest.split(path.sep);

	return shortest
		.split(path.sep)
		.filter((part, idx) => part === secondShortestParts[idx])
		.join(path.sep)
};

export const findSharedParent2 = (paths: string[]) => {
	if (paths.length === 1) return path.dirname(paths[0]);

	const parentPaths: string[] = [];
	const parts: string[][] = paths.map(x => x.split('/'));
	const firstParts = parts[0];

	firstParts.forEach((part, idx) => {
		const allPartsMatch = parts.every(p => p[idx] === part);

		if (allPartsMatch) {
			parentPaths.push(part);
		}
	});

	return parentPaths.join('/');
};

const suite = new Benchmark.Suite();

suite
	.add('old findSharedParent -- 2 file paths', () => {
		findSharedParent2([
			'foo/bar',
			'foo/bar/bar',
		])
	})
	.add('new findSharedParent -- 2 file paths', () => {
		findSharedParent([
			'foo/bar',
			'foo/bar/bar',
		])
	})
	.add('old findSharedParent -- 3 file paths', () => {
		findSharedParent2([
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		])
	})
	.add('new findSharedParent -- 3 file paths', () => {
		findSharedParent([
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		])
	})
	.add('old findSharedParent -- 4 file paths', () => {
		findSharedParent2([
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		])
	})
	.add('new findSharedParent -- 4 file paths', () => {
		findSharedParent([
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		])
	})
	.add('old findSharedParent -- 5 file paths', () => {
		findSharedParent2([
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		])
	})
	.add('new findSharedParent -- 5 file paths', () => {
		findSharedParent([
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		])
	})
	.add('old findSharedParent -- 10 file paths', () => {
		findSharedParent2([
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		])
	})
	.add('new findSharedParent -- 10 file paths', () => {
		findSharedParent([
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		])
	})
	.add('old findSharedParent -- 50 file paths', () => {
		const filesNames = [
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		];

		findSharedParent2(filesNames);
	})
	.add('new findSharedParent -- 50 file paths', () => {
		const filesNames = [
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar',
			'foo/bar/bar',
			'foo/bar/bar',
		];
		findSharedParent(filesNames);
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.run();
