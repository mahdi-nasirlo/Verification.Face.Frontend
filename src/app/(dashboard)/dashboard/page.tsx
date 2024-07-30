import ClientPage from "./components/ClientPage";

export default async function Page() {

  const data = await getData()

  return (
    <>
      <ClientPage data={data} />
    </>
  );
}

const getData = async () => {


  return {
    countPerson: 12,
    countCompany: 15,
    countProject: 15,
    countProjectDoc: 15
  }
}