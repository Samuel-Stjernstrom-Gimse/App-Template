/*//////////////| NORMAL TEMPLATE FOR WAITING ON DS DATA AND ASYNC OPERATIONS |/////////////////*/

/*<~G~>--------------------------| GLOBAL VARIABLES |----------------------------------------<~G~>*/
/*<~F~>--------------------------| FUNCTIONS HERE OR SEPARATE FILE |-------------------------<~F~>*/
/*<~S~>-------------------------| SETUP |--------------------------------------------------<~S~>*/

const beforeFetchSetup = {
    beforeAsync: [
        // func1,
        // func2
    ],
    asyncPromises: [
        // [async1, async2],
        // [async3, async4]
    ],
    afterAsync: [
        // func1,
        // func2,
    ]
};

const dependantSetup = [
    {
        data: [
            // dataSource,
            // dataSource,
            // dataSource
        ],
        functions: {
            beforeAsync: [
                // func1,
                // func2
            ],
            asyncPromises: [
                // [async1, async2],
                // [async3, async4]
            ],
            afterAsync: [
                // func1,
                // func2,
            ]
        }
    }
];

const independantSetup = [
    {
        //ds: dataSource,
        //func: func1
    },
    {
        //ds: dataSource,
        //func: func2
    }
];

/*<~I~>-------------------------| INITIALIZATION |------------------------------------------<~I~>*/
const parallelExc = (arr) => {
    arr.forEach((ex) => {
        fetchDataInParallel(ex.data, executeFunctions, ex.functions)
    })
};

const handleFunctionCalling = (functions, key) => {
    functions.key?.forEach(func => {
        try {
            func?.();
        } catch (funcError) {
            console.error('Error in beforeAsync function:', funcError);
        }
    });
};

const independantRefresh = (arr) => {
    arr.forEach((obj) => {
        try {
            obj.ds?.refreshDataSource(() => {
                try {
                    obj.func?.();
                } catch (funcError) {
                    console.error('Error in obj.func:', funcError);
                }
            });
        } catch (error) {
            console.error('Error in independantRefresh:', error);
        }
    });
};

const executeFunctions = async (functions) => {
    try {
        handleFunctionCalling(functions, beforeAsync);

        if (functions.asyncPromises) {
            for (const asyncGroup of functions.asyncPromises) {
                await Promise.all(asyncGroup.map(asyncFunc => Promise.resolve(asyncFunc())));
            }
        }
        
        handleFunctionCalling(functions, afterAsync);
    } catch (error) {
        console.error('Error in executeAfterDataFetch:', error);
    }
};

const fetchDataInParallel = (dataSources, callback, callbackArgs) => {
    let completedCount = 0;

    const onFetchComplete = () => {
        completedCount++;

        if (completedCount >= dataSources.length) {
            callback(callbackArgs).catch(console.error);
        }
    };

    if (dataSources.length === 0) {
        callback(callbackArgs).catch(console.error);
    } else {
        try{
            dataSources.forEach(ds => ds?.refreshDataSource(onFetchComplete));
        } catch(error) {
            console.log('error in callback', error)
        }
    }
};

const main = async () => {
    try {
        await executeFunctions(beforeFetchSetup);
        parallelExc(dependantSetup)
        independantRefresh(independantSetup)
    } catch (error) {
        console.error('Error in main:', error);
    }
};

main().catch(console.error);

/*<~XXX~>----------------------| NO CODE BELLOW HERE |---------------------------------------------------<~XXX~>*/

/*
Notes on Code Template

Key Sections

1. Global Variables (<~G~>)
   - global constants or shared data.

2. Functions (<~F~>)
   - Define functions used across the script. These can be included here or in a separate file.

3. Setup (<~S~>)
   - beforeFetchSetup: Preparation before fetching data.
     - beforeAsync: Functions to run before async operations.
     - asyncPromises: Groups of promises to await in parallel.
     - afterAsync: Functions to run after async operations.
    - dependantSetup: Configuration for dependent data sources.
     - data: Array of data sources to fetch.
     - functions: Functions for pre-fetch setup, async operations, and post-fetch actions. same as beforeFetch
     - independantSetup: Configuration for independent data sources.
     - ds: Data source to refresh.
     - func: Function to execute after refreshing the data source.

4. Initialization (<~I~>)
   - parallelExc: Handles fetching and function execution for dependent data sources.
   - independantRefresh: Refreshes independent data sources and executes associated functions.
   - executeFunctions: Runs a sequence of functions:
     - beforeAsync functions.
     - Promises in asyncPromises.
     - afterAsync functions.
   - fetchDataInParallel: Manages parallel data fetching:
     - Uses onFetchComplete to track refresh completion.
     - Invokes the callback when all data sources are refreshed.
   - main: Orchestrates the process:
     - Executes beforeFetchSetup.
     - Calls parallelExc and independantRefresh.

5. Error Handling
   - Each function logs errors to the console to ensure issues are captured and reported.

Usage
- Before Fetch Setup: Use beforeFetchSetup for preparatory functions and async operations.
- Dependent and Independent Data Sources: Use dependantSetup and independantSetup to manage data source operations and functions.
- Parallel Execution: Use parallelExc for parallel data fetching.
- Refresh and Execute: Use independantRefresh for refreshing independent data sources.

This template provides a structured approach to handling asynchronous data fetching and function execution.
*/
