import algoliasearch from 'algoliasearch';

const client = algoliasearch('EGZO4IJMQL', '883fd25a4271423ab63d5cb5d5096f72');
const index = client.initIndex('dev_USERS');


async function search(query) {
// only query string
await index.search(query)
.then(result => {
    console.log('a: ' + result.hits)
    console.log('b: ' + result)
    return Promise.resolve(result.hits)
})

}

export default search;