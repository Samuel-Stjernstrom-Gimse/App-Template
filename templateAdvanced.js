/*-----| ADVANCED TEMPLATE FOR WAITING ON DS DATA AND ASYNC OPERATIONS |-----*/

const beforeGetData = async () => {
    try {
        /*
        synchronousFunction1()
        synchronousFunction2()
        ....
        */
        await Promise.all([/*asyncFunc1(), asyncFunc2()....*/]);
        await Promise.all([/*dependentFunc1(), dependentFunc2()....*/]);
    } catch (error) {
        console.error('Error in beforeGetData:', error);
    }
};

const afterGetData = async () => {
    try { 
        /*
        synchronousFunction3()
        synchronousFunction4()
        ....
        */
        await Promise.all([/*asyncFunc3(), asyncFunc4()....*/]);
        await Promise.all([/*dependentFunc3(), dependentFunc4()....*/]);
    } catch (error) {
        console.error('Error in afterGetData:', error);
    }
};

const notDependantOnGetData = async () => {
    try {
        /*
        synchronousFunction5()
        synchronousFunction6()
        ....
        */
        await Promise.all([/*asyncFunc5(), asyncFunc6()....*/]);
        await Promise.all([/*dependentFunc5(), dependentFunc6()....*/]);
    } catch (error) {
        console.error('Error in notDependantOnGetData:', error);
    }
};

const fetchGridData = async () => {
    try {
        // dsForGrid.refreshDataSource(); 
    } catch (error) {
        console.error('Fetch Grid Data error:', error);
    }
};

const getData = async  () => {
    const {forEach, length} = [/* list of data sources that have dependent functions in afterGetData */];
    let completed  = 0;

    const handleFetching = async  () => {
        completed++

        if (completed  >= length) {
            await afterGetData();
        }
    };

    if (length === 0) {
        await afterGetData()
    } else {
        forEach(ds => ds.refreshDataSource(handleFetching));
    }
};

const main = async () => {
    try {
        await beforeGetData();
        
        await Promise.all([getData(), fetchGridData(), notDependantOnGetData()])
    } catch (error) {
        console.error('Error in main:', error);
    }
};

main().catch(console.error);

console.log('error')

/*
Notes:
    - Use Promise.resolve() if a function inside Promise.all([]) does not return a promise
      but you want it to be treated as a resolved promise. This does not make it async it still blocks.

    - Make functions with async/await to handle asynchronous operations properly.

 */
