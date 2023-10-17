
export async function addWHRToProfile(waist: string, hip: string, whr: number | null, token: string): Promise<any> {
  const query = {
    query: `
    mutation CreateRecord($input: CreateRecordMutationInput!) { createRecord(input: $input) { record { ... on WhrMeasurement { id waist hips whr createdAt } } } }
    `,
    variables: {
      input: {
        recordType: "WhrMeasurement",
        waist: parseFloat(waist),
        hips: parseFloat(hip),
        whr: whr ? parseFloat(whr.toFixed(2)) : null,
      }
    }
  };

  const rootUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    const response = await fetch(`${rootUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(query)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
