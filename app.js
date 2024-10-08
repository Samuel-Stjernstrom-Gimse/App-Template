const getData = dataSource =>
    new Promise((resolve, reject) =>
        dataSource.refreshDataSource(err => err
            ? reject(err)
            : resolve(!err)
        )
    )

const app = async () => {
    try {
        /*
        setWhere()
        await Promise.all([
            getData(ds1),
            getData(ds2), // parallel loading 
        ])
        
        useData()
        
        await getData(ds3) // blocking loadig
        */
    } catch (error) {
        console.error('Error refreshing data sources:', error)
    }
};

(async () => await app())()







