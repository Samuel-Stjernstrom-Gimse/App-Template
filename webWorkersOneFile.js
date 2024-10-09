const renderChart = data =>  console.log(data)

const largeArray = []

const workerCode = `
  self.onmessage = function(e) {
    const data = e.data;

    // Step 1: Filter the data (for example, only even values)
    let filteredData = data.filter(item => item.value % 2 === 0);

    // Step 2: Map to transform data (for example, square the value)
    let mappedData1 = filteredData.map(item => ({ ...item, value: item.value * item.value }));

    // Step 3: Further process the data (for example, increase by 10%)
    let mappedData2 = mappedData1.map(item => ({ ...item, value: item.value * 1.1 }));

    // Step 4: Filter the data again (for example, only values greater than 500,000)
    let finalData = mappedData2.filter(item => item.value > 500000);

    // Send the final processed data back to the main thread
    self.postMessage(finalData);
  };
`;

const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
const workerURL = URL.createObjectURL(workerBlob);
const myWorker = new Worker(workerURL);

myWorker.postMessage(largeArray);

myWorker.onmessage = function(e) {
  const processedData = e.data;
  renderChart(processedData);
};

myWorker.onerror = function(e) {
  console.error('Worker error:', e.message);
};
