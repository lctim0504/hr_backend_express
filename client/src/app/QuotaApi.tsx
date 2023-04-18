import { quotaRequest } from './Request';

export const QuotaGetOne = (id: string) =>
    quotaRequest.get('/' + id)
        .then(res => { return (res.data); });