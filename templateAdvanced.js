/*//////////////| ADVANCED TEMPLATE FOR WAITING ON DS DATA AND ASYNC OPERATIONS |/////////////////*/

/*-------------------------==>  GLOBAL VARIABLES ONLY HERE  <==-----------------------------------------*/
/*
const globalCounter = 0
let globalBool = false
*/

/*-------------------------==>  FUNCTIONS HERE OR SEPERATE FILE  <==-------------------------------------*/

/*
const mockUpFunc = async (url) => {
	try {
		const result = await fetch(url, { method: 'GET', headers: headers })
		listArray = await result.json()
	} catch (error) {
		console.log(error)
	}
}

const mockUp = (a,b) => a + b

      CALL FUNCTIONS INN INIT ==>
*/


/*------------------------ ==>  INIT FUNCTIONS  <== -----------------------------------------------------*/

const beforeGetData = async () => {
    try {
        // Non-blocking funcs here (ideally)

        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // parallel execution
        await Promise.all([/* dAsyncFunc1, dAsyncFunc2 */]); // Add more blocks as needed

        // Synchronous/blocking funcs here (ideally)
    } catch (error) {
        console.error('Error in beforeGetData:', error);
    }
};

const afterGetData = async () => {
    try { 
        // Non-blocking funcs here (ideally)

        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // parallel execution
        await Promise.all([/* dAsyncFunc1, dAsyncFunc2 */]); // Add more blocks as needed

        // Synchronous/blocking funcs here (ideally)
    } catch (error) {
        console.error('Error in afterGetData:', error);
    }
};

const notDependantOnGetData = async () => {
    try {
        // Non-blocking funcs here (ideally)

        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // parallel execution
        await Promise.all([/* dAsyncFunc1, dAsyncFunc2 */]); // Add more blocks as needed

        // Synchronous/blocking funcs here (ideally)
    } catch (error) {
        console.error('Error in notDependantOnGetData:', error);
    }
};

const fetchGridData = async () => {
    try {
        const {forEach} = [/* ds1, ds2, ds3*/]
        forEach(ds => ds.refreshDataSource())
    } catch (error) {
        console.error('Error fetching grid data:', error);
    }
};

const getData =  () => {
    const  { forEach, length } = [/* list of data sources that have dependent functions in afterGetData */];
    let completed  = 0;

    const handleFetching =  () => {
        completed++

        if (completed  >= length) {
            afterGetData().catch(console.error)
        }
    };

    if (length === 0) {
        afterGetData().catch(console.error)
    } else {
        forEach(ds => ds.refreshDataSource(handleFetching)); // non Blocking
    }
};

const main = async () => {
    try {
        await beforeGetData();
        
        getData()

        await Promise.all([fetchGridData(), notDependantOnGetData()])
    } catch (error) {
        console.error('Error in main:', error);
    }
};


/*-------------------------==>  ONLY MAIN() UNDER  <==-----------------------------------------------------*/

main().catch(console.error);

/*
Notes:
    - Use Promise.resolve() if a function inside Promise.all([]) does not return a promise
      but you want it to be treated as a resolved promise. This does not make it async it still blocks.

    - Make functions with async/await to handle asynchronous operations properly.

 */
