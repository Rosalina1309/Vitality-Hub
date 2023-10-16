
export async function addBMIToProfile(height: string, weight: string, bmi: number | null, token: string): Promise<any> {
  const query = {
    query: `
      mutation ($input: CreateRecordMutationInput!) {
        createRecord(input: $input) {
          user {
            id
          }
        }
      }
    `,
    variables: {
      input: {
        fieldName: "measurements",
        height: parseFloat(height),
        weight: parseFloat(weight),
        bmi: bmi ? parseFloat(bmi.toFixed(2)) : null,
        measurementUnit: "metric"
      }
    }
  };

  try {
    const response = await fetch("http://localhost:3001/graphql", {
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
