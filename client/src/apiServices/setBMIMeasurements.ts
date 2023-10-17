
export async function addBMIToProfile(height: string, weight: string, bmi: number | null, token: string): Promise<any> {
  const query = {
    query: `
    mutation CreateRecord($input: CreateRecordMutationInput!) { createRecord(input: $input) { record { ... on BmiMeasurement { id height weight bmi createdAt } } } }
    `,
    variables: {
      input: {
        recordType : "BmiMeasurement",
        height: parseFloat(height),
        weight: parseFloat(weight),
        bmi : bmi ? parseFloat(bmi.toFixed(2)) : null
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
