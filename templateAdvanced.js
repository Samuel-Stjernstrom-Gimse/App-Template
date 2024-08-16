/*//////////////| ADVANCED TEMPLATE FOR WAITING ON DS DATA AND ASYNC OPERATIONS |/////////////////*/

/*<~G~>--------------------------| GLOBAL VARIABLES ONLY HERE |------------------------------<~G~>*/

/*<~F~>--------------------------| FUNCTIONS HERE OR SEPARATE FILE |-------------------------<~F~>*/

/*<~In~>-------------------------| INIT FUNCTIONS |----------------------------------------<~In~>*/

const executeBeforeDataFetch = async () => {
    try {
        // Non-blocking functions here (ideally)

        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // Parallel execution
        await Promise.all([/* dependentAsyncFunc1, dependentAsyncFunc2 */]); // Add more blocks as needed

        // Synchronous/blocking functions here (ideally)
    } catch (error) {
        console.error('Error in executeBeforeDataFetch:', error);
    }
};

const executeAfterDataFetch1 = async () => { // Create one of these for every fetchDataInParallel() call
    try {
        // Non-blocking functions here (ideally)

        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // Parallel execution
        await Promise.all([/* dependentAsyncFunc1, dependentAsyncFunc2 */]); // Add more blocks as needed

        // Synchronous/blocking functions here (ideally)
    } catch (error) {
        console.error('Error in executeAfterDataFetch1:', error);
    }
};

const runIndependentTasks = async () => { // feks single ds callbak initiliser here
    try {
        // Non-blocking functions here (ideally)

        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // Parallel execution
        await Promise.all([/* dependentAsyncFunc1, dependentAsyncFunc2 */]); // Add more blocks as needed

        // Synchronous/blocking functions here (ideally)
    } catch (error) {
        console.error('Error in runIndependentTasks:', error);
    }
};

const refreshGridData = async () => {
    try {
        const {forEach} = [/* ds1, ds2, ds3 */];
        forEach(ds => ds?.refreshDataSource());
    } catch (error) {
        console.error('Error refreshing grid data:', error);
    }
};

const fetchDataInParallel = (dataSources, callback) => {
    let completedCount = 0;

    const onFetchComplete = () => {
        completedCount++;

        if (completedCount >= dataSources.length) {
            callback().catch(console.error);
        }
    };

    if (dataSources.length === 0) {
        callback().catch(console.error);
    } else {
        dataSources.forEach(ds => ds?.refreshDataSource(onFetchComplete)); // Non-blocking
    }
};

const main = async () => {
    const dataSourcesGroup1 = [/* ds1, ds2, ds3 */];

    try {
        await executeBeforeDataFetch();

        fetchDataInParallel(dataSourcesGroup1, executeAfterDataFetch1);
        /* fetchDataInParallel(dataSourcesGroup2, executeAfterDataFetch2) */

        await Promise.all([refreshGridData(), runIndependentTasks()]);
    } catch (error) {
        console.error('Error in main:', error);
    }
};

/*<~M~>----------------------| ONLY MAIN() |----------------------------------------<~M~>*/

main().catch(console.error);

/*
Notes:
    - Use Promise.resolve() if a function inside Promise.all([]) does not return a promise
      but you want it to be treated as a resolved promise. This does not make it async; it still blocks.

    - Create functions with async/await to handle asynchronous operations properly.
    - fetchDataInParallel loads data sources in parallel and then runs the corresponding after-fetch functions.
 */
