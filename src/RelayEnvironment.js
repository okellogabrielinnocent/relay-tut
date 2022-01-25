import { Environment,Network,RecordResource,Store } from "relay-runtime";
import fetchGraphQl from './fetchGraphQL';
// higher function
async function fetchRelay(params,variables){
    console.log(`fetchRelay: ${params.name} with ${JSON.stringify(variables)}`);

    return fetchGraphQl(params.text,variables);
}

export default new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource())
})