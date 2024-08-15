// ONLY USE THIS TEMPLATE WHEN YOU DO NOT NEED TO USE DS CONTENT OUTSIDE THE GRID

const fetchGridData = async () => {
    try {
        const {forEach} = [/* ds1, ds2, ds3*/]
        forEach(ds => ds.refreshDataSource())
    } catch (error) {
        console.error('Error fetching grid data:', error);
    }
};

const main = async () => {
    try {
        await fetchGridData();
        
        // Non-blocking funcs here (ideally)
        
        await Promise.all([/* asyncFunc1, asyncFunc2 */]); // parallel execution 
        await Promise.all([/* dAsyncFunc1, dAsyncFunc2 */]); // Add more blocks as needed
        
        // Synchronous/blocking funcs here (ideally)
        
    } catch (error) {
        console.error('Error in main function:', error);
    }
};

main().catch(console.error);


