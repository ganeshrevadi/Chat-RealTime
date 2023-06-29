import { Client , Databases} from 'appwrite';


export const PROJECT_ID = '649d0f312c398f943178';
export const DATABASE_ID = '649d0f9287ab5e00fa3d'
export const COLLECTION_ID = '649d0f9b6f7b5247128f';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('649d0f312c398f943178');

export const databases = new Databases(client);

export default client;