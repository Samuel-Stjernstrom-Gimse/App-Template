/*//////////////|NORMAL TEMPLATE FOR WAITING ON DS DATA AND ASYNC OPERATIONS |/////////////////*/
/*<~R~>--------------------------| REFRESH DATA SOURCE |-------------------------------------<~R~>*/

/*<~G~>--------------------------| GLOBAL VARIABLES HERE |------------------------------<~G~>*/

/*<~F~>--------------------------| FUNCTIONS HERE OR SEPARATE FILE |-------------------------<~F~>*/

/*<~In~>-------------------------| INIT FUNCTIONS |-----------------------------------------<~In~>*/

const executeBeforeDataFetch = async () => {
    try {
        // Non-blocking functions here (ideally)

        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // Parallel execution delete if not used

        // Synchronous/blocking functions here (ideally)
    } catch (error) {
        console.error('Error in executeBeforeDataFetch:', error);
    }
};

const executeAfterDataFetch = async () => { // Create one of these for every fetchDataInParallel() call
    try {
        // Non-blocking functions here (ideally)

        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // Parallel execution delete if not used

        // Synchronous/blocking functions here (ideally)
    } catch (error) {
        console.error('Error in executeAfterDataFetch1:', error);
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
    const dataSourcesGroup = [/* ds1, ds2, ds3 */]; // all dependant ds here

    try {
        await executeBeforeDataFetch();

        fetchDataInParallel(dataSourcesGroup1, executeAfterDataFetch);
        
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
