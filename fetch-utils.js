const SUPABASE_URL = 'https://fhvcsnhphrubxagoqfjv.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodmNzbmhwaHJ1YnhhZ29xZmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4MjE0NDAsImV4cCI6MTk4MDM5NzQ0MH0.bDfpQbFiN6-UOiCvI4_z6I12f8tx1p0nO3P_Nmr6Ubc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createPet(pet) {
    return await client.from('pets').insert(pet).single();
}

export async function displayPets(name) {
    let query = client.from('pets').select('*').limit(200);

    if (name) {
        query.ilike('name', `%${name}%`);
    }
    return await query;
}

// > Part B: Export async function that
//      - inserts (creates) a supplied pet argument into supabase
//      - returns a single data object (not an array)

// > Part C: Export async function that
//      - gets all pets from supabase
//      - order the list by created date

/* Storage Functions */

export async function uploadImage(bucketName, imagePath, imageFile) {
    // we can use the storage bucket to upload the image,
    // then use it to get the public URL
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        // in this case, we will _replace_ any
        // existing file with same name.
        upsert: true,
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }

    // Construct the URL to this image:
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    // URL Looks like:
    // https://nwxkvnsiwauieanvbiri.supabase.co/storage/v1/object/public/images/pets/984829079656/Franky.jpeg

    return url;
}
