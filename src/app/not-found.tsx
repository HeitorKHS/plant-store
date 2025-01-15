import Layout from "./components/template/Layout";

export default function notFound(){

  return(

    <Layout>
      <div className="text-black text-center space-y-10 mt-20">
        <h1 className="text-7xl font-bold">&quot;404 - Page Not Found&quot;</h1>
        <p className="text-2xl font-semibold">It might have been removed or the link is incorrect.</p>
      </div>
    </Layout>

  )

}