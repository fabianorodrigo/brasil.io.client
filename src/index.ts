import {get} from './services';

const datasetSlug = 'covid19';
const tableName = 'caso_full';
const filters = {state: 'PR', is_last: 'True'};
const url = `https://api.brasil.io/v1/dataset/covid19/caso/data?state=AL&is_last=True`;

(async () => {
    const resultado = await get(url);
    console.log(resultado);
})();
