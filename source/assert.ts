import * as Benchmark from 'benchmark';
import * as assert from 'assert';

const suite = new Benchmark.Suite();

const data: {id: number}[] = []

let counter = 0
while (true) {
	data.push({id: counter});
	counter++

	if (counter === 100) {
		break;
	}
}

const withAssert = () => {
	let innerSum = 0;
	for (const item of data) {
		assert(item.id >= 0)
		innerSum += item.id;
	}
};

const noAssert = () => {
	let innerSum = 0;
	for (const item of data) {

		innerSum += item.id;
	}
};

suite
	.add('for loop', () => {
		withAssert()
	})
	.add('for each', () => {
		noAssert()
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.run()
