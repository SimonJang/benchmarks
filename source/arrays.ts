import * as Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

const data: {id: number}[] = []

let counter = 0
while (true) {
	data.push({id: counter});
	counter++

	if (counter === 5) {
		break;
	}
}

const forLoop = () => {
	let innerSum = 0;
	for (const item of data) {
		innerSum += item.id;
	}
};

const forEach = () => {
	let innerSum = 0;
	data.forEach(item => innerSum += item.id);
};

suite
	.add('for loop', () => {
		forLoop()
	})
	.add('for each', () => {
		forEach()
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.run()
